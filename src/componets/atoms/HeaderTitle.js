import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Primarycolor1 } from "../../styles/Stylesheet";

const HeaderTitle = ({
  onLeftIconPress,
  onRightIconPress,
  headerTitle,
  leftIcon,
  rightIcon,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        // paddingTop: 40,
        marginLeft: 20,
        marginBottom: 20,
        alignItems: "center",
        alignContent: "center",
      }}
    >
      {leftIcon && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onLeftIconPress}
          style={{
            backgroundColor: Primarycolor1,
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name={leftIcon} size={25} color="white" />
        </TouchableOpacity>
      )}

      <Text style={{ color: Primarycolor1, fontWeight: "700", fontSize: 16 }}>
        {headerTitle}
      </Text>
      {rightIcon && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            marginRight: 10,
            marginLeft: 30,
            backgroundColor: Primarycolor1,
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={onRightIconPress}
        >
          <Ionicons name={rightIcon} size={30} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({});
