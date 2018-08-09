import React from 'react';
import { shallow } from 'enzyme';

import Home from './';

describe('Home Page', () => {
  it('should exist', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('AppContainer')).toHaveLength(1);
  });
});
