// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./DrawerNavigator";

import SummaryScreen from "../screens/SummaryScreen";
import SummaryResultsScreen from "../screens/SummaryResultsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MySummariesScreen from "../screens/MySummariesScreen";
import MyKeywordsScreen from "../screens/MyKeywordsScreen";
import MyNotesScreen from "../screens/MyNotesScreen";
import MySummaryDetailsScreen from "../screens/MySummaryDetailsScreen";
import MyNotesDetailsScreen from "../screens/MyNotesDetailsScreen";
import KeywordsScreen from "../screens/KeywordsScreen";
import HighlightKeywordsScreen from "../screens/HighlightKeywordsScreen";
import KeywordResultsScreen from "../screens/KeywordResultsScreen";
import NotesScreen from "../screens/NotesScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import colors from "../config/colors";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const AuthStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ProfileStack" component={ProfileScreen} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{headerShown: false}}/>
      </Stack.Navigator>
    );
}

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Summary" component={SummaryScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />
    </Stack.Navigator>
  );
}

const ProfileStackNavigator = ({route}) => {
  //console.log('Inside profile stack navigator : ', route);
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="ProfileStack" component={ProfileScreen} options={{headerShown: false}} initialParams={{ UserEmail: route.params.UserEmail, UserName: route.params.UserName }}/>
        <Stack.Screen name="My Summaries" component={MySummariesScreen} />
        <Stack.Screen name="My Keywords" component={MyKeywordsScreen} />
        <Stack.Screen name="My Notes" component={MyNotesScreen} />
        <Stack.Screen name="My Summary Details" component={MySummaryDetailsScreen} initialParams={{ text: route.params.text, summary: route.params.summary}}/>
        <Stack.Screen name="My Note Details" component={MyNotesDetailsScreen} />
      </Stack.Navigator>
    );
}

const KeywordStackNavigator = ({route}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Keywords" component={KeywordsScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Keyword Results" component={KeywordResultsScreen} initialParams={{ keywordsObject: route.params.keywords, text: route.params.text}}/>
      <Stack.Screen name="Highlight Keywords" component={HighlightKeywordsScreen} initialParams={{ keywordsArray: route.params.keywords, text: route.params.text}}/>
    </Stack.Navigator>
  );
}

const SummaryStackNavigator = ({route}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Summary" component={SummaryScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Summary Results" component={SummaryResultsScreen} initialParams={{ Summary: route.params.summary}}/>
    </Stack.Navigator>
  );
}

export { AuthStackNavigator, MainStackNavigator, KeywordStackNavigator, ProfileStackNavigator, SummaryStackNavigator};