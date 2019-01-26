import { fromJS } from 'immutable';

import reducer, { initialState as initialCookieComplianceState } from './cookieCompliance';
import { cookieComplianceConsent } from '../actions/cookieCompliance';

describe('CookieCompliancePopup reducer', () => {

  it('should set the didConsent property to true', () => {
    const action = cookieComplianceConsent(true);
    const nextState = reducer(initialCookieComplianceState, action);
    expect(nextState).toEqual(fromJS({
      didConsent: true,
    }));
  });

  it('should set the didConsent property to false', () => {
    const action = cookieComplianceConsent(false);
    const nextState = reducer(initialCookieComplianceState, action);
    expect(nextState).toEqual(fromJS({
      didConsent: false,
    }));
  });

});
