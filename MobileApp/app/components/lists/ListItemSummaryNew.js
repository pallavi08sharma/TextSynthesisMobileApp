import React, {useRef}from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import AppText from "../AppText";
import colors from "../../config/colors";

function ListItemSummaryNew({
  originaltext,
  summary,
  onPress,
  renderRightActions,
}) {
  const swipeableRef = useRef(null);

  const closeSwipeable = () => {
    swipeableRef.current.close();
  }
//   console.log("In ListItemSummaryNew **** originaltext = ", originaltext) 
//   console.log("In ListItemSummaryNew **** summary = ", summary)
  return (
    <Swipeable
    ref={swipeableRef} 
    renderRightActions={renderRightActions}
    //onSwipeableOpen={() => closeSwipeable()}
    >
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
          <AppText style={styles.text} numberOfLines={2}> {originaltext}</AppText>
          {summary && <AppText style={styles.summary} numberOfLines={4}> {summary} </AppText>}
      </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: colors.white,
    margin: 9,
    padding: 11
  },
  summary: {
    color: colors.medium,
    marginBottom: 7,
  },
  text: {
    color: colors.dark,
    marginBottom: 7,
  },
});

export default ListItemSummaryNew;
