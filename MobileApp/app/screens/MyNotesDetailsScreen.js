
import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Speech from 'expo-speech';

import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import colors from "../config/colors";
import defaultStyles from "../config/styles"; 

function MyNotesDetailsScreen({ route }) {
    const text = route.params.text
    const [collapsedText, setCollapsedText] = useState(true);
    const toggleExpandedText= () => {
        //Toggling the state of single Collapsible
        setCollapsedText(!collapsedText);
    };

    const speak = (thingToSay) => {
        Speech.speak(thingToSay);
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


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView> 
            <AppText style={styles.text}> Click this to expand the content of your note</AppText>
                <AppButton title="Note" onPress={toggleExpandedText}/>
               
                {/*Content of Single Collapsible*/}
                <Collapsible collapsed={collapsedText} align="center">
                    <View style={styles.speakerView}>
                        <AppTextInput style={styles.originalText} editable={false} multiline={true}> {text} </AppTextInput>
                        <View style={styles.iconsLayout}> 
                            <MaterialCommunityIcons
                            name="text-to-speech"
                            size={23}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}
                            onPress={()=>speak(text)}
                            />
                            <MaterialCommunityIcons
                            name="pause-circle-outline"
                            size={23}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}
                            onPress={()=>pause()}
                            />
                            <MaterialCommunityIcons
                            name="play-circle-outline"
                            size={23}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}
                            onPress={()=>resume()}
                            />
                            <MaterialCommunityIcons
                            name="stop-circle-outline"
                            size={23}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}
                            onPress={()=>stop()}
                            />
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
    originalText: {
        height: 400,
        width: 350,
        margin: 7,
        textAlign: 'justify',
        flexShrink: 1,
        fontSize: 15
    },
    icon:{
        margin: 7
    },
    iconsLayout:{
        flexDirection: 'row'
    }
})

export default MyNotesDetailsScreen;