import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import colors from "../config/colors";

function AppTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.textInputcontainer}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.white}
          style={styles.icon}
        />
      )}
      <TextInput style={defaultStyles.text} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputcontainer: {
    backgroundColor: colors.greymedium,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 10,
    paddingLeft: 15,
    marginVertical: 10,
    //flexWrap: 'wrap'
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
