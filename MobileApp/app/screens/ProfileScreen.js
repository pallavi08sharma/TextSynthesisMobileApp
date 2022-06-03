import React,  { useState ,useEffect} from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker'

import ListItem from "../components/lists/ListItem";
import ListItemSeparatorComponent from "../components/lists/ListItemSeparator";
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import colors from "../config/colors";
import routes from "../navigation/routes";
import { auth } from '../../firebase';
import {db} from '../../firebase';
import AppText from '../components/AppText';
import { collection, deleteDoc, getDocs,doc } from "firebase/firestore";


//1. Constant : Menu Items List to be displayed on profile screen
const menuItems = [
  {
    title: "My Summaries",
    icon: {
      name: "text",
      type: "Material",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MY_SUMMARIES,
    targetFunction: "readAllSummariesFromDB"
  },
  {
    title: "My Keywords",
    icon: {
      name: "format-list-text",
      type: "Material",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MY_KEYWORDS,
    targetFunction: "readAllKeywordsFromDB"
  },
  {
    title: "My Notes",
    icon: {
      name: "note-text-outline",
      type: "Material",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MY_NOTES,
    targetFunction: "readAllNotesFromDB"
  },
];


export default function ProfileScreen({ navigation, route }) {
  
  const userEmail = auth.currentUser.email;
  const userName=auth.currentUser.displayName;
  const allKeywordDocs = []
  const allSummaryDocs = []
  const allNoteDocs = []
  const [image, setImage] = useState(null);
//   useEffect(()=> {
//     readAllKeywordsFromDB()
//     readAllSummariesFromDB()
//     readAllNotesFromDB()
// },[route])


  const readAllKeywordsFromDB = async () =>{
    const querySnapshot = await getDocs(collection(db, userEmail));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());   text.includes("world")
      if((doc.id).includes("keywords")){
        console.log("**********")
        allKeywordDocs.push(doc)
      }
        
    })
    //console.log("All Keywords = ",allKeywords)
    //setKeywordDocs(allKeywordDocs)
    navigation.navigate(routes.MY_KEYWORDS, {data : allKeywordDocs})
  }

    const readAllSummariesFromDB = async () =>{
    allSummaryDocs==[]
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
    //console.log("All Keywords = ",allKeywords)
    //setKeywordDocs(allKeywordDocs)
    navigation.navigate(routes.MY_SUMMARIES, {data : allSummaryDocs})
  }

  const readAllNotesFromDB = async () =>{
    const querySnapshot = await getDocs(collection(db, userEmail));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      if((doc.id).includes("Note")){
        console.log("########")
        allNoteDocs.push(doc)
      }
    })
    //console.log("All Keywords = ",allKeywords)
    //setKeywordDocs(allKeywordDocs)
    navigation.navigate(routes.MY_NOTES, {data : allNoteDocs})
  }

  // const onPressCombined = (targetScreen)=>{
  //   console.log("Target Screen = ", targetScreen)
  //   if(targetScreen==="My Summaries"){
  //     readAllSummariesFromDB(targetScreen)
  //   } else if(targetScreen==="My Keywords"){
  //     readAllKeywordsFromDB(targetScreen)
  //   } else{
  //     readAllNotesFromDB(targetScreen)
  //   }
  // }

  //2. Function : To handle Sing out functionality
  const handleSignOut = () =>{
    console.log("Inside Handle SignOut")
    auth
      .signOut()
      .then(()=>{
        navigation.popToTop(routes.HOME)
      })
      .catch(error => alert(error.message))

  }

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    console.log(JSON.stringify(_image))
    if(!_image.cancelled)
    {
      setImage(_image.uri);
    }
  };

   return (
     <Screen style={styles.screen}>

       {/* 3. First View containing a ListItem to display image, name and email of the user */}
      <View style={styles.container}>
        <View style={styles.userDetailContainer}>
        <TouchableOpacity onPress={addImage}>
          <View style={styles.image}>
            {
              <Image source={{uri: image}} style={{width:'100%', height:'100%'}}/>
            }
          </View>
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{userName}</AppText>
            <AppText style={styles.subTitle}>{userEmail}</AppText>
        </View>
        </View>
       
        {/* <ListItem
          title={route.params.UserName}
          subTitle={userEmail}
          //image={require("../assets/default.png")}
          // image={true}
        /> */}
      </View>

      {/* 4. Second View containing a FlatList to display menu of ListItems - 'My Summaries', 'My Keywords', 'My Notes' */}
      <View style={styles.container}> 
        {/* <ListItem 
          title ="My Summaries"
          ImageComponent={
            <Icon 
              name="text"
              type="Material"
              backgroundColor={colors.primary}
            />
          }
          onPress={()=> navigation.navigate(routes.MY_SUMMARIES)}
        />
        <ListItemSeparatorComponent />
        <ListItem 
          title ="My Keywords"
          ImageComponent={
            <Icon 
              name="format-list-text"
              type="Material"
              backgroundColor={colors.primary}
            />
          }
          onPress={()=>navigation.navigate(routes.MY_KEYWORDS)}
        />
        <ListItemSeparatorComponent />
        <ListItem 
          title ="My Notes"
          ImageComponent={
            <Icon 
              name="note-text-outline"
              type="Material"
              backgroundColor={colors.primary}
            />
          }
          onPress={()=>navigation.navigate(routes.MY_NOTES)}
        />
       */}
        <FlatList
          data={menuItems}
          keyExtractor={menuItem => menuItem.title}
          ItemSeparatorComponent={ListItemSeparatorComponent}
          renderItem={({ item }) =>
            <ListItem 
              title={item.title}
              ImageComponent={
                <Icon 
                  name={item.icon.name}
                  type={item.icon.type}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
              //onPress={() => navigation.navigate(item.targetScreen, {summary: allSummaryDocs, kewords: allKeywordDocs, notes: allNoteDocs})}
              //onPress={readAllKeywordsFromDB(item.targetScreen)}
              //onPress={onPressCombined(item.targetScreen)}
            />
          }        
        />
      </View>

      {/* 5. Third View containing a ListItem to display log-out option */}
      <View style={styles.container}> 
        <ListItem
        title="Log Out"
        ImageComponent={<Icon name="logout" type="Material" backgroundColor={colors.primary} />}
        onPress={handleSignOut}
        //onPress={()=> navigation.navigate(routes.HOME)}
        />
      </View>

    </Screen>    
   );
 }

 // 6. Styles for screen and conatiner
const styles = StyleSheet.create({
  imageContainer:{
    height:80,
    width: 80,
    backgroundColor: '#efefef',
    borderRadius:40,
    overflow:'hidden'
  },
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
    //backgroundColor: 'yellow'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#efefef',
    overflow:'hidden'
  },
  subTitle: {
    color: colors.primary,
  },
  title: {
    fontWeight: "500",
  },
  userDetailContainer:{
    flexDirection: 'row',
    padding:10,
    backgroundColor: colors.white,
  }
});





// import * as React from 'react';
// import { View, StyleSheet, FlatList } from "react-native";

// import ListItem from "../components/ListItem";
// import ListItemSeparatorComponent from "../components/ListItemSeparator";
// import Screen from '../components/Screen';
// import Icon from '../components/Icon';
// import colors from "../config/colors";
// import { Colors } from 'react-native/Libraries/NewAppScreen';

// const menuItems = [
//   {
//     title: "My Summaries",
//     icon: {
//       name: "text",
//       type: "Material",
//       backgroundColor: colors.primary,
//     }
//   },
//   {
//     title: "My Keywords",
//     icon: {
//       name: "format-list-text",
//       type: "Material",
//       backgroundColor: colors.primary,
//     },
//   },
//   {
//     title: "My Notes",
//     icon: {
//       name: "note-text-outline",
//       type: "Material",
//       backgroundColor: colors.primary,
//     },
//   },
// ];


// export default function ProfileScreen() {
//    return (
//      <Screen>
//       <View style={styles.container}>
//         <ListItem
//           title="Pallavi Sharma"
//           subTitle="ps6308@gmail.com"
//           image={require("../assets/pallavi.png")}
//         />
//       </View>
//       <View style={styles.container}> 
//         <FlatList
//           data={menuItems}
//           keyExtractor={menuItem => menuItem.title}
//           ItemSeparatorComponent={ListItemSeparatorComponent}
//           renderItem={({ item }) =>
//             <ListItem 
//               title={item.title}
//               ImageComponent={
//                 <Icon 
//                   name={item.icon.name}
//                   type={item.icon.type}
//                   backgroundColor={item.icon.backgroundColor}
//                 />
//               }
//             />
//           }        
//         />
//       </View>
//       <ListItem
//         title="Log Out"
//         ImageComponent={<Icon name="logout" type="Material" backgroundColor={colors.primary} />}
//       />
//      </Screen>

      
//    );
//  }

//  const styles = StyleSheet.create({
//   screen: {
//     backgroundColor: colors.light,
//   },
//   container: {
//     marginVertical: 20,
//   },
// });