import React from 'react';
import renderer from 'react-test-renderer';
import UploadScreen from "../UploadScreen"

describe('<UploadScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<UploadScreen />).toJSON();
    expect(tree.children.length).toBe(1);
  });
  it('renders correctly', () => {
    const tree = renderer.create(<UploadScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});