import Cookies from 'js-cookie';

export const COOKIE_COMPLIANCE_CONSENT = 'COOKIE_COMPLIANCE_CONSENT';
export function cookieComplianceConsent(didConsent) {
  Cookies.set('cookie-compliance-consent', didConsent);
  return {
    type: COOKIE_COMPLIANCE_CONSENT,
    didConsent,
  };
}
