import React from "react";
import { TouchableOpacity,StyleSheet } from "react-native";
import {Octicons} from "@expo/vector-icons";
const BackButton = ({onPress}) =>{
    return <TouchableOpacity
    onPress={onPress}
    style={styles.backButton}
  >
    <Octicons name="chevron-left" size={20} style={{ color: "white" }} />
  </TouchableOpacity>
}
const styles = StyleSheet.create({
    backButton: {
        backgroundColor: "#1c4b3d",
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
      }
});
export default BackButton;