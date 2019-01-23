import React, { Component } from 'react'
import Cookies from 'js-cookie';
import { connect } from 'react-redux';

import CookieCompliancePopup from '@uncinc/react-cookie-compliance'

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

  removeCookie = () => {
    Cookies.remove('cookie-compliance-consent');
    window.location.reload();
  }

  render () {
    return (
      <div style={{ padding: 20, lineHeight: 2 }}>
        {/* -- DEBUG INFO -- */}
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
        <div>
          <button onClick={this.removeCookie}>Remove cookie</button>
        </div>
        {/* -- /DEBUG INFO -- */}

        <CookieCompliancePopup
          agreeText="Yes"
          disagreeText="No"
          onAgree={() => console.log('User agreed.')}
          onDisagree={() => console.log('User disagreed.')}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at
            pulvinar quam. Suspendisse pellentesque feugiat sagittis. Donec
            dapibus enim nec consectetur venenatis. Curabitur quis vehicula mi.
            &nbsp;
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">
              I want to read more!
            </a>
          </p>
        </CookieCompliancePopup>
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
