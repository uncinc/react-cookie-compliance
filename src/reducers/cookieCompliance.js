import { fromJS } from 'immutable';
import Cookies from 'js-cookie';

import { COOKIE_COMPLIANCE_CONSENT } from '../actions/cookieCompliance';


/**
 * Get consent from cookie and cast to boolean if applicable.
 * @return {(undefined|boolean)} undefined if cookie has not been set.
 */
function getConsentFromCookie() {
  const cookie = Cookies.get('cookie-compliance-consent');
  switch (cookie) {
    case 'true': {
      return true;
    }

    case 'false': {
      return false;
    }

    default: {
      return undefined;
    }
  }
}

export const initialState = fromJS({
  didConsent: getConsentFromCookie(),
});

export default function cookieCompliance(state = initialState, action = {}) {
  switch (action.type) {
    case COOKIE_COMPLIANCE_CONSENT: {
      return state.set('didConsent', action.didConsent);
    }

    default:
      return state;
  }
}
