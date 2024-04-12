import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import {
  Provider as PaperProvider,
  TextInput,
  Button,
} from "react-native-paper";
import Theme from "../theme.js";
import { useNavigation } from "@react-navigation/native";
import Carousel from "./part-components/Carousel.jsx";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "../FirebaseConfig.js";
import SuccessAlert from "./part-components/successComponent.jsx";
import ErrorAlert from "./part-components/errorComponent.jsx";

export default function LogInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const carouselData = [
    {
      title: "Log In Into Your Account",
      text: "Join our community and unlock exclusive features.",
    },
    {
      title: "Add Your Discount Card",
      text: "Secure your discounts with your profile",
    },
    {
      title: "Start Exploring and Saving",
      text: "Discover amazing locations and enjoy discounts.",
    },
  ];

  const signIn = async () => {
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log(response);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 1500);
      navigation.navigate("home")
    } catch(error){
      console.log(error);
      setShowErrorAlert(true)
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 1500);
    } finally {
      setLoading(false);
    }
  }


  return (
    <PaperProvider theme={Theme}>
      <View style={styles.container}>
        <Carousel data={carouselData} style={styles.carousel} />
        <SuccessAlert visible={showSuccessAlert} />
        <ErrorAlert visible={showErrorAlert} text={'Wrong email or password!'} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          label="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          label="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={signIn}
          style={styles.button}
        >
          Log In
        </Button>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.background
  },
  input: {
    width: "80%",
    backgroundColor: Theme.colors.background,
    marginBottom: 10,
    fontFamily: Theme.fonts.regular,
  },
  button: {
    alignSelf: "center",
    fontFamily: Theme.fonts.regular,
    backgroundColor: Theme.colors.blue,
    marginTop: 10,
  },
  carousel: {
    marginBottom: 0,
  },
});
