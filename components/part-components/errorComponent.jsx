import React from "react";
import { View, StyleSheet } from "react-native";
import { Text} from "react-native-paper";
import { Icon } from "react-native-paper";
import Theme from "../../theme";

const ErrorAlert = ({ visible, text}) => {
  if (!visible) {
    return null; // If visible prop is false, don't render anything
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Icon size={15} source='alert-circle-outline' style={styles.icon}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Align icon and text horizontally
    backgroundColor: "#FF8F8F",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: '65%',
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

export default ErrorAlert;
