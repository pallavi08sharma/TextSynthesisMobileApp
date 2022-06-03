import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import AppButton from "../components/AppButton";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      //blurRadius={1}
      style={styles.background}
      source={require("../assets/background.png")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("/Users/pallavisharma/react-practice/app/assets/logo6.png")} />
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
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
    opacity: 10
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
