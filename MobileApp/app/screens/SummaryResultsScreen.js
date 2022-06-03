/**
 *  Built-In Components from React, React-Native and Firebase
 * */ 
import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Share } from "react-native";
import { auth } from '../../firebase';
import {db} from '../../firebase';
import { doc, setDoc } from "firebase/firestore";

/***
   * Custom Components for this application
   */
import AppText from '../components/AppText';
import AppButton from "../components/AppButton";

/**
 * Custom Component for Summary Results Screen
 * @param {*} param0 => route : To get the data passed by the previous screen
 * @returns  - Collection of components to be rendered on screen
 */
export default function SummaryResultsScreen({route}) {
    /**
     * Object consisting of Summary and original text to be stored in the Firesore
     */
    const summarizedText = {
        summary: route.params.Summary, 
        text: route.params.Text}
    /**
     * User id against which the data has to fetched or stored in DB
     */
    const userEmail = auth.currentUser.email;

    /**
     * Function to write summary and original text for specific user in the Firestore DB
     */ 
    const create = () => {
        console.log("Inside create function")
        
        let epoch = new Date() // Or any unix timestamp
        let currentDateTime = new Date(epoch),
        year = currentDateTime.getUTCFullYear(),
        month = currentDateTime.getUTCMonth(),
        date = currentDateTime.getUTCDate(),
        time = currentDateTime.toTimeString().substr(0,5);
        const timestamp = year +"-" + month + "-" + date + " " + time
        //console.log("Timestamp = ", timestamp)
        const collectionName=userEmail
        const documentInCollection = "Summary " + timestamp
    
        const myDoc = doc(db, collectionName, documentInCollection)
        //console.log("myDoc details = ", myDoc)
        // Add a new document with a generated id
        // const newCityRef = doc(collection(db, collectionName));
        // console.log("newCityRef = ", newCityRef.id)
        
        setDoc(myDoc,summarizedText)
        .then(()=> {
          alert("Summary Saved !")
        })
        .catch((error)=> {
          alert(error.message)
        })
      }
    
    /**
     *  Function to share the summary on social media
     * */ 
    const onShare = async () => {
        let summ;
        if(typeof(route.params.Summary)=='string')
        {
          summ = route.params.Summary;
        }
        else{
          summ = route.params.Summary[0];
        }
        console.log("TYPE OF : ", typeof(route.params.Summary))
      
        try {
          console.log("SUMMARY = ", summ)
          const result = await Share.share({
            message: summ,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

   /**
    * Collection of components to be rendered on Summary Results screen  
    *  */  
   return (
    <SafeAreaView style={styles.container}>
        <ScrollView> 
            <AppText style={styles.originalText} editable={false} multiline={true}> {route.params.Summary} </AppText>
            <View style={styles.buttonsContainer}>
                <AppButton title="Archive" onPress={create}/>
                <AppButton title="Share" onPress={onShare}/>
            </View>
        </ScrollView>
    </SafeAreaView>
   );
 }

 /**
  *  Style sheet for applying styles to Screen and components in it
  * */ 
 const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        margin: 13,
 
    }, 
    buttonsContainer: {
        paddingHorizontal: 20,
        width: "100%",
    },
    originalText: {
        // height: 400,
        // width: 350,
        margin: 7,
        textAlign: 'justify',
        flexShrink: 1,
        fontSize: 15
    },
 })