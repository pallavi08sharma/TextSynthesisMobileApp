import React from "react";
import { View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function Icon({
  name,
  type,
  size = 40,
  backgroundColor = "#000",
  iconColor = "white",
}) {

    return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* {type}==='Material' ?   */}
        <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.6} />
      {/* :
      {type}==='Feather' ? 
        <Feather name={name} color={iconColor} size={size * 0.5} />
      :
      {type}==='Ionicons' ? 
        <Ionicons name={name} color={iconColor} size={size * 0.5} />
      :
      {type}==='FontAwesome5' ? 
        <FontAwesome5 name={name} color={iconColor} size={size * 0.5} /> */}
    </View>
  );
}

export default Icon;
