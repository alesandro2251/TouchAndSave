import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  Text,
  Avatar,
  Button,
  Icon,
} from "react-native-paper";
import Theme from "../theme.js";
import { useNavigation } from "@react-navigation/native";
import useAuthenticatedUserData from "./part-components/Authentication.jsx";
import { useFirestoreData } from "./part-components/FirestoreDataFetching.jsx";

const AccountScreen = () => {
  const navigation = useNavigation();

  const defaultProfile =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.87170709.1707868800&semt=ais";

  const { email, loading: authLoading } = useAuthenticatedUserData();
  const { userData, loader: firestoreLoading } = useFirestoreData(email);

  const createdAtTimestamp =
    userData.length > 0 ? userData[0].createdAt.seconds * 1000 : "";

  const createdAtDate = new Date(createdAtTimestamp);

  const formattedCreatedAt = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (authLoading || firestoreLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="small" color={Theme.colors.blue} />
      </View>
    );
  }

  if (!userData.length) {
    return (
      <View style={styles.container}>
        <Text>No data found.</Text>
      </View>
    );
  }

  return (
    <PaperProvider theme={Theme}>
      <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: Theme.colors.background }}>
          <Appbar.Content title="Touch&Save"/>
          <Appbar.Action
            icon="map-marker-star"
            color={Theme.colors.blue}
            onPress={() => navigation.navigate("locations")}
          />
          <Appbar.Action
            icon="arrow-left-circle"
            color={Theme.colors.blue}
            onPress={() => navigation.navigate("home")}
          />
        </Appbar.Header>
        <View style={styles.sectionContainer}>
          <View style={styles.profileContainer}>
            <Avatar.Image
              source={{ uri: userData[0].profile || defaultProfile }}
              size={80}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {`${userData[0].firstName} ${userData[0].lastName}`}
              </Text>
              <Text style={styles.email}>{userData[0].email}</Text>
              <Text style={styles.registrationDate}>
                Member since {formattedCreatedAt}
              </Text>
            </View>
          </View>
          <View style={styles.secondaryProfileContainer}>
            <View style={styles.lineContainer}>
              <Icon source="smart-card" size={25} color={Theme.colors.icons} />
              <Text style={styles.text}>{userData[0].cardNumber}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Icon source="flag" size={25} color={Theme.colors.icons} />
              <Text style={styles.text}>{userData[0].country}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Icon source="city" size={25} color={Theme.colors.icons} />
              <Text style={styles.text}>{userData[0].city}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Icon source="phone-dial" size={25} color={Theme.colors.icons} />
              <Text style={styles.text}>{userData[0].phoneNumber}</Text>
            </View>
          </View>
          <Button
            mode="contained"
            icon="pencil-outline"
            style={styles.button}
            labelStyle={{ color: Theme.colors.white }}
            onPress={() => console.log("Edit Profile")}
          >
            Edit Profile
          </Button>
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
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.background
  },
  sectionContainer: {
    backgroundColor: Theme.colors.white,
    borderRadius: 10,
    margin: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#00000", // Shadow color
    shadowOffset: { width: 7, height: 7 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5.84, // Shadow radius
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userInfo: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.colors.text,
    fontFamily: Theme.fonts.medium,
  },
  email: {
    fontSize: 14,
    color: Theme.colors.text,
    fontFamily: Theme.fonts.regular,
  },
  registrationDate: {
    fontSize: 11,
    color: Theme.colors.placeholder,
    marginTop: 5,
    fontFamily: Theme.fonts.regular,
  },
  secondaryProfileContainer: {
    marginBottom: 20,
    marginTop: 15,
  },
  text: {
    fontSize: 17,
    marginLeft: 10,
    marginBottom: 15,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.black,
  },
  button: {
    alignSelf: "center",
    backgroundColor: Theme.colors.blue,
    fontFamily: Theme.fonts.regular,
  },
  lineContainer: {
    flexDirection: "row",
  },
});

export default AccountScreen;
