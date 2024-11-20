import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

// This component creates a padding on each screen, thereby allowing the statusBar to be visible
const StatusBarComponent = ({ children }) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};

export default StatusBarComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
