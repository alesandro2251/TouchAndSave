import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Icon } from "react-native-paper";
import Theme from "../../theme";

const SuccessAlert = ({ visible }) => {
  if (!visible) {
    return null; // If visible prop is false, don't render anything
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success!</Text>
      <Icon size={15} source="reload" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Align icon and text horizontally
    backgroundColor: "#9ADE7B",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    marginBottom: 10,
  },
  text: {
    color: Theme.colors.black,
    fontFamily: Theme.fonts.medium,
    marginRight: 5, // Add margin between icon and text
  },
  icon: {
    marginLeft: 5, // Add margin to the right of the icon
  },
});

export default SuccessAlert;
