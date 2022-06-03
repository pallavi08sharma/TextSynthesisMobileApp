import React from "react";
import { View, StyleSheet, Text,Image,SafeAreaView,FlatList, Alert, Share, ScrollView} from "react-native";
import { useState, useEffect} from 'react';
import { auth } from '../../firebase';
import {db} from '../../firebase';

import AppText from "../components/AppText";
import colors from '../config/colors';
import routes from "../navigation/routes";
import AppButton from "../components/AppButton";
import { doc, setDoc } from "firebase/firestore";


const KeywordResultsScreen = ({route,navigation}) => {
  const userEmail = auth.currentUser.email;
  //console.log("User email in Results Screen : ", userEmail)
  console.log("Keywords are : " , route.params.keywordsObject)
  const entries = route.params.keywordsObject
  //console.log("entries= ", entries)
  //console.log("KEYS ARE : ", Object.keys(entries));   //array of keys
  //console.log("VALUES ARE : ", Object.values(entries));  //array of values 
  const result = new Map(entries);
  const obj = Object.fromEntries(entries);
  console.log("Obj = ", obj);

  //console.log("String of keywords : ", JSON. stringify(route.params.Keywords))
  const strKeywords=JSON. stringify(route.params.keywordsObject)
  //console.log("TYPE OF  strKeywords= ",strKeywords)
  //console.log("Json.parse(): ", JSON.parse(strKeywords))
  const entries1 = Object.values(Object.values(entries));
  //console.log("TYPE OF  entries1 = ", typeof entries1)
  //console.log("entries1 = ", entries1)
  //const keyword = route.params.Keywords;
  //console.log(Object.keys(keyword));   array of keys
  //console.log(Object.values(keyword));  array of values 
  // return (
  //   <View style={styles.center}>
  //     <Text>{keyword.api} </Text>
  //   </View>
  // );


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
    const documentInCollection = "keywords " + timestamp

    const myDoc = doc(db, collectionName, documentInCollection)
    //console.log("myDoc details = ", myDoc)
    // Add a new document with a generated id
    // const newCityRef = doc(collection(db, collectionName));
    // console.log("newCityRef = ", newCityRef.id)
    
    setDoc(myDoc,obj)
    .then(()=> {
      alert("Keywords Saved !")
    })
    .catch((error)=> {
      alert(error.message)
    })
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: strKeywords,
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

  
  return (
    <View style={styles.container}> 
      <View style={styles.imageContainer}> 
        <Image  style={styles.logoImage} source={{
          uri: "https://keywordsapi.azurewebsites.net/getimageuser?user="+userEmail,
        }}/>
      </View>
      {/* <AppText>{strKeywords}</AppText> */}
      {/* <View style={styles.textContainer}>  */}
      {/* {
          entries.map((item) => (<View style={styles.textContainer}>
                                <AppText >{item[0]}</AppText>
                                <AppText > : </AppText>
                                <AppText >{item[1]}</AppText>
                                </View>))
        
      } */}

      <FlatList style={styles.flatList}
          data={Object.keys(route.params.keywordsObject)}
          renderItem={({ item }) => (<View style={styles.textContainer}>
            <AppText style={styles.text}>{entries[item][0]}</AppText>
            <AppText style={styles.text}> : </AppText>
            <AppText style={styles.text}>{entries[item][1]}</AppText>
            </View>)}
            keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.buttonsContainer}>
        <AppButton title="Archive" onPress={create}/>
        <AppButton title="Share" onPress={onShare}/>
        <AppButton title="See Highlights" onPress={() => navigation.navigate(routes.HIGLIGHT_KEYWORDS,{keywordsArray : Object.keys(obj), text: route.params.text})}/>
      </View>

      {/* </View> */}
    </View>
  );

};



const styles = StyleSheet.create({
  buttonsContainer: {
    paddingHorizontal: 20,
    width: "100%",
  },
  container:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList:{
    height: 220,
    width: 360,
    backgroundColor: colors.light,
    flexGrow: 0,
    paddingHorizontal : 12,
    paddingTop: 7,
    marginBottom: 3,
    flexWrap: 'wrap',
    borderRadius: 12
  },
  imageContainer:{
    marginTop: 0,
    marginBottom: 7,
    width: 420,
    height: 260,
    backgroundColor: 'white',
    justifyContent: 'center',
    //borderRadius: 180,
    overflow: "hidden",
    //borderWidth: 0.5,
    //borderColor: colors.primary,
  },
  logoImage:{
    width: 420,
    height: 270,  
  },
  text:{
    fontWeight : "500",
    fontSize: 17,
    color: colors.secondary
  },
  textContainer:{
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'black',
  }
  // screen: {
  //   paddingLeft: 10,
  //   paddingRight: -20,
  //   paddingTop: 10,
  // },

});



export default KeywordResultsScreen;