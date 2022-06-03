import React from 'react';
import { View, StyleSheet, Share,ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from '../../firebase';
import {db} from '../../firebase';

import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from "../components/AppButton";
import { doc, setDoc } from "firebase/firestore";

function NotesScreen(props) {
  const userEmail = auth.currentUser.email;
  const [text, setText] = React.useState("");

  const create = () => {
    console.log("Inside create function")
    if(text=="")
    {
      alert("Please enter input text");
    }
    else
    {
      let epoch = new Date() // Or any unix timestamp
      let currentDateTime = new Date(epoch),
      year = currentDateTime.getUTCFullYear(),
      month = currentDateTime.getUTCMonth(),
      date = currentDateTime.getUTCDate(),
      time = currentDateTime.toTimeString().substr(0,5);
      const timestamp = year +"-" + month + "-" + date + " " + time
      const collectionName = userEmail
      const documentInCollection = "Note " + timestamp
      const myDoc = doc(db, collectionName, documentInCollection)
      const obj = {'data' : text}
      
      setDoc(myDoc,obj)
      .then(()=> {
        setText("")
        alert("Notes Saved !")
  
      })
      .catch((error)=> {
        alert(error.message)
      })
    }
  }

  const onShare = async () => {
    if(text=="")
    {
      alert("Please enter input text");
    }
    else
    {
      try {
        const result = await Share.share({
        message: text,
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
      } 
      catch (error) {
        alert(error.message);
      }
    }
  };


  return (
    <ScrollView >
    <KeyboardAwareScrollView>
    <Screen style={styles.screen}>
        <AppTextInput style={styles.textInput}
          autoCapitalize="sentences"
          autoCorrect={true}
          multiline={true}
          editable={true}
          value={text}
          placeholder="Enter your text here..."
          //onChangeText={(text) => {onChangeText(text)}}
          onChangeText={(text) => setText(text)}
        />
        <View style={styles.buttonsContainer}>
          <AppButton title="Share" onPress={onShare}/>
          <AppButton title="Save" color="primary" onPress={create}/> 
        </View>
    </Screen>
    </KeyboardAwareScrollView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  buttonsContainer: {
    paddingHorizontal: 0,
    width: "100%",
},
  screen: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  textInput: {
    height: 300,
    width: 350,
    margin: 7,
    textAlign: 'justify',
    flexShrink: 1 
  },
})

export default NotesScreen;


// import * as React from 'react';
// import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";

// export default function NotesScreen() {
//   const [text, onChangeText] = React.useState(null);
//    return (
// <SafeAreaView style={styles.container}>
//             {/* <Text style={{fontSize:16,fontWeight:'700'}}>Summary Screen</Text> */}
//             <TextInput 
//             style={styles.input}
//             onChangeText={onChangeText}
//             placeholder="Enter your text here..."
//             value={text}/>
//           <View style={styles.fixToText}>
//             <TouchableOpacity
//               style={styles.touchableView}>
//                 <View>
//                   <Text style={styles.touchableText}>AutoCorrect</Text>
//                 </View>
//             </TouchableOpacity> 
//             <TouchableOpacity
//               style={styles.touchableView}>
//                 <View>
//                   <Text style={styles.touchableText}>Save</Text>
//                 </View>
//             </TouchableOpacity>
//           </View>   
//         </SafeAreaView>
//    );
//  }

//  const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center'
//   },
//   input: {
//     height: 50,
//     width: 350,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10
//   },
//   touchableView: {
//     marginBottom:30,
//     flex: 1,
//     height: 33,
//     alignItems: 'center',
//     backgroundColor: 'grey',
//     borderWidth: 0.5,
//     borderRadius: 6,
//     borderColor: 'deepskyblue'
//   },
//   touchableText: {
//     textAlign: 'center',
//     paddingTop: 3,
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: 'deepskyblue'
//   },
//   fixToText: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: 220
//   }
// }); 