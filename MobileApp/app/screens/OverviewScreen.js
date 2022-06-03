import React,{ useState } from 'react';
import { View, StyleSheet,Image, FlatList } from "react-native";
import Collapsible from 'react-native-collapsible';

import Screen from '../components/Screen';
import AppText from '../components/AppText';
import { auth } from '../../firebase';
import colors from "../config/colors";

const features = [
  {
    id: '1',
    title: '- Summarize long texts',
  },
  {
    id: '2',
    title: '- Manage (save/delete) generated summaries',
  },
  {
    id: '3',
    title: '- Share generated summaries online',
  },
  {
    id: '4',
    title: '- Listen to summaries and original texts',
  },
  {
    id: '5',
    title: '- Extract keywords/keyphrases from long texts',
  },
  {
    id: '6',
    title: '- Manage (save/delete) extracted kewords',
  },
  {
    id: '6',
    title: '- Share extracted kewords online',
  },
  {
    id: '7',
    title: '- See higlighted kewords in original text',
  },
  {
    id: '8',
    title: '- Write error-free notes',
  },
];

export default function OverviewScreen() {
  const userEmail = auth.currentUser.email;
  const userName = auth.currentUser.displayName;
  console.log("Email = ", userEmail);
  console.log("Name = ", userName);

  const [collapsedAboutText, setCollapsedAboutText] = useState(false);
  const [collapsedHowText, setCollapsedHowText] = useState(true);
  const toggleExpandedAboutText= () => {
    //Toggling the state of single Collapsible
    setCollapsedAboutText(!collapsedAboutText);
    setCollapsedHowText(!collapsedHowText);
  };

  const toggleExpandedHowText= () => {
    //Toggling the state of single Collapsible
    setCollapsedHowText(!collapsedHowText);
    setCollapsedAboutText(!collapsedAboutText);
  };
   return (
    <Screen style={styles.container}>
            <Image 
                style={styles.logoImage}
                source={require('../assets/logoLogin.png')} 
            />
            <AppText style={{color:colors.primary, alignSelf: 'center',marginBottom:40}}>Welcome, {userName} !</AppText>
            <View> 
              <AppText style={styles.text}>Use the below links to learn about this app </AppText>
              <AppText style={styles.bullets} onPress={toggleExpandedAboutText}>Features of this app</AppText>
              <Collapsible collapsed={collapsedAboutText} align="center">
                <View style={styles.aboutTextContainer}> 
                  <AppText style={styles.aboutText}> You can this use this application for -</AppText>
                  <FlatList style={styles.flatList}
                    data={features}
                    renderItem={({ item }) => (
                    <AppText style={styles.aboutText}>{item.title}</AppText>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </Collapsible>
              <AppText style={styles.bullets} onPress={toggleExpandedHowText}>How to use this app</AppText>
              <Collapsible collapsed={collapsedHowText} align="center">
                <View style={styles.howTextContainer}> 
                  <View style={{height:100, width: 180}}> 
                    <AppText style={styles.aboutText}> Click on hamburger icon on the top left to launch a drawer of options to start with.</AppText>
                  </View>
                  <View > 
                    <Image 
                      resizeMode='stretch'
                      style={styles.drawerImage}
                      source={require('../assets/drawer.png')} 
                    />
                  </View>
                </View>
              </Collapsible>
              
            </View>
    </Screen>
   );
 }

 const styles = StyleSheet.create({
  aboutText:{
    color: colors.medium,
    fontSize: 17
  },
  aboutTextContainer:{
    backgroundColor: colors.light,
    borderRadius: 20,
    padding: 9,
    marginVertical: 7
  },
  bullets:{
    color:colors.primary, 
    marginBottom: 7
  },
  container:{
    padding: 18,
  },
  drawerImage:{
    width: 130,
    height: 200,
    borderRadius: 10
  },
  flatList:{
    height: 170,
    flexGrow: 0,
    paddingHorizontal : 10,
    marginBottom: 3
  },
  howTextContainer:{
    flexDirection: 'row',
    backgroundColor: colors.light,
    borderRadius: 20,
    padding: 9,
    marginVertical: 7,
    //alignItems: 'center'
  },
  logoImage:{
      width: 230,
      height: 200,
      alignSelf: 'center',
  },
  text: {
    color: colors.secondary,
    fontSize: 17,
    marginBottom:20
},
})