import { getAuth } from 'firebase/auth';
import * as firebase from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


import * as firebaseApp  from 'firebase/app';
import { signup,updateProfileUser,useAuth,login } from  './firebase';
import React, { useState as useStateMock, useEffect as useEffectMock } from 'react'
const onAuthStateChanged = jest.fn()

const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }))

const createUserWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of createUserWithEmailAndPassword')
})

const signInWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of signInWithEmailAndPassword')
})

const updateProfile = jest.fn(() => {
    return Promise.resolve('result of updateProfile')
  })
  


test('check signup', async() => {
    const t=signup('test@test.com',"test")
})

test('check login', async() => {
    const t=login('test@test.com',"test")
})

test('check update profile', async() => {
    const t=updateProfileUser('test@test.com',"test")
})

test('check user', async() => {
    const setState = jest.fn();
    const useStateMock = (initState) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect()
    // trigger setState somehow
    useAuth()
   
})
