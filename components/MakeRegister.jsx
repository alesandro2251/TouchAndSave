import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import {
  Provider as PaperProvider,
  TextInput,
  Button,
  HelperText,
} from "react-native-paper";
import Theme from "../theme.js";
import { useNavigation } from "@react-navigation/native";
import Carousel from "./part-components/Carousel.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firebaseDB } from "../FirebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function MakeRegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [showNames, setShowNames] = useState(true);
  const [showLocation, setShowLocation] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNamesSubmit = () => {
    if (email && firstName && lastName) {
      setShowNames(false);
      setShowLocation(true);
    }
  };

  const handleLocationSubmit = () => {
    if (city && country && phoneNumber) {
      setShowLocation(false);
      setShowPasswords(true);
    }
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      console.log("Password doesnt match");
    } else {
      console.log("Completed");
      handelRegInfo();
    }
  };

  const handelRegInfo = () => {
    console.log("-----------------------------------");
    console.log("Email:", email);
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("City:", city);
    console.log("Country:", country);
  };

  const carouselData = [
    {
      title: "Create Your Account",
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

  // const sendDataToFirestore = async (
  //   email,
  //   firstName,
  //   lastName,
  //   country,
  //   city,
  //   phoneNumber,
  //   cardNumber
  // ) => {
  //   try {
  //     await addDoc(collection(firebaseDB, "users"), {
  //       email,
  //       firstName,
  //       lastName,
  //       country,
  //       city,
  //       phoneNumber,
  //       cardNumber,
  //     });
  //     console.log("Data added to Firestore successfully!");
  //   } catch (error) {
  //     console.error("Error adding document: ", error);
  //   }
  // };

  const sendDataToFirestore = async (
    email,
    firstName,
    lastName,
    country,
    city,
    phoneNumber,
    cardNumber
  ) => {
    try {
      await addDoc(collection(firebaseDB, "users"), {
        email,
        firstName,
        lastName,
        country,
        city,
        phoneNumber,
        cardNumber,
        createdAt: serverTimestamp(), // Add server timestamp
      });
      console.log("Data added to Firestore successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      console.log(response);
      handleRegister();
      sendDataToFirestore(
        email.toLowerCase(),
        firstName,
        lastName,
        country,
        city,
        phoneNumber,
        cardNumber
      );
      navigation.navigate("home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasErrors = () => {
    return !email.includes("@") && email.length > 0;
  };

  const hasPhoneErrors = () => {
    if (phoneNumber.length < 10 || phoneNumber.length > 12) {
      return true; // Return true if the phone number length is invalid
    } else {
      return false; // Return false if the phone number length is valid
    }
  };

  return (
    <PaperProvider theme={Theme}>
      <View style={styles.container}>
        <Carousel data={carouselData} style={styles.carousel} />
        {showNames && (
          <>
            <HelperText size={10} type="error" visible={hasErrors()}>
              Email address is invalid!
            </HelperText>
            <TextInput
              style={styles.input}
              placeholder="Email"
              label="Email"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              label="First Name"
              onChangeText={setFirstName}
              value={firstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              label="Last Name"
              onChangeText={setLastName}
              value={lastName}
            />
            <Button
              mode="contained"
              onPress={handleNamesSubmit}
              style={styles.button}
            >
              Next
            </Button>
          </>
        )}
        {showLocation && (
          <>
            <HelperText size={10} type="error" visible={hasPhoneErrors()}>
              Phone number is invalid!
            </HelperText>
            <TextInput
              style={styles.input}
              placeholder="Country"
              label="Country"
              onChangeText={setCountry}
              value={country}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              label="City"
              onChangeText={setCity}
              value={city}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              label="Phone Number"
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              keyboardType="numeric"
            />
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleLocationSubmit}
            >
              Next
            </Button>
          </>
        )}
        {showPasswords && (
          <>
            <View style={styles.helpContainer}>
              <HelperText style={styles.helperText} size={14} type="info">
                Password must contain:
              </HelperText>
              <View style={styles.subTextContainer}>
                <HelperText style={styles.subText} size={12} type="info">
                  • Minimum 8 characters
                </HelperText>
                <HelperText style={styles.subText} size={12} type="info">
                  • Minimum 1 letter
                </HelperText>
  
              </View>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              label="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              label="Confirm Password"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry
            />
            <Button style={styles.button} mode="contained" onPress={signUp}>
              Create Account
            </Button>
          </>
        )}
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.background,
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
  helpContainer: {
    marginVertical: 10,
  },
  helperText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subTextContainer: {
    marginLeft: 20, // Indent subtext to create a nested appearance
  },
  subText: {
    fontSize: 12,
    marginTop: 5, // Add some vertical spacing between subtexts
  },
});
