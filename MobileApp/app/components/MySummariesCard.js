import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";


import AppText from "./AppText";
import colors from "../config/colors";

function MySummariesCard({ title, subTitle, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={2}> {title} </AppText>
          <AppText style={styles.subTitle} numberOfLines={2}> {subTitle} </AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    color: colors.primary,
    marginBottom: 7,
  },
});

export default MySummariesCard;
