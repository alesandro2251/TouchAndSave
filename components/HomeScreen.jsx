import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  TextInput,
  Button,
  Card,
  Text,
} from "react-native-paper";
import Theme from "../theme.js";
import { useNavigation } from "@react-navigation/native";
import useAuthenticatedUserData from "./part-components/Authentication.jsx";
import {
  useFirestoreData,
  updateUserData,
} from "./part-components/FirestoreDataFetching.jsx";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState("");
  const [showCard, setShowCard] = useState(false);

  const { email, loading } = useAuthenticatedUserData();

  useEffect(() => {
    if (!loading && email) {
      console.log("Logged-in user data:", email);
    } else {
      console.log("error");
    }
  }, [loading, email]);

  const { userData, loader } = useFirestoreData(email);

  const name = userData.length > 0 ? userData[0].firstName : "";

  const updateCardNumber = async (newCardNumber) => {
    try {
      const updatedData = { cardNumber: newCardNumber };
      await updateUserData(userData[0].id, updatedData)
      console.log("User data updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleSave = () => {
    console.log("Saving card number:", cardNumber);
    updateCardNumber(cardNumber);
    setShowCard(true);
  };
  
  useEffect(() => {
    if (userData.length > 0 && userData[0].cardNumber !== "") {
      setShowCard(true);
    }
  }, [userData]);

  const card = userData.length > 0 ? userData[0].cardNumber : "";

  return (
    <PaperProvider theme={Theme}>
      <View style={styles.container}>
        <Appbar.Header style={{backgroundColor: '#F6F4EB'}}>
          <Appbar.Content title="Touch&Save" />
          <Appbar.Action
            icon="map-marker-star"
            color={Theme.colors.blue}
            onPress={() => navigation.navigate("locations")}
          />
          <Appbar.Action
            icon="account"
            color={Theme.colors.blue}
            onPress={() => navigation.navigate("account")}
          />
        </Appbar.Header>

        <Text style={styles.text}>Welcome, {name}!</Text>

        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Title title="Discount Card" />
            <Card.Content>
              {showCard === false && (
                <>
                  <TextInput
                    style={styles.input}
                    label={"Add your card number"}
                    value={cardNumber}
                    onChangeText={(text) => {
                      if (text.length <= 16) {
                        setCardNumber(text.replace(/\D/g, ""));
                      }
                    }}
                    keyboardType="numeric"
                    maxLength={16}
                  />
                  <View style={styles.buttonWrapper}>
                    <Button
                      style={styles.button}
                      mode="contained"
                      onPress={handleSave}
                      disabled={cardNumber.length !== 16}
                    >
                      Save
                    </Button>
                  </View>
                </>
              )}
              {showCard && (
                <View style={styles.cardDisplayContainer}>
                  <Card style={styles.cardDisplay}>
                    <Card.Content>
                      <Text style={styles.cardTitle}>Touch&Save</Text>
                      <Text style={styles.cardNumber}>
                        {card}
                      </Text>
                    </Card.Content>
                  </Card>
                </View>
              )}
            </Card.Content>
          </Card>
        </View>

        <View style={styles.buttonContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Text
                style={{
                  fontSize: 30,
                  marginBottom: 20,
                  fontFamily: Theme.fonts.regular,
                }}
              >
                Visit our locations and take the discount
              </Text>
              <Button
                style={styles.button}
                mode="contained"
                onPress={() => navigation.navigate("locations")}
              >
                Check locations
              </Button>
            </Card.Content>
          </Card>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  text: {
    margin: 20,
    marginBottom: 0,
    fontSize: 22,
    color: Theme.colors.black,
    fontFamily: Theme.fonts.regular,
  },
  cardContainer: {
    margin: 20,
    marginBottom: 20,
  },
  cardDisplayContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonWrapper: {
    marginTop: 10,
  },
  button: {
    backgroundColor: Theme.colors.blue,
    color: Theme.colors.white,
    fontFamily: Theme.fonts.regular,
  },
  input: {
    backgroundColor: Theme.colors.white,
    marginBottom: 10,
    fontFamily: Theme.fonts.regular,
  },
  card: {
    backgroundColor: Theme.colors.white,
    elevation: 5,
    shadowColor: '#00000', // Shadow color
    shadowOffset: { width: 5, height: 5 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
  },
  cardDisplay: {
    width: 220,
    height: 120,
    padding: 20,
    backgroundColor: Theme.colors.secondary,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#00000', // Shadow color
    shadowOffset: { width: 5, height: 5 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 2.84, // Shadow radius
  },
  cardNumber: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 0,
    fontFamily: Theme.fonts.medium,
  },
  buttonCard: {
    backgroundColor: Theme.colors.primary,
    borderRadius: 10,
  },
});

export default HomeScreen;
