import React from 'react';
import renderer from 'react-test-renderer';

import ActivityIndicator from '../ActivityIndicator'

describe('<ActivityIndicator />', () => {
    it('renders correctly', async() => {
      const tree = renderer.create(<ActivityIndicator />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });