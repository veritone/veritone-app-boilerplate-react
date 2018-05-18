import React from 'react';
import { shallow } from 'enzyme';

import App from './';

describe('App Page', () => {
  it('should exist', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('header')).toHaveLength(1);
  });
});
