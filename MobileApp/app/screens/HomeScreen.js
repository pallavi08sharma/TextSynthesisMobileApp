import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import AppButton from "../components/AppButton";
import colors from "../config/colors";
import routes from "../navigation/routes";

function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={0.8}
      style={styles.background}
      source={require("../assets/background.jpeg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logoHome.png")} />
        <Text style={styles.tagline}>Synthesize Long Texts</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 300,
    height: 180,
  },
  logoContainer: {
    position: "absolute",
    top: 1,
    alignItems: "center",
  },
  tagline: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 1,
    color: colors.primary,
  },
});

export default HomeScreen;