import LoginScreen from '../LoginScreen'
import { StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import { shallow } from 'enzyme';
import enableHooks from 'jest-react-hooks-shallow';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { useEffect } from 'react';

Enzyme.configure({ adapter: new Adapter() });

enableHooks(jest);

const onAuthStateChanged = jest.fn()

const navigate=jest.fn();
//let useEffect;

  test('Check Login', async()=>{

    jest.mock('React', () => ({
        ...jest.requireActual('React'),
        useEffect: jest.fn(),
      }));
      
const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
    
  };
  useEffect.mock
  const component = shallow(<LoginScreen />);
    // useEffect = jest.spyOn(React, "useEffect");
    // mockUseEffect()
    // mockUseEffect()
    //LoginScreen({navigate})

  })
