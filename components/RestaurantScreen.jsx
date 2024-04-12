import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  Card,
  Text,
  Button,
  Icon,
  ActivityIndicator,
} from "react-native-paper";
import Theme from "../theme.js";
import { useNavigation } from "@react-navigation/native";

const RestaurantScreen = ({ route }) => {
  const navigation = useNavigation();
  const location = route.params.subcollections;
  const locationName = route.params.title;
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  console.log(location);

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
        <Appbar.Header style={{ backgroundColor: Theme.colors.background }}>
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

        <Text style={styles.title}>{locationName}'s Places</Text>
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {location.map((restaurant, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => console.log("Restaurant selected:", restaurant.title)}
            >
              <Card style={styles.card}>
                <Card.Cover
                  source={{ uri: restaurant.image }}
                  style={styles.cardImage}
                />
                <View style={styles.cardTitleChange}>
                  <Icon
                    source="silverware-fork-knife"
                    size={20}
                    style={styles.icon}
                    color={Theme.colors.blue}
                  />
                  <Text style={styles.cardTitle}>{restaurant.title}</Text>
                </View>
                <Card.Content>
                  <Text style={styles.textRestaurant}>
                    {restaurant.description}{" "}
                    {/* Note the correct spelling of description */}
                  </Text>
                  <View style={styles.discountContainer}>
                    <Icon source="sale" size={20} style={styles.icon}        color={Theme.colors.blue}/>
                    <Text style={styles.discount}>{restaurant.discount}%</Text>
                  </View>
                  <Button
                    mode="contained"
                    icon="map-marker-multiple-outline"
                    style={{backgroundColor: Theme.colors.blue,}}
                    onPress={() => Linking.openURL(restaurant.location)}
                  >
                    View Location
                  </Button>
                </Card.Content>
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
    backgroundColor: Theme.colors.background
  },
  title: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.black,
    fontFamily: Theme.fonts.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.background,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: Theme.colors.white,
  },
  cardImage: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    margin: 10,
    fontSize: 20,
    fontFamily: Theme.fonts.regular,
  },
  textRestaurant: {
    marginBottom: 10,
    fontFamily: Theme.fonts.regular,
  },
  cardTitleChange: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  icon: {
    marginRight: 8,
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  discount: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default RestaurantScreen;
