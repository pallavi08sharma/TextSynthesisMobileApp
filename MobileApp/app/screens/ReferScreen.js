import * as React from 'react';
import { Button, Text, View, StyleSheet,Image ,ImageBackground,SafeAreaView } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import Constants from 'expo-constants';
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import Screen from '../components/Screen';
import AppText from '../components/AppText';

async function sendEmailAsync() {
  let result = await MailComposer.composeAsync({
    recipients: [''],
    subject: 'Try this cool app',
    body: 'Click on the link to try - https://expo.dev/@pallavi08sharma/react-practice',
  });

  alert(result.status);
}

export default function ReferScreen() {
  var shareUrl = "https://0pf0r.csb.app/";
   return (
    <Screen style={styles.screen}>
      <Image style={styles.image} source={require("../assets/refer.jpeg")}></Image>
      <AppText style={styles.messageText}>If you like this app, </AppText>
      <AppText style={styles.messageText}>And if you know someone can benefit from this app</AppText>
      <AppText style={styles.messageText}>You can refer this to your friend !</AppText>
      <View style={styles.buttonsContainer}>
        <AppButton title="Refer Friends"  onPress={sendEmailAsync} />
      </View>
    </Screen>

   );
 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.light,
    padding: 8,
  },
  image: {
    //flex: 0.6,
    //resizeMode:'center'
    //flex: 1,
    //justifyContent: "flex-end",
    alignItems: "center",
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginBottom: 2,
},
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 10,
    width: "100%",
  },
  messageText:{
    marginHorizontal: 30,
    marginTop:10,
    fontStyle:'italic',
    color: colors.primary,
    flexWrap:'wrap',
    textAlign:'justify'
  },
  screen: {
    padding: 10
  },
});