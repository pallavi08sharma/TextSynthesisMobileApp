import React, { useState } from "react";
//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { LogBox } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

//import { MainStackNavigator } from "./app/navigation/StackNavigator";
//import BottomTabNavigator from "./app/navigation/TabNavigator";
//import DrawerNavigator from "./app/navigation/DrawerNavigator";
import { AuthStackNavigator } from "./app/navigation/StackNavigator";

export default function App() {

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Found screens with the same name nested inside one another',
    'Require cycle: app/',
    'AsyncStorage has been extracted from react-native core and will be removed in a future release.'
  ]);
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
    );
}




// import * as React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

// import ProfileScreen from "./app/screens/Profile";
// import SettingsScreen from "./app/screens/Settings";
// import ReferScreen from "./app/screens/Refer";
// import SavedScreen from "./app/screens/Saved";
// import HomeScreen from "./app/screens/Home";
// import WelcomeScreen from "./app/screens/WelcomeScreen";
// import StatisticsScreen from "./app/screens/Statistics";
// import SummaryScreen from "./app/screens/Summary";
// import KeywordsScreen from "./app/screens/Keywords";
// import NotesScreen from "./app/screens/Notes";
// import DrawerItems from "./app/constants/DrawerItems";

// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { Feather } from '@expo/vector-icons';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';


// const Drawer = createDrawerNavigator();

// export default function App() {

//  return (
//   <NavigationContainer>
//     <Drawer.Navigator
//        drawerType="front"
//        initialRouteName="Home"
//        screenOptions={{
//           activeTintColor: '#e91e63',
//           headerTintColor: 'deepskyblue',
//           headerStyle: {backgroundColor: 'grey'},
//           itemStyle: { marginVertical: 10 },
//        }}
//     >
//     {
//       DrawerItems.map(drawer=><Drawer.Screen
//            key={drawer.name}
//            name={drawer.name}
//            options={{
//             drawerIcon:({focused})=>
//              drawer.iconType==='Material' ?
//                 <MaterialCommunityIcons
//                   name={drawer.iconName}
//                   size={24}
//                   color={focused ? "#e91e63" : "black"}
//                 />
//             :
//             drawer.iconType==='Feather' ?
//                 <Feather
//                   name={drawer.iconName}
//                   size={24}
//                   color={focused ? "#e91e63" : "black"}
//                 />
//             :
//             drawer.iconType==='Ionicons' ?
//                 <Ionicons
//                   name={drawer.iconName}
//                   size={24}
//                   color={focused ? "#e91e63" : "black"}
//                 />
//             :
//                 <FontAwesome5
//                   name={drawer.iconName}
//                   size={24}
//                   color={focused ? "#e91e63" : "black"}
//                 /> 
//               // ,
//               // headerShown:true,
//               // header: ({ scene }) => {
//               //     const { options } = scene.descriptor;
//               //     const title =
//               //       options.headerTitle !== undefined
//               //         ? options.headerTitle
//               //         : options.title !== undefined
//               //         ? options.title
//               //         : scene.route.name;
//               //     return (
//               //       <Header screen={title}/>
//               //     );
//               //   }              
//             }}
//             component={
//               drawer.name==='Profile' ? ProfileScreen
//               : drawer.name==='Settings' ? SettingsScreen
//               : drawer.name==='Saved Items' ? SavedScreen
//               : drawer.name==='Home' ? HomeScreen
//               : drawer.name==='Summary' ? SummaryScreen
//               : drawer.name==='Keywords' ? KeywordsScreen
//               : drawer.name==='Notes' ? NotesScreen
//               : drawer.name==='Statistics' ? StatisticsScreen
//               : ReferScreen
//             }
//           />)
//     }
//     </Drawer.Navigator>
//   </NavigationContainer>
//  );
// }




// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// import example1 from "./src/screens/example1";

// const Stack = createStackNavigator();

// //export default function App() {
// export default function App() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="example1"
//         >
//         <Stack.Screen 
//           name="example1"
//           component={TVShows}
//         />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
