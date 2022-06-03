import React,  { useState , useEffect, useRef} from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../../firebase';
import Slider from '@react-native-community/slider';

import AppButton from "../components/AppButton";
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen';
import routes from "../navigation/routes";
// import useApi from '../hooks/useApi';
import summaryApi from "../api/summary";
import UploadScreen from './UploadScreen';
import colors from "../config/colors";
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function SummaryScreen({ navigation }) {
  const userEmail = auth.currentUser.email;
  console.log("User email in Summary Screen : ", userEmail)
  const [pickedImagePath, setPickedImagePath] = useState('');   // The path of the picked image
  const [text, setText] = React.useState("");
  const scrollView = useRef();
  const [summary, setSummary] = useState('');
  const [uploadVisible, setUploadVisible] = React.useState(false);
  //const getSummaryFromTextApi = useApi(summaryApi.extractSummaryFromText);
  const [error, setError] = useState(false);
  //useEffect(() => { },[getSummaryFromTextApi]);
  const [sliderValue, setSliderValue] = useState(50);

  const pickDocument = async () => {
    try{
      let result = await DocumentPicker.getDocumentAsync({});
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

  const handleSubmit = async () => {
    //setSummary(null);
    if(text=="")
    {
      alert("Please enter input text");
    }
    else
    {
      setUploadVisible(true);
      const inputData = JSON.stringify({ user: userEmail,text : text, sliderValue: sliderValue}); 
      console.log("InputData = ", inputData);
      //setLoading(true);
      const result = await summaryApi.extractSummaryFromText(inputData);
      //setLoading(false);
      //const result = await getSummaryFromTextApi.request(inputData); 
      //getSummaryFromTextApi.data = result.data;
      //getSummaryFromTextApi.error =  (result.ok)? false : true
      setUploadVisible(false);
      //console.log("Type of Result.data =", typeof(result.data));  //String, Object
      console.log("Result =", result);
      // if(!result.ok) 
      //   return setError(true);

      //setError(false);
      if(result.data!= null && result.status==200)
      {
        //console.log("****Text = ", text);
        const textStore = text;
        console.log("****TextStore = ", textStore);
        setText("");
        setSliderValue(50);
        navigation.navigate(routes.SUMMARY_RESULTS, {Summary : result.data, Text: textStore});
      } 
      else
      {
        Alert.alert( "Error", "Couldn't get the summary", 
                        [
                          {
                            text:"Retry", onPress: ()=> {handleSubmit()}
                          },
                          {
                            text:"Cancel",onPress: () => {
                                            console.log("Cancel Pressed")
                                            setText("")},
                            style: "cancel"
                          }])
      }
    }
   
  // const response = await fetch('https://extractivesummaryapi.azurewebsites.net/SummaryPost', requestOptions)
  //     // .then(response => response.json())
  //     // .then(data => setSummary(data));
  //   setText("");
  //   //var uriGet= "https://extractivesummaryapi.azurewebsites.net/Summary?text=" + text+"&user="+userEmail
  //   //var uriGet= "http://192.168.0.9:105/keywords?text=" + text+"&user="+userEmail
  //   //console.log("URI : ", uriGet);
  //   // const response = await fetch(uriGet);
  //   //console.log("RESPONSE = ", JSON.stringify(response))
  //   const data =  await response.text();
    
  //   console.log("Data in summary screen :", data)
  // //   setSummary(data[0], function () {
  // //     console.log("Summarized Text is : ", summary);
  // // })
  //   //console.log("Summarized Text is : ", summary)
  //   //navigation.navigate(routes.SUMMARY_RESULTS, {Summary : data, Text: text})
  }

  // const handleSubmit = async () => {
  //   setSummary(null);
  //   //console.log("Text : ", text);
  //   //https://keywordsapi.azurewebsites.net
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ user: userEmail,text : text })
  // };
  // const response = await fetch('https://extractivesummaryapi.azurewebsites.net/SummaryPost', requestOptions)
  //     // .then(response => response.json())
  //     // .then(data => setSummary(data));
  //   setText("");
  //   //var uriGet= "https://extractivesummaryapi.azurewebsites.net/Summary?text=" + text+"&user="+userEmail
  //   //var uriGet= "http://192.168.0.9:105/keywords?text=" + text+"&user="+userEmail
  //   //console.log("URI : ", uriGet);
  //   // const response = await fetch(uriGet);
  //   //console.log("RESPONSE = ", JSON.stringify(response))
  //   const data =  await response.text();
    
  //   console.log("Data in summary screen :", data)
  // //   setSummary(data[0], function () {
  // //     console.log("Summarized Text is : ", summary);
  // // })
  //   //console.log("Summarized Text is : ", summary)
  //   navigation.navigate(routes.SUMMARY_RESULTS, {Summary : data, Text: text})
  // }


  return (
      <ScrollView>
        {/* ref={scrollView} 
        onContentSizeChange={()=> scrollView.current.scrollToEnd()}
        style={styles.scrollview}> */}
        <KeyboardAwareScrollView>
        <Screen style={styles.screen}>
          {/* {error && 
            Alert.alert( "Error", "Couldn't get the summary", 
                        [
                          {
                            text:"Retry", onPress: ()=> {handleSubmit()}
                          },
                          {
                            text:"Cancel",onPress: () => {
                                            console.log("Cancel Pressed")
                                            setText("")},
                            style: "cancel"
                          }])} */}
          {/* <ActivityIndicator visible={getKeywordsFromTextApi.loading}/> */}
          {/* <UploadScreen progress={progress} visible={uploadVisible}/> */}
          <UploadScreen  visible={uploadVisible}/>
            <AppTextInput style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                multiline={true}
                editable={true}
                value={text}
                placeholder="Enter your text here..."
                onChangeText={(text) => setText(text)}
            />
            <AppText style={{color:colors.secondary}}>Select Compression Rate:</AppText>
            {/*Slider with max, min, step and initial value*/}
            <Slider
              maximumValue={100}
              minimumValue={1}
              minimumTrackTintColor= "deepskyblue"
              maximumTrackTintColor="grey"
              step={1}
              value={sliderValue}
              onValueChange={(sliderValue) => setSliderValue(sliderValue)}
            />
            <AppText>{sliderValue}%</AppText>
            <View style={styles.buttonsContainer}>
              {/* <AppButton title="Upload" color="secondary" onPress={pickDocument}/>
              <AppButton title="Open camera" color="secondary" onPress={openCamera}/>
              <AppButton title="Select an image" color="secondary" onPress={showImagePicker}/>
              <View style={styles.imageContainer}>
              {
                pickedImagePath !== '' && <Image
                source={{ uri: pickedImagePath }}
                style={styles.image}/>
              }
              </View> */}
              <AppButton title="Summarize" onPress = {handleSubmit}/>
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
  scrollview:{
    backgroundColor: '#fff'
  },
  textInput: {
    height: 300,
    width: 350,
    margin: 7,
    textAlign: 'justify',
    flexShrink: 1 ,
  },
  imageContainer: {
    padding: 30
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'cover'
  }
});


// import * as React from 'react';
// import { View,SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
// import * as DocumentPicker from "expo-document-picker";

// import AppButton from "../components/AppButton";

// export default function SummaryScreen() {

//   const pickDocument = async () => {
//     let result = await DocumentPicker.getDocumentAsync({});
//     console.log(result.uri);
//     console.log(result);
//   };

//   const [text, onChangeText] = React.useState(null);

//   return (
//         <SafeAreaView style={styles.container}>
//             {/* <Text style={{fontSize:16,fontWeight:'700'}}>Summary Screen</Text> */}
//             <TextInput 
//             style={styles.textInput}
//             multiline={true}
//             editable={true}
//             autoCapitalize={'none'}
//             autoCorrect={false}
//             value={text}
//             placeholder="Enter your text here..."
//             onChangeText={(text) => {onChangeText(text)}}
//             />
//             <View style={styles.buttonsContainer}>
//               <AppButton title="Upload" color="secondary" onPress={pickDocument}/>
//               <AppButton title="Camera" color="secondary" />
//               <AppButton title="Summarize" />
//             </View>
           
//             <View style={styles.fixToText}>
// {/*               
//               <TouchableOpacity
//                 style={styles.touchableView}>
//                 <View>
//                   <Text style={styles.touchableText}>Upload</Text>
//                 </View>
//               </TouchableOpacity> 
//               <TouchableOpacity
//                 style={styles.touchableView}>
//                 <View>
//                   <Text style={styles.touchableText}>Camera</Text>
//                 </View>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.touchableView}>
//                 <View>
//                   <Text style={styles.touchableText}>Summarize</Text>
//                 </View>
//               </TouchableOpacity>  */}
//             </View>   
//         </SafeAreaView>
//     );
//  }



//  const styles = StyleSheet.create({
//   buttonsContainer: {
//     padding: 20,
//     width: "100%",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     // alignContent: 'center',
//     // flexWrap: 'wrap'
//   },
//   textInput: {
//     height: 100,
//     width: 350,
//     margin: 12,
//     textAlignVertical: 'top',
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
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     width: 280
//   }
// });