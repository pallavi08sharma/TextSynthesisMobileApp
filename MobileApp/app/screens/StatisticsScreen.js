import React, { useState, useEffect, useCallback } from "react";
import { View, Text,StyleSheet,Dimensions, ActivityIndicator } from "react-native";
import { auth } from '../../firebase';
import {db} from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import {LineChart,BarChart,PieChart,ProgressChart,ContributionGraph,StackedBarChart} from 'react-native-chart-kit';

import colors from "../config/colors";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { useFocusEffect } from "@react-navigation/core";

export default function StatisticsScreen({navigation}) {
  console.log("DEBUG: Inside Statistics Screen ")
  const userEmail = auth.currentUser.email;
  let keywordsTotal = 0;
  let summaryTotal = 0;
  let notesTotal = 0;
  
  // const [keywordsCount, setKeywordsCount] = useState(0);
  // const [summaryCount, setSummaryCount] = useState(0);
  // const [notesCount, setNotesCount] = useState(0);
  const [dataArrayCount, setDataArrayCount] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  // const dataArray = [];

  // function* yLabel() {
  //   yield* [0, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];
  // }
  // const yLabelIterator = yLabel();


  const computeCountsFromDB = async () =>{
    //setLoading(true);
    keywordsTotal = 0;
    summaryTotal = 0;
    notesTotal = 0;
    console.log("DEBUG: Inside Statistics Screen - ComputeCountsFromDB Function ")
    const querySnapshot = await getDocs(collection(db, userEmail));
    querySnapshot.forEach((doc) => {
      //console.log("Doc ID = ", doc.id);
      if((doc.id).includes("keywords")){
        keywordsTotal = keywordsTotal + 1
      }
      else if((doc.id).includes("Summary")){
        summaryTotal = summaryTotal + 1
      }
      else if((doc.id).includes("Note")){
        notesTotal = notesTotal+1
      }        
    })
    // setKeywordsCount(keywordsTotal);
    // setSummaryCount(summaryTotal);
    // setNotesCount(notesTotal);
    // dataArray.push(summaryTotal);
    // dataArray.push(keywordsTotal);
    // dataArray.push(notesTotal);
    //setLoading(false);
    //setDataArrayCount(dataArray);
    setDataArrayCount([summaryTotal,keywordsTotal,notesTotal]);
    // console.log("********* KeywordCount = ", keywordsTotal)
    // console.log("@@@@@@@@@ summaryCount = ", summaryTotal)
    // console.log("######### notesCount = ", notesTotal)
    // console.log("========> dataArray = ", dataArray)
    // console.log("%%%%%%%%% dataArrayCount = ", dataArrayCount.length)
  }

  const loadCountsFromDB=()=>{
    computeCountsFromDB();
  }

  useEffect(() => {
    //console.log("In Use Effect of Statistics")
    let isCancelled = false;
    loadCountsFromDB();
    return () => {
     // console.log("Cleaning up Statistics");
      isCancelled = true;
    };
  },[]);

  // useFocusEffect(() => {
  //   console.log("In Use Focus Effect of Statistics")
  //   let isCancelled = false;
  //   loadCountsFromDB();
  //   return () => {
  //     console.log("Use Focus Effect Cleaning up Statistics");
  //     isCancelled = true;
  //   };
  // });
  useFocusEffect(useCallback(() => {
    console.log("In Use Focus Effect of Statistics")
    let isCancelled = false;
    loadCountsFromDB();
    return () => {
      console.log("Use Focus Effect Cleaning up Statistics");
      isCancelled = true;
    };
  }, []));


  const MyBarChart = () => {
    //console.log("DEBUG: Inside Statistics Screen - MyBarChart Function ")
    //console.log("DEBUG: dataArrayCount =", dataArrayCount)
    // if(dataArrayCount!=[]){
    //   if(dataArrayCount.length){
        return (
          <>
            <Text style={styles.header}>Archived Feature Counts</Text>
            <BarChart
              data={{
                labels: ['Summaries', 'Keywords', 'Notes'],
                datasets: [
                  {
                    data: dataArrayCount.map(item=>{return(item)})
                  },
                ],
              }}
              width={Dimensions.get('window').width - 25}
              height={220}
              fromZero={true}
              //yAxisInterval= {1}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: colors.primary,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                //formatYLabel: () => yLabelIterator.next().value,
                // style: {
                //   borderRadius: 18,
                // },
              }}
              style={{
                marginVertical: 6,
                borderRadius: 16,
                margin: 15
              }}
            />
          </>
        );
      // }
      // else{
      //   return(
      //     <View style={{justifyContent:"center",alignItems:'center',flex:1}}>
      //     <ActivityIndicator size="large"/>
      //     </View>
      //   )
      // }
    // }
    // else{
    //   return( 
    //     <View style={{justifyContent:"center",alignItems:'center',flex:1}}>       
    //     <Text>No data found</Text>       
    //     </View>
    //     )
    // }    
  };

  // const MyLineChartSummary = () => {
  //   return (
  //     <>
  //       <Text style={styles.header}>Line Chart</Text>
  //       <LineChart
  //         data={{
  //           labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug' , 'Sep', 'Oct', 'Nov', 'Dec'],
  //           datasets: [
  //             {
  //               data: [2, 4, 8, 7, 11, 13],
  //               strokeWidth: 2,
  //             },
  //           ],
  //         }}
  //         width={Dimensions.get('window').width - 16}
  //         height={220}
  //         fromZero={true}
  //         yAxisInterval= {3}
  //         spacing={0.8}
  //         spacingInner={0.8}
  //         withInnerLines={true}
  //         chartConfig={{
  //           backgroundColor: '#1cc910',
  //           backgroundGradientFrom: '#eff3ff',
  //           backgroundGradientTo: colors.primary,
  //           decimalPlaces: 0,
  //           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //           style: {
  //             borderRadius: 18,
  //           },
  //         }}
  //         style={{
  //           marginVertical: 8,
  //           borderRadius: 16,
  //         }}
  //       />
  //     </>
  //   );
  // };
  
   return (
    <Screen style={styles.screen}>
        { dataArrayCount==null && <ActivityIndicator visible={true} />}
        { dataArrayCount!=null && <MyBarChart />}
    </Screen>
   );
 }


 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    //padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
    fontWeight : "bold",
    color: colors.secondary
  },
  screen: {
    backgroundColor: colors.light,
    padding: 5,
    alignItems:'center'
  }
}); 