import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { cookieComplianceConsent } from '../actions/cookieCompliance';
import './CookieCompliancePopup.scss';

class CookieCompliancePopup extends Component {
  constructor(props) {
    super(props);
    this.hidePopupTimeoutId = null;

    this.state = {
      hidden: true,
    };
  }

  componentDidMount() {
    const { didConsent } = this.props;

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
    if (prevProps.didConsent === undefined && this.props.didConsent === true) {
      this.hidePopupTimeoutId = setTimeout(() => {
        this.setState({ hidden: true });
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.hidePopupTimeoutId);
  }

  onConsent = (didConsent) => {
    return () => {
      this.props.dispatch(cookieComplianceConsent(didConsent));

      if (didConsent) {
        this.props.onAgree();
      } else {
        this.props.onDisagree();
      }
    };
  }

  render() {
    if (this.state.hidden) {
      return null;
    }

    const classes = classNames('cookie_compliance_popup', this.props.className, {
      cookie_compliance_popup__hidden: this.props.didConsent !== undefined,
    });

    return (
      <div className={classes}>
        <div className="cookie_compliance_popup__inner_wrapper">
          <div className="cookie_compliance_popup__content_container">
            {this.props.children}
          </div>

          <div className="cookie_compliance_popup__buttons-container">
            <div
              className="cookie_compliance_popup__button cookie_compliance_popup__button--agree"
              onClick={this.onConsent(true)}
            >
              {this.props.agreeText}
            </div>
            <div
              className="cookie_compliance_popup__button cookie_compliance_popup__button--disagree"
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
  onAgree: () => {},
  onDisagree: () => {},
};

CookieCompliancePopup.propTypes = {
  agreeText: PropTypes.string,
  disagreeText: PropTypes.string,
  onAgree: PropTypes.func,
  onDisagree: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    didConsent: state.getIn(['cookieCompliance', 'didConsent']),
  };
}

export default connect(mapStateToProps)(CookieCompliancePopup);
