import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, KeywordStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Summary" 
        component={MainStackNavigator} 
        options={{headerShown: false}}
        />
      <Tab.Screen 
        name="Keywords" 
        component={KeywordStackNavigator} 
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;