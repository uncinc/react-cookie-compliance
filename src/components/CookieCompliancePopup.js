import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { cookieComplianceConsent } from '../actions/cookieCompliance';
import './CookieCompliancePopup.scss';

class CookieCompliancePopup extends Component {
  constructor(props) {
    super(props);
    this.hideNotificationTimeoutId = null;

    this.state = {
      hidden: true,
    };
  }

  componentDidMount() {
    const didConsent = Cookies.get('cookie-compliance-consent');
    if (didConsent === "true") {
      this.props.dispatch(cookieComplianceConsent(true));
    } else if (didConsent === "false") {
      this.props.dispatch(cookieComplianceConsent(false));
    } else {
      // Did not consent yet, so prompt the user.
      this.setState({ hidden: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.didConsent === null && this.props.didConsent === true) {
      this.hideNotificationTimeoutId = setTimeout(() => {
        this.setState({ hidden: true });
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.hideNotificationTimeoutId);
  }

  onConsent = (didConsent) => {
    return () => {
      this.props.dispatch(cookieComplianceConsent(didConsent));
    };
  }

  render() {
    if (this.state.hidden) {
      return null;
    }

    const classes = classNames('cookie_compliance', {
      cookie_compliance__hidden: this.props.didConsent !== null,
    });

    return (
      <div className={classes}>
        <div className="cookie_compliance__inner_wrapper">
          <div className="cookie_compliance__content_container">
            {this.props.children}
          </div>

          <div className="cookie_compliance__buttons-container">
            <div
              className="cookie_compliance__button cookie_compliance__button--agree"
              onClick={this.onConsent(true)}
            >
              {this.props.agreeText}
            </div>
            <div
              className="cookie_compliance__button cookie_compliance__button--disagree"
              onClick={this.onConsent(false)}
            >
              {this.props.disagreeText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CookieCompliancePopup.defaultProps = {
  agreeText: 'Ja',
  disagreeText: 'Nee',
};

CookieCompliancePopup.propTypes = {
  agreeText: PropTypes.string,
  disagreeText: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    didConsent: state.getIn(['cookieCompliance', 'didConsent']),
  };
}

export default connect(mapStateToProps)(CookieCompliancePopup);
