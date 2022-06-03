// ./navigation/DrawerNavigator.js

import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { KeywordStackNavigator, ProfileStackNavigator,SummaryStackNavigator} from "./StackNavigator";
//import TabNavigator from "./TabNavigator";


import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ReferScreen from "../screens/ReferScreen";
import OverviewScreen from "../screens/OverviewScreen";
import HomeScreen from "../screens/HomeScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import SummaryScreen from "../screens/SummaryScreen";
import KeywordsScreen from "../screens/KeywordsScreen";
import NotesScreen from "../screens/NotesScreen";
import DrawerItems from "../constants/DrawerItems";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({route}) => {
  //console.log('Inside drawer : ', route);
  return (
    // <Drawer.Navigator>
    //   <Drawer.Screen 
    //     name="Summary" 
    //     component={TabNavigator} 
    //     options={{headerShown: false}}
    //     />
    //   <Drawer.Screen 
    //     name="Keywords" 
    //     component={KeywordStackNavigator} 
    //     options={{headerShown: false}}
    //     />
    // </Drawer.Navigator>
    <Drawer.Navigator
      drawerType="front"
      initialRouteName="Overview"
      screenOptions={{
        activeTintColor: '#e91e63',
        headerTintColor: 'deepskyblue',
        headerStyle: {backgroundColor: 'grey'},
        itemStyle: { marginVertical: 10 },
      }}
    >
    {
      DrawerItems.map(drawer=><Drawer.Screen
        key={drawer.name}
        name={drawer.name}
        //initialParams={{ params: route.params }}
        initialParams={{ UserEmail: route.params.UserEmail, UserName: route.params.UserName }}
        options={
        // ({route})=>({UserEmail: route.params.UserEmail, UserName: route.params.UserName}),
        {
         drawerIcon:({focused})=>
          drawer.iconType==='Material' ?
             <MaterialCommunityIcons
               name={drawer.iconName}
               size={24}
               color={focused ? "#e91e63" : "black"}
             />
         :
         drawer.iconType==='Feather' ?
             <Feather
               name={drawer.iconName}
               size={24}
               color={focused ? "#e91e63" : "black"}
             />
         :
         drawer.iconType==='Ionicons' ?
             <Ionicons
               name={drawer.iconName}
               size={24}
               color={focused ? "#e91e63" : "black"}
             />
         :
             <FontAwesome5
               name={drawer.iconName}
               size={24}
               color={focused ? "#e91e63" : "black"}
             /> 
           // ,
           // headerShown:true,
           // header: ({ scene }) => {
           //     const { options } = scene.descriptor;
           //     const title =
           //       options.headerTitle !== undefined
           //         ? options.headerTitle
           //         : options.title !== undefined
           //         ? options.title
           //         : scene.route.name;
           //     return (
           //       <Header screen={title}/>
           //     );
           //   }              
         }}
         component={
           drawer.name==='Profile' ? ProfileStackNavigator
           //: drawer.name==='Settings' ? SettingsScreen
           : drawer.name==='Overview' ? OverviewScreen
           : drawer.name==='Home' ? HomeScreen
           : drawer.name==='Summary' ? SummaryStackNavigator
           : drawer.name==='Keywords' ? KeywordStackNavigator
           : drawer.name==='Notes' ? NotesScreen
           : drawer.name==='Statistics' ? StatisticsScreen
           : ReferScreen
         }
       />)
 }
 </Drawer.Navigator>
  );
}

export default DrawerNavigator;