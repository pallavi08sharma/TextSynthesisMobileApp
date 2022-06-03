
import React,{ useState,useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView,View,Text, TouchableHighlight, TouchableOpacity } from 'react-native';
//import for the collapsible/Expandable view
import Collapsible from 'react-native-collapsible';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Speech from 'expo-speech';

import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import colors from "../config/colors";
import defaultStyles from "../config/styles"; 


function MySummaryDetailsScreen({ route }) {
    const text = route.params.text
    const summary = route.params.summary
    //console.log("Route params text in MySummariesDetails screen = ", route.params.text)
    //console.log("Route params SUmmary in MySummariesDetails screen = ", route.params.summary)

    // Collapsed condition for the single collapsible
    const [textPlay, setTextPlay] = useState(false);
    const [summaryPlay, setSummaryPlay] = useState(false);
    const [collapsedText, setCollapsedText] = useState(false);
    const [collapsedSummary, setCollapsedSummary] = useState(true);
    const toggleExpandedText= () => {
        //Toggling the state of single Collapsible
        setCollapsedSummary(!collapsedSummary);
        setCollapsedText(!collapsedText);
        stop();
    };

    const toggleExpandedSummary= () => {
        //Toggling the state of single Collapsible
        setCollapsedText(!collapsedText);
        setCollapsedSummary(!collapsedSummary);
        stop();
    };

    const speak = (thingToSay) => {
        console.log("Speaking  !!")
        try {
            Speech.speak(thingToSay);
        }
        catch(error) {
            alert(error.message);
          }
    };

    const pause = () => {
        Speech.pause();
    };

    const stop = () => {
        Speech.stop();
    };

    const resume = () => {
        Speech.resume();
    };

    useEffect(() => {
        console.log("In useEffect of MySummaryDetails")
        let isCancelled = false;
        return () => {
          console.log("Cleaning up My Summaries Details");
          isCancelled = true;
          stop();
        };
      },[]);
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView> 
                <AppText style={styles.text}> Click these buttons to expand their content</AppText>
                <AppButton title="Original Text" onPress={toggleExpandedText}/>
               
                {/*Content of Single Collapsible*/}
                <Collapsible collapsed={collapsedText} align="center">
                    <View style={styles.speakerView}>
                        <AppTextInput style={styles.originalText} editable={false} multiline={true}> {text} </AppTextInput>
                        <View style={styles.iconsLayout}> 
                        <TouchableOpacity onPress={()=>speak(text)}>
                            <MaterialCommunityIcons
                            name="text-to-speech"
                            size={23}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>pause()}>
                            <MaterialCommunityIcons
                            name="pause-circle-outline"
                            size={23}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>resume()}>
                            <MaterialCommunityIcons
                            name="play-circle-outline"
                            size={23}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}                            
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>stop()}>
                            <MaterialCommunityIcons
                            name="stop-circle-outline"
                            size={23}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}
                            />
                        </TouchableOpacity>
                        </View>
                    </View>
                </Collapsible>
                {/*Code for Single Collapsible Ends*/}
                <AppButton title="Summarized Text" onPress={toggleExpandedSummary}/>
                <Collapsible collapsed={collapsedSummary} align="center">
                    <View style={styles.speakerView}>
                        <AppTextInput style={styles.summaryText} editable={false} multiline={true}> {summary} </AppTextInput>
                        <View style={styles.iconsLayout}> 
                        <TouchableOpacity onPress={()=>speak(summary)}>
                            <MaterialCommunityIcons
                            name="text-to-speech"
                            size={23}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}                           
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>pause(summary)}>
                            <MaterialCommunityIcons
                            name="pause-circle-outline"
                            size={23}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>resume(summary)}>
                            <MaterialCommunityIcons
                            name="play-circle-outline"
                            size={23}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>stop(summary)}>
                            <MaterialCommunityIcons
                            name="stop-circle-outline"
                            size={23}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}
                            />
                        </TouchableOpacity>
                        </View>
                    </View>
                </Collapsible>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        margin: 13
    }, 
    icon:{
        margin: 7
    },
    iconsLayout:{
        flexDirection: 'row',
        // backgroundColor: 'yellow'
    },
    originalText: {
        height: 400,
        width: 350,
        margin: 7,
        textAlign: 'justify',
        flexShrink: 1,
        fontSize: 15
    },

    summaryText: {
        height: 400,
        width: 350,
        margin: 7,
        textAlign: 'justify',
        flexShrink: 1 
    },
    text: {
        color: colors.dark,
        fontSize: 16

    },
})

export default MySummaryDetailsScreen;