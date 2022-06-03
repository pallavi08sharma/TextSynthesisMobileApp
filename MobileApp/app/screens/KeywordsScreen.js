import * as React from 'react';
import { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../../firebase';

import routes from "../navigation/routes";
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import AppButton from "../components/AppButton";
import keywordsApi from "../api/keywords";
import getToken from "../api/token"
import UploadScreen from './UploadScreen';
import AppText from '../components/AppText';
import { ErrorMessage } from '../components/forms';
//import ActivityIndicator from '../components/ActivityIndicator';

export default function KeywordsScreen({ navigation }) {
  const userEmail = auth.currentUser.email;
  console.log("User email in keywords Screen : ", userEmail)
  //const [pickedImagePath, setPickedImagePath] = useState('');    // The path of the picked image
  const [text, setText] = React.useState("");
  const [minText, setMinText] = React.useState("1");
  const [maxText, setMaxText] = React.useState("3");
  const [topnText, setTopNText] = React.useState("20");
  const [uploadVisible, setUploadVisible] = React.useState(false);
  //const [error, setError] = useState(false);
  const scrollView = useRef();
  //const getKeywordsFromTextApi = useApi(keywordsApi.extractKeywordsFromText);
  //const [textFromImage, setTextFromImage] = useState(false);
  //const [progress, setProgress] = React.useState(0);
  //const [keywords, setkeywords] = useState(''); 


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
    //setkeywords(null);
    //setProgress(0);   
    if(text=="")
    {
      alert("Please enter input text");
    } 
    else if(minText<=0 || minText>3)
    {
      alert("Minimum length value should be between 1 to 3")
    }
    else if (maxText<=0 || maxText>3)
    {
      alert("Maximum length value should be between 1 to 3")
    }
    else if (minText > maxText)
    {
      alert("Min value for keyword length should be less than Max value")
    }
    else if(topnText==0)
    {
      alert("Total keywords value cannot be zero")
    }
    else
    {
      setUploadVisible(true);
      const inputData = JSON.stringify({ user: userEmail,text : text, min: parseInt(minText), max: parseInt(maxText), topn: parseInt(topnText) });   
      console.log("InputData = ", inputData);
      // const result = await getKeywordsFromTextApi.request(
      //                 inputData,
      //                 (progress) => setProgress(progress)); 
    
      const result = await keywordsApi.extractKeywordsFromText(inputData); 
      //const result = await getKeywordsFromTextApi.request(inputData); 
      setUploadVisible(false);

      console.log("Result =", result.data); 
      // if(!result.ok) 
      //   return setError(true);

      if(result.data!= null && result.status==200)
      {
        const textStore = text;
        //console.log("****TextStore = ", textStore);
        setText("");
        setMinText("1");
        setMaxText("3");
        setTopNText("20");
        navigation.navigate(routes.KEYWORDS_RESULTS, {keywordsObject : result.data, text: textStore});
      }     
      else
      {
        Alert.alert( "Error", "Couldn't get the keywords", 
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
    //const result = await keywordsApi.extractKeywordsFromText(inputData);   //Working !!
    //var uriGet= "https://keywordsapi.azurewebsites.net/keywords?text=" + text+"&user="+userEmail
    //var uriGet= "http://192.168.0.9:105/keywords?text=" + text+"&user="+userEmail
    //console.log("URI : ", uriGet);
    //const response = await fetch(uriGet);
    // const data =  await response.json();
    // console.log("Data in keywords screen :", data)
    // setkeywords(data)
    // console.log("Keywords extracted are: ", keywords)
    // //keywordGlobal=keywords
  }



  // const handleSubmit = async () => {
  //   setkeywords(null);
  //   //console.log("Text : ", text);
  //   //https://keywordsapi.azurewebsites.net
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ user: userEmail,text : text })
  // };
  // const response = await fetch('https://keywordsapi.azurewebsites.net/keywordsPost', requestOptions)
  //   //var uriGet= "https://keywordsapi.azurewebsites.net/keywords?text=" + text+"&user="+userEmail
  //   //var uriGet= "http://192.168.0.9:105/keywords?text=" + text+"&user="+userEmail
  //   //console.log("URI : ", uriGet);
  //   //const response = await fetch(uriGet);
  //   setText("");
  //   const data =  await response.json();
  //   console.log("Data in keywords screen :", data)
  //   setkeywords(data)
  //   console.log("Keywords extracted are: ", keywords)
  //   //keywordGlobal=keywords
  //   navigation.navigate(routes.KEYWORDS_RESULTS, {keywordsObject : data, text: text})
  // }

  // const textImage = () =>{
  //   setTextFromImage(true);
  // }
  return (
    // <KeyboardAvoidingView 
    // style={{flex:1, backgroundColor:'orange'}}
    // behavior={Platform.OS === "ios" ? "padding" : "height"}
    // enabled={true}
    // >
      <ScrollView>
      <KeyboardAwareScrollView>
      <Screen style={styles.screen}>
        
      {/* <ScrollView 
      ref={scrollView} 
      onContentSizeChange={()=> scrollView.current.scrollToEnd()}
      style={styles.scrollview}> */}
        {/* {error && 
          Alert.alert( "Error", "Couldn't get the keywords", 
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

        <View style={styles.optionsView}>
          <View style={styles.gramLabel}> 
            <AppText style={{color:colors.primary, margin : 7}}>Keyword length : </AppText>
          </View>
          <View style={styles.optionsTextView}> 
            <AppTextInput style={styles.textInputOptions}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
            editable={true}
            value={minText}
            placeholder="min"
            onChangeText={(minText) => setMinText(minText)}/> 
          </View>
          <View style={styles.optionsTextView}> 
            <AppTextInput style={styles.textInputOptions}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
            editable={true}
            value={maxText}
            placeholder="max"
            onChangeText={(maxText) => setMaxText(maxText)}/>
          </View>
        </View>
        {/* {(minText<=0 || minText>3) && alert("N gram value should be between 1 to 3")}
        {(maxText<=0 || maxText>3) && alert("N gram value should be between 1 to 3")}
        {(minText > maxText) && alert("Min value for N gram range should be less than Max")} */}
        <View style={styles.optionsView}> 
          <View style={styles.gramLabel}> 
            <AppText style={{color:colors.primary, margin : 7}}>Total Keywords : </AppText>
          </View>   
          <View style={styles.optionTopNView}> 
            <AppTextInput style={styles.textInputTopNOptions}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
            editable={true}
            value={topnText}
            placeholder="Top N"
            onChangeText={(topnText) => setTopNText(topnText)}/>
          </View>               
        </View>
        {/* {(topnText==0) && alert("Total keywords value cannot be zero")}                   */}
        <View style={styles.buttonsContainer}>
          {/* <AppButton title="Upload" color="secondary" onPress={pickDocument}/>
          <AppButton title="Open camera" color="secondary" onPress={openCamera}/>
          <AppButton title="Select an image" color="secondary" onPress={showImagePicker}/>
          {pickedImagePath !== '' && <View style={styles.imageContainer}>
                <Image
                source={{ uri: pickedImagePath }}
                style={styles.image}/>
          </View>} */}

          {/* <AppButton title="New Screen" color="secondary" onPress={navigation.navigate(routes.KEYWORD1)}/> */}

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
      </KeyboardAwareScrollView>
      </ScrollView>
    // {/* </KeyboardAvoidingView> */}
  );
}


 
 const styles = StyleSheet.create({
  gramLabel:{
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: "orange",
    marginRight: 4
  },
  imageContainer: {
    padding: 30
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'cover'
  },
  optionsTextView:{
    height: 30,
    width: 70,
    //backgroundColor: "yellow",
    marginHorizontal : 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionTopNView:{
    height: 30,
    width: 80,
    //backgroundColor: "yellow",
    marginHorizontal : 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsView:{
    flexDirection : 'row',
    flex: 1,
    justifyContent: "flex-start",
    margin: 5,
    padding: 4,
    borderRadius: 10,
    height : 50,
    alignItems: 'center',
    backgroundColor: colors.light
  },
  screen: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
  },
  scrollview:{
    backgroundColor: '#fff'
  },
  textInput: {
    height: 300,
    width: 350,
    margin: 7,
    textAlign: 'justify',
    flexShrink: 1 
  },
  textInputOptions:{
    height: 22,
    width: 30,
  },
  textInputTopNOptions:{
    height: 22,
    width: 50,
  }
}); 