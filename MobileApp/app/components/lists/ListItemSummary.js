import React from "react";
import { View, StyleSheet, TouchableHighlight, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import AppText from "../AppText";
import colors from "../../config/colors";
import ListItemSeparator from "./ListItemSeparator";

function ListItemSummary({
  entries,
  onPress,
  renderRightActions,
}) {
  //console.log("entries.data() = ", entries.data()) 
  const arrEntries = Object.entries(entries.data());
  //console.log("arrEntries = ", arrEntries) 
  //console.log("Object.keys(arrEntries) = ",Object.keys(entries.data()))
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.card}>
        <FlatList
            data={Object.keys(arrEntries)}
            //data={Object.keys(entries.data())}
            renderItem={({ item }) => (
            <View style={styles.textContainer}>
                {arrEntries[item][0]=="text" && <AppText style={styles.summary} numberOfLines={2}> {arrEntries[item][1]}</AppText>}
                {arrEntries[item][0]=="summary" && <AppText style={styles.summary} numberOfLines={4}> {arrEntries[item][1]}</AppText>}
                
                {/* <AppText style={styles.summary} numberOfLines={3}> {(Object.values(entries.data()))[1]}</AppText> */}
                <ListItemSeparator></ListItemSeparator>
                {/* <AppText style={styles.summary} numberOfLines={3}> {arrEntries[item][0]} </AppText> */}
                {/* <AppText style={styles.summary} numberOfLines={3}> {(Object.values(entries.data()))[0]} </AppText> */}
            </View>)}
            keyExtractor={(item, index) => index.toString()}
        />
        {/* <View style={styles.detailsContainer}>
          <AppText style={styles.summary} numberOfLines={2}> {arrEntries[item][1]}</AppText>
          <AppText style={styles.summary} numberOfLines={3}> {arrEntries[item][0]} </AppText>
        </View> */}
      </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: colors.white,
    margin: 9,
    overflow: "hidden",
    padding: 7
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
});

export default ListItemSummary;
