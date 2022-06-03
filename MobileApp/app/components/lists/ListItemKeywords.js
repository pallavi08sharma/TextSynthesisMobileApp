import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import AppText from "../AppText";
import colors from "../../config/colors";

function ListItemKeywords({
  entries,
  renderRightActions,
}) {
  //console.log("entries = ", entries.data())  
  const arrEntries = Object.entries(entries.data());
  //console.log("arrEntries = ", arrEntries) 
  return (
    <Swipeable renderRightActions={renderRightActions}>
    {/* <Swipeable > */}
      {/* <TouchableHighlight underlayColor={colors.light} onPress={onPress}> */}
      <View style={styles.card}>
        <FlatList
            data={Object.keys(arrEntries)}
            renderItem={({ item }) => (
            <View style={styles.textContainer}>
                <AppText style={styles.text}>{arrEntries[item][0]}</AppText>
                <AppText style={styles.text}> : </AppText>
                <AppText style={styles.text}>{arrEntries[item][1]}</AppText>
            </View>)}
            keyExtractor={(item, index) => index.toString()}
      />
      </View>
      {/* </TouchableHighlight> */}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: colors.white,
    marginVertical: 9,
    marginHorizontal : 2,
    padding : 11,
    width: 360
    //overflow: "hidden",
    //borderColor: colors.primary
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  summary: {
    color: colors.secondary,
    marginBottom: 7,
  },
  text:{
    fontWeight : "500",
    fontSize: 18,
    color: colors.secondary
  },
  textContainer:{
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'black',
  }
});

export default ListItemKeywords;
