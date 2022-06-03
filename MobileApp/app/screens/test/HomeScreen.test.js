import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from "../HomeScreen"


const navigate=jest.fn();

describe('<HomeScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree.children.length).toBe(3);
  });
  it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});