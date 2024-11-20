import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ErrorBanner = ({ message }) => {
return (
<View style={styles.errorBanner}>
<Text style={styles.errorText}>{message}</Text>
</View>
);
};

const styles = StyleSheet.create({
errorBanner: {
    backgroundColor: "#AA0000",
    padding: 10,
    alignItems: "center",
    width: "100%",
    marginTop:0
},
errorText: {
    color: "#FFFFFF",
},
});


export default ErrorBanner;