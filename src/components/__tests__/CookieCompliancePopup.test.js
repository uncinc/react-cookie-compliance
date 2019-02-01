import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { Map, fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import Cookies from 'js-cookie';

import reducer, { initialState as initialCookieComplianceState } from '../../reducers/cookieCompliance';
import { cookieComplianceConsent } from '../../actions/cookieCompliance';
import CookieCompliancePopup from '../CookieCompliancePopup';

const mockStore = configureStore();

let store;

function renderComponent(store, props = {}) {
  return mount(
    <Provider store={store}>
      <CookieCompliancePopup {...props} />
    </Provider>
  );
}

describe('CookieCompliancePopup component', () => {

  beforeEach(() => {
    store = mockStore(Map({
      cookieCompliance: initialCookieComplianceState,
    }));
    store.dispatch = jest.fn();

    Cookies.remove('cookie-compliance-consent');
  });

  it('should match its snapshot with default props', () => {
    const component = renderComponent(store);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render the agreeText prop its input', () => {
    const agreeText = 'Yes, please!';
    const component = renderComponent(store, { agreeText });
    component.instance().componentDidMount();

    expect(
      component.find('.cookie_compliance_popup__button--agree').text()
    ).toEqual(agreeText);

    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render the disagreeText prop its input', () => {
    const disagreeText = 'Nope';
    const component = renderComponent(store, { disagreeText });

    expect(
      component.find('.cookie_compliance_popup__button--disagree').text()
    ).toEqual(disagreeText);

    expect(toJson(component)).toMatchSnapshot();
  });

  it('should trigger callback functions and agree-actions when consent has been agreed', () => {
    const onAgreeCallback = jest.fn();
    const component = renderComponent(store, {
      onAgree: onAgreeCallback,
    });

    component.find('.cookie_compliance_popup__button--agree').simulate('click');
    expect(onAgreeCallback).toHaveBeenCalled();

    const action = cookieComplianceConsent(true);
    expect(store.dispatch).toHaveBeenCalledWith(action);

    const nextState = reducer(initialCookieComplianceState, action);
    expect(nextState).toEqual(fromJS({
      didConsent: true,
    }));
  });

  it('should trigger callback functions and disagree-actions when consent has been disagreed', () => {
    const onDisagreeCallback = jest.fn();
    const component = renderComponent(store, {
      onDisagree: onDisagreeCallback,
    });

    component.find('.cookie_compliance_popup__button--disagree').simulate('click');
    expect(onDisagreeCallback).toHaveBeenCalled();

    const action = cookieComplianceConsent(false);
    expect(store.dispatch).toHaveBeenCalledWith(action);

    const nextState = reducer(initialCookieComplianceState, action);
    expect(nextState).toEqual(fromJS({
      didConsent: false,
    }));
  });

  it('should not render when consent has been agreed', () => {
    Cookies.set('cookie-compliance-consent', true);
    const component = renderComponent(store);
    expect(component.html()).toBe(null);
  });

  it('should not render when consent has been disagreed', () => {
    Cookies.set('cookie-compliance-consent', false);
    const component = renderComponent(store);
    expect(component.html()).toBe(null);
  });

  it('should render when consent has not been given yet', () => {
    Cookies.remove('cookie-compliance-consent');
    const component = renderComponent(store);
    expect(component.html()).not.toBe(null);
  });

});
