import React,  { useState , useEffect, useRef} from 'react';
import { View, StyleSheet, Image, ScrollView, Text, SafeAreaView } from "react-native";

import AppText from '../components/AppText';
import colors from '../config/colors';

// const data = {
//     title: "Journey to Self-Confidence",
//     text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
//     highlight: ['reality television biggest',
//     'grilled skinless chicken',
//     'diabetes drug canagliflozin',
//     'slightly dazed blizzard',
//     'hours shower ride',
//     'center boston children',
//     'obesity research consistently',
//     'broccoli 10 spears',
//     'new discoveries physiology',
//     'contestant weight 450']
// }


export default function HighlightKeywordsScreen({route}) {
    console.log("keywordsArray are : " , route.params.keywordsArray)
    const keywordArray = route.params.keywordsArray;
    const arr = keywordArray.map((value) =>{
        if(value.length>1)
        {
        return value.split(" ")
        }
        else
        {
        return value;
        }      
    })
    const finalKeywords = arr.toString().split(",")
    console.log("####  finalKeywords = ", finalKeywords)
    const textArr = route.params.text.split(" ")
    //console.log("Text Array = ", textArr);
    const highlighted = useRef([])
    //console.log("Keywords are : " , route.params.keywordsArray)
    //console.log("Text is : " , route.params.text)
    const HighlightText = (word, index) => {
        //console.log("Word is = ", word)
        highlighted.current = [...highlighted.current, word]

        return (
            <AppText style={{ color: 'red',backgroundColor: 'yellow' }} key={index}>{word} </AppText>
        ) 
    }

    const contains = (word) =>{
        console.log("word in contains = ", word)
        // finalKeywords.some(element=>
        //     {
        //         if(word.includes(element)){
        //             return true;
        //         }
        //     })
        // return false; 
        return true;
    }

    return (  
        <SafeAreaView>
        <ScrollView>
        <View style={styles.container}>
        <AppText>
            {textArr.map((word, index) =>      
                    finalKeywords.includes(word.toLowerCase()) || 
                    finalKeywords.some(element=>word.includes(element))|| 
                    finalKeywords.some(element=>word.toLowerCase().includes(element))?
                        // highlighted.current.includes(word) ?
                        //     <AppText style={{ color: 'black' }} key={index}>{word} </AppText>
                        //     :
                        HighlightText(word, index)
                        :
                        <AppText style={{ color: 'black' }} key={index}>{word} </AppText>
                )
            }
        </AppText>
        </View>
        </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 10,
        backgroundColor: colors.light
      }
});