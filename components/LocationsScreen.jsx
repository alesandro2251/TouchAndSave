import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  TextInput,
  Card,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import Theme from "../theme.js";
import { useNavigation } from "@react-navigation/native";
import { fetchLocationsFromFirestore } from "./part-components/FirestoreDataFetching.jsx";

const LocationScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const { locationData, loader: firestoreLoading } = fetchLocationsFromFirestore();

  const handleLocationPress = (location) => {
    navigation.navigate("restaurant", { subcollections: location.subcollections, title: location.title });
  };


  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={Theme.colors.blue} />
      </View>
    );
  }

  return (
    <PaperProvider theme={Theme}>
      <View style={styles.container}>
        <Appbar.Header style={{backgroundColor: '#F6F4EB'}}>
          <Appbar.Content title="Touch&Save" />
          <Appbar.Action
            icon="arrow-left-circle"
            color={Theme.colors.blue}
            onPress={() => navigation.navigate("home")}
          />
          <Appbar.Action
            icon="account"
            color={Theme.colors.blue}
            onPress={() => navigation.navigate("account")}
          />
        </Appbar.Header>

        <Text style={styles.title}>Locations with our discounts</Text>

        <TextInput label="Search a destination" style={styles.searchBar} />

        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {locationData.map((location) => (
            <TouchableOpacity
              key={location.id}
              onPress={() => handleLocationPress(location)}
            >
              <Card style={styles.card}>
                <Card.Cover
                  source={{ uri: location.image }}
                  style={styles.cardImage}
                />
                <Card.Title title={location.title} style={styles.cardTitle} />
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  title: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.black,
    fontFamily: Theme.fonts.medium 
  },
  searchBar: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: Theme.colors.background,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#00000', // Shadow color
    shadowOffset: { width: 5, height: 5 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
  },
  cardImage: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    color: Theme.colors.black,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.background,
  }
});

export default LocationScreen;
