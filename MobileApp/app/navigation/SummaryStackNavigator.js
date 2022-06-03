import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SummaryScreen from "../screens/SummaryScreen";
import SummaryResultsScreen from "../screens/SummaryResultsScreen";

const Stack = createStackNavigator();

const KeywordStackNavigator = ({route}) => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Keywords" component={KeywordsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Keyword Results" component={KeywordResultsScreen} initialParams={{ Keywords: route.params.keywords}}/>
        <Stack.Screen name="KeywordsNew" component={KeywordsScreenNew} />
      </Stack.Navigator>
    );
  }