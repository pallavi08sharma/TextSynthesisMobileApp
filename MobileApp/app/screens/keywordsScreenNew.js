import * as React from 'react';
import { useState, useRef} from 'react';
import { View, StyleSheet,Image, ScrollView } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';

import routes from "../navigation/routes";
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppText from '../components/AppText';
import AppButton from "../components/AppButton";
import {
    Form,
    FormField,
    SubmitButton,
  } from "../components/forms";


export default function KeywordsScreenNew({ navigation }) {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [text, onChangeText] = React.useState(null);
  //const [loading, setLoading] = useState(false);
  const [keywords, setkeywords] = useState(null);
  const scrollView = useRef();
  const [textFromImage, setTextFromImage] = useState(false);
  

  const pickDocument = async () => {
    try{
      let result = await DocumentPicker.getDocumentAsync({});
      alert(result.uri);
      console.log(result.uri);
      console.log(result);
    }
    catch(error)
    {
      console.log('Error picking document',error);
    }
  };

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  const handleSubmit = () => {
    setkeywords(null);
    console.log(text);
    var uriGet= "http://192.168.0.9:105/data?text=" + text
    console.log(uriGet);
    //setLoading===true
    fetch(uriGet)
      .then(response => response.json())
      .then(data => console.log(data))
      .then(data => {setkeywords(data)});
      //setLoading==false
      console.log("Keywords extracted are: ")
      console.log(keywords)
      navigation.navigate(routes.KEYWORDS_RESULTS)
  }

  const textImage = () =>{
    setTextFromImage(true);
  }
  return (
    <ScrollView 
    ref={scrollView} 
    onContentSizeChange={()=> scrollView.current.scrollToEnd()}
    style={styles.sc}>
        <Screen style={styles.screen}>
        <Form
         initialValues={{ textInput: ""}}
         onSubmit={handleSubmit}
        > 
            <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="textInput"
            placeholder="Enter your text here ..."
            />
            <View style={styles.buttonsContainer}>
                <AppButton title="Upload" color="secondary" onPress={pickDocument}/>
                <AppButton title="Open camera" color="secondary" onPress={openCamera}/>
                <AppButton title="Select an image" color="secondary" onPress={showImagePicker}/>
                {pickedImagePath !== '' && <View style={styles.imageContainer}>
                    <Image
                    source={{ uri: pickedImagePath }}
                    style={styles.image}/>
                </View>}
                <AppButton title="Text from an image" color="secondary" onPress={textImage}/>
            </View>
            <SubmitButton title="Extract Keywords" />
        </Form>
        <AppTextInput style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={true}
          editable={true}
          value={text}
          placeholder="Enter your text here..."
          onChangeText={(text) => {onChangeText(text)}}
        />
        <View style={styles.buttonsContainer}>
          <AppButton title="Upload" color="secondary" onPress={pickDocument}/>
          <AppButton title="Open camera" color="secondary" onPress={openCamera}/>
          <AppButton title="Select an image" color="secondary" onPress={showImagePicker}/>
          {pickedImagePath !== '' && <View style={styles.imageContainer}>
                <Image
                source={{ uri: pickedImagePath }}
                style={styles.image}/>
          </View>}

          <AppButton title="Text from an image" color="secondary" onPress={textImage}/>
          
          {/* <View style={styles.imageContainer}>
            {
                pickedImagePath !== '' && <Image
                source={{ uri: pickedImagePath }}
                style={styles.image}/>
            }
          </View> */}
          <AppButton title="Extract Keywords" onPress = {handleSubmit}/>
        </View>
      </Screen>
    </ScrollView>
  );
}


 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: 350,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  imageContainer: {
    padding: 30
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'cover'
  },
  screen: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  scrollview:{
    backgroundColor: '#fff'
  },
  textInput: {
    height: 200,
    width: 350,
    margin: 7,
    textAlign: 'justify',
    flexShrink: 1 
  },
  touchableView: {
    marginBottom:30,
    flex: 1,
    height: 33,
    alignItems: 'center',
    backgroundColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: 'deepskyblue'
  },
  touchableText: {
    textAlign: 'center',
    paddingTop: 3,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'deepskyblue'
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120
  }
}); 


// import * as React from 'react';
// import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";

// export default function KeywordsScreen() {
//   const [text, onChangeText] = React.useState(null);
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* <Text style={{fontSize:16,fontWeight:'700'}}>Summary Screen</Text> */}
//       <TextInput 
//         style={styles.input}
//         onChangeText={onChangeText}
//         placeholder="Enter your text here..."
//         value={text}/>
//       <View style={styles.fixToText}>
//         <TouchableOpacity
//           style={styles.touchableView}>
//           <View>
//             <Text style={styles.touchableText}>Keywords</Text>
//           </View>
//         </TouchableOpacity>    
//       </View>   
//     </SafeAreaView>
//   );
// }


 
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
//     width: 120
//   }
// }); 