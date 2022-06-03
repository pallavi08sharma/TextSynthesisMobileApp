import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList,Alert, ActivityIndicator  } from "react-native";
import { auth } from '../../firebase';
import {db} from '../../firebase';
import { collection, deleteDoc, getDocs,doc } from "firebase/firestore";

import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItemKeywords from "../components/lists/ListItemKeywords";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";


const MyKeywordsScreen = ({route}) => {
  //console.log("Route params in MyKeywords screen = ", route.params.kewords)
  const userEmail = auth.currentUser.email;
  const allKeywordDocs = []
  const [keywordDocs, setKeywordDocs] = useState(null);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const read = () => {
    console.log("Inside read function")
    db.collection(userEmail)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

//   const readAllKeywordsFromDB = async () =>{
//     //const usersCollection = collection(db, userEmail);
//     const querySnapshot = await getDocs(collection(db, userEmail));
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//       // console.log("========> DOC =  ", doc)
//       // console.log(" ")
//       //allKeywordDocs.push(doc.data())
//       allKeywordDocs.push(doc)
//     })
//     //console.log("All Keywords = ",allKeywords)
//     setKeywordDocs(allKeywordDocs)
// }
const readAllKeywordsFromDB = async () =>{
  console.log("allKeywordsDocs.length = ", allKeywordDocs.length)
  const querySnapshot = await getDocs(collection(db, userEmail));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());   text.includes("world")
    if((doc.id).includes("keywords")){
      console.log("********* id = ", doc.id)
      let obj = {
        id: doc.id,
        data: doc.data()
      }
      allKeywordDocs.push(doc)
    }
      
  })
  console.log("allKeywordDocs.length = ", allKeywordDocs.length)
  //console.log("All Keywords = ",allKeywords)
  setKeywordDocs(allKeywordDocs)
  if(allKeywordDocs.length==0){
    setError(true);
  }
  else{
    setError(false);
  }
  //navigation.navigate(routes.MY_KEYWORDS, {data : allKeywordDocs})
}

const loadKeywords = () => {
  readAllKeywordsFromDB();
}

useEffect(() => {
  console.log("In Use Effect of My Keywords")
  let isCancelled = false;
  loadKeywords();
  return () => {
    isCancelled = true;
  };
}, []);


const handleDelete = (docItem) => {
  // console.log("Inside delete function")
  // console.log("DocItem = ", docItem)
  
  // 1. Delete the messages from backend (firestore)
  const myDoc = doc(db, userEmail, docItem.id)
  deleteDoc(myDoc)
  .then(() =>{
    console.log("Inside delete success block ")
    // 2. Delete the message from keywordDocs constant
    setKeywordDocs(keywordDocs.filter((s) => s.id !== docItem.id));
    alert("Deleted Successfully !")
  })
  .catch((error)=>{
    alert(error.message)
  })
};

const warning =(item) =>{
  Alert.alert( "Caution !", "Do you really want to delete this item", 
  [
    {
      text:"Yes", onPress: ()=> {handleDelete(item)}
    },
    {
      text:"Cancel",onPress: () => {
                      console.log("Cancel Pressed")
                      },
      style: "cancel"
    }])
}

  return (
    <Screen style={styles.screen}>
      { error && <AppText style={{color:'grey', marginTop:250}}>You don't have any keywords archived</AppText>}
      { keywordDocs==null && <ActivityIndicator visible={true} />}
        { keywordDocs!=[] && <FlatList
              data={keywordDocs}
              renderItem={({ item }) => (
              <ListItemKeywords
                  entries={item}
                  renderRightActions={() => (
                      <ListItemDeleteAction onPress={() => warning(item)} />
                  )}
              />
              )}
              initialNumToRender={70}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ListItemSeparator}
              refreshing={refreshing}
              onRefresh={() => {
                setKeywordDocs(keywordDocs);
        }}
      />}
    </Screen>


    // <SafeAreaView style={styles.container}>
      
    //   {
    //     userDocs!=null && <Text> {userdocs} </Text>
    //   }
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  screen: {
    backgroundColor: colors.light,
    padding: 5,
    justifyContent:'center', 
    alignItems:'center'
  },
});

export default MyKeywordsScreen;