import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../components/Header';


const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => (
  { useNavigation: () => ({ navigate: mockedNavigate }) }));

describe('<Header />', () => {
  it('has 2 child', async() => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree.children.length).toBe(2);
  });
  it('renders correctly', async() => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});