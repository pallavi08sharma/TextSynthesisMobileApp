import React from 'react';
import renderer from 'react-test-renderer';

import AppButton from '../AppButton'

describe('<AppButton />', () => {
    it('renders correctly', async () => {
      const tree = renderer.create(<AppButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });