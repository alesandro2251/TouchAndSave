import React, { useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Animated } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Button } from "react-native-paper";
import Theme from "../theme.js";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const translateYAnim = useRef(new Animated.Value(-100)).current;
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColorAnim, {
        toValue: -0.1,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [translateYAnim, backgroundColorAnim]);

  const navigation = useNavigation();


  return (
    <PaperProvider theme={Theme}>
      <Animated.View style={[styles.container]}>
        <Animated.Text
          style={[
            styles.title,
            { transform: [{ translateY: translateYAnim }] },
          ]}
        >
          Touch&Save
        </Animated.Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("log in")}
            style={[styles.button, styles.defaultButton]}
            labelStyle={{ color: Theme.colors.white }}
            icon='login'
          >
            Log In
          </Button>
          <Button
            onPress={() => navigation.navigate("sign up")}
            style={[styles.button, styles.defaultButton]}
            labelStyle={{ color: Theme.colors.white }}
            icon='email'
          >
            Sign Up with Email
          </Button>
          <Button
            onPress={() => console.log("Sign with Google")}
            style={[styles.button, styles.googleButton]}
            textColor={Theme.colors.black}
            icon='google'
          >
            Sign In with Google
          </Button>
          <Button
            onPress={() => console.log("Sign with Apple")}
            style={[styles.button, styles.appleButton]}
            textColor={Theme.colors.white}
            icon='apple'
          >
            Sign In with Apple
          </Button>
        </View>
        <StatusBar style="auto" />
      </Animated.View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.background
  },
  title: {
    fontSize: 35,
    marginBottom: 20,
    fontFamily: Theme.fonts.medium,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 20,
    marginTop: 50,
  },
  button: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 14,
  },
  googleButton: {
    color: "#FFFFF",
    backgroundColor: Theme.colors.white,
  },
  appleButton: {
    backgroundColor: Theme.colors.black,
    color: Theme.colors.white,
  },
  defaultButton: {
    backgroundColor: Theme.colors.blue,
  },
});
