import Cookies from 'js-cookie';

import {
  COOKIE_COMPLIANCE_CONSENT,
  cookieComplianceConsent,
} from './cookieCompliance';

describe('CookieCompliancePopup actions', () => {

  it('should return a cookieComplianceConsent action object and where the cookie value is true', () => {
    const action = cookieComplianceConsent(true);
    expect(action).toEqual({
      type: COOKIE_COMPLIANCE_CONSENT,
      didConsent: true,
    });
    expect(Cookies.get('cookie-compliance-consent')).toEqual("true");
  });

  it('should return a cookieComplianceConsent action object and where the cookie value is false', () => {
    const action = cookieComplianceConsent(false);
    expect(action).toEqual({
      type: COOKIE_COMPLIANCE_CONSENT,
      didConsent: false,
    });
    expect(Cookies.get('cookie-compliance-consent')).toEqual("false");
  });

});
