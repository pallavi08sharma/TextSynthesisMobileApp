import React from 'react';
import renderer from 'react-test-renderer';

import AppTextInput from '../AppTextInput';

describe('<AppTextInput />', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<AppTextInput />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });