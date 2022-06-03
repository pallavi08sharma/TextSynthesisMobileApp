import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Alert, ActivityIndicator} from "react-native";
import { auth } from '../../firebase';
import {db} from '../../firebase';
import { collection, deleteDoc, getDocs,doc } from "firebase/firestore";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import routes from "../navigation/routes";
import colors from "../config/colors";
import ListItemSummaryNew from "../components/lists/ListItemSummaryNew";

const initialSummaries = [
  {
      id: 1,
      summary: "This is my first note. This is my first note. This is my first databook. This is my first note."
  },
  {
      id: 2,
      summary: "This is my second note. This is my second note. This is my second databook. This is my second note."
  },
];

const MyNotesScreen = ({navigation, route}) => {
  const userEmail = auth.currentUser.email;
  const [notesDocs, setNoteDocs] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const allNoteDocs = []

  const readAllNotesFromDB = async () =>{
    console.log("Reading all notes from DB")
    console.log("allNotesDocs.length = ", allNoteDocs.length)
    const querySnapshot = await getDocs(collection(db, userEmail));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      if((doc.id).includes("Note")){
        console.log("####### id = ", doc.id)
        //console.log("####### data = ", doc.data().data)
        let obj = {
          id: doc.id,
          data: doc.data().data,
        }
        allNoteDocs.push(obj)
      }
    })
    console.log("allNotesDocs.length = ", allNoteDocs.length)
    //console.log("All Notes Docs[0] = ",allNoteDocs[0])
    setNoteDocs(allNoteDocs)
    if(allNoteDocs.length==0){
      setError(true);
    }
    else{
      setError(false);
    }
    //navigation.navigate(routes.MY_NOTES, {data : allNoteDocs})
  }

  const loadAllNotesFromDB = () =>
  {
    readAllNotesFromDB();
  }

  useEffect(() => {
    let isCancelled = false;
    loadAllNotesFromDB();
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
      setNoteDocs(notesDocs.filter((s) => s.id !== docItem.id));
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
  
  //console.log("LENGTH =", notesDocs.length);
  return (
    
    <Screen style={styles.screen}>
      { error && <AppText style={{color:'grey', marginTop:250}}>You don't have any notes archived</AppText>}
      { notesDocs==null && <ActivityIndicator visible={true} />}
      { notesDocs!=[] && 
          <FlatList
            data={notesDocs}
            renderItem = {({ item }) => (
              <ListItemSummaryNew
                summary={item.data}
                onPress={() => navigation.navigate(routes.NOTES_DETAILS, {text: item.data})}
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
              setNoteDocs(notesDocs);
            }}
          />
        }
    </Screen>
    );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    padding: 5,
    justifyContent:'center', 
    alignItems:'center'
  },
});

export default MyNotesScreen;