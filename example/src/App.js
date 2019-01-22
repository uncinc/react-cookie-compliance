import React, { Component } from 'react'
import { connect } from 'react-redux';

import CookieCompliance from 'react-cookie-compliance'

class App extends Component {
  getConsentStatus = () => {
    if (this.props.didConsent === true) {
      return 'Yes';
    } else if (this.props.didConsent === false) {
      return 'No';
    } else {
      return 'No, waiting for consent...';
    }
  }

  render () {
    return (
      <div style={{ padding: 20, lineHeight: 2 }}>
        <div>
          <div><strong>null</strong>: No consent has been given</div>
          <div><strong>true</strong>: Consent has been given and has been agreed</div>
          <div><strong>false</strong>: Consent has been given and has been disagreed</div>
        </div>
        <hr />
        <div>
          cookieCompliance.didConsent: <strong>{JSON.stringify(this.props.didConsent)}</strong>
        </div>
        <div>
        User agreed? <strong>{this.getConsentStatus()}</strong>
        </div>

        <CookieCompliance>
          Lorem ipsum
        </CookieCompliance>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    didConsent: state.getIn(['cookieCompliance', 'didConsent']),
  };
}

export default connect(mapStateToProps)(App);
