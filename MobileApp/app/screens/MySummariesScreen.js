import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View,Alert, ActivityIndicator } from "react-native";
import { auth } from '../../firebase';
import {db} from '../../firebase';
import { collection, deleteDoc, getDocs,doc } from "firebase/firestore";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import ListItemSummary from "../components/lists/ListItemSummary";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import routes from "../navigation/routes";
import colors from "../config/colors";
import ListItemSummaryNew from "../components/lists/ListItemSummaryNew";
import AppText from "../components/AppText";
// import ActivityIndicator from "../components/ActivityIndicator";

// const initialSummaries = [
//     {
//         id: 1,
//         summary: "This is my first summary. This is my first summary. This is my first summary. This is my first summary."
//     },
//     {
//         id: 2,
//         summary: "This is my second summary. This is my second summary. This is my second summary. This is my second summary."
//     },
//   ];

function MySummariesScreen( {navigation} ) {
  const [summaryDocs, setSummaryDocs] = useState(null);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const userEmail = auth.currentUser.email;
  const allSummaryDocs = []

  const readAllSummariesFromDB = async () =>{
    //allSummaryDocs=[]
    setLoading(true);
    console.log("YAY allSummaryDocs.length = ", allSummaryDocs.length)
    const querySnapshot = await getDocs(collection(db, userEmail));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      if((doc.id).includes("Summary")){
        console.log("@@@@@@@@@ id = ", doc.id)
        let obj = {
          id: doc.id,
          data: doc.data()
        }
        allSummaryDocs.push(obj)
      }
      
    })
    console.log("HEY allSummaryDocs.length = ", allSummaryDocs.length)
    //console.log("All Keywords = ",allKeywords)
    //const [summaryDocs, setSummaryDocs] = useState(allSummaryDocs);
    setLoading(false);
    setSummaryDocs(allSummaryDocs);
    if(allSummaryDocs.length==0){
      setError(true);
    }
    else{
      setError(false);
    }
    //console.log("summaryDocs.length = ", summaryDocs.length)
    //navigation.navigate(routes.MY_SUMMARIES, {data : allSummaryDocs})
  }

  const loadSummaries = () =>
  {
    readAllSummariesFromDB();
    //console.log("YUP SummaryDocs = ", summaryDocs)
  }

  useEffect(() => {
    console.log("In Use Effect of My Summaries");
    let isCancelled = false;
    loadSummaries();
    return () => {
      console.log("Cleaning up My Summaries");
      isCancelled = true;
    };
  },[]);

  const handleDelete = (docItem) => {
    // 1. Delete the messages from backend (firestore)
  
    const myDoc = doc(db, userEmail, docItem.id)
    deleteDoc(myDoc)
    .then(() =>{
      console.log("Inside delete success block ")
      // 2. Update summaryDocs constant by deleting the message
      
      setSummaryDocs(summaryDocs.filter((s) => s.id !== docItem.id));
      alert("Deleted Successfully !")
      //summaryDocs.map((value)=>console.log(value.id))
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
        { error && <AppText style={{color:'grey', marginTop:250}}>You don't have any summaries archived</AppText>}
        { summaryDocs==null && <ActivityIndicator visible={true} />}
        
        { summaryDocs!=[] && <FlatList
        data={summaryDocs}
        //keyExtractor={(summary) => summary.id.toString()}
        renderItem={({ item }) => (
          <ListItemSummaryNew
            originaltext={item.data.text}
            summary={item.data.summary}
            onPress={() => navigation.navigate(routes.SUMMARY_DETAILS, {text: item.data.text, summary: item.data.summary})}
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
          setSummaryDocs(summaryDocs);
        }}
      />}
    </Screen>
    );
}


const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    padding: 5,
    justifyContent:'center', 
    alignItems:'center'
  }
});


export default MySummariesScreen;  