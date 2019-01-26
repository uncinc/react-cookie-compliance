import { fromJS } from 'immutable';
import { COOKIE_COMPLIANCE_CONSENT } from '../actions/cookieCompliance';

export const initialState = fromJS({
  didConsent: null,
});

export default function cookieCompliance(state = initialState, action) {
  switch (action.type) {
    case COOKIE_COMPLIANCE_CONSENT: {
      return state.set('didConsent', action.didConsent);
    }

    default:
      return state;
  }
}
