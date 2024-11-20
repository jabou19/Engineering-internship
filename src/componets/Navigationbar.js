//imports
import { StyleSheet, View, Pressable, Text } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Primarycolor1, Primarycolor2 } from "../styles/Stylesheet";
import { BadgeContext } from "../screens/form/BadgeContext";

//Page_names
const PAGE_NAMES = {
  HOME: "home",
  MAP: "map",
  ADD: "add",
  STATS: "stats",
  PROFILE: "profile",
};

//Selected page
let selected = PAGE_NAMES.HOME;

const Navigationbar = ({ navigation }) => {
  const { badgeCount } = React.useContext(BadgeContext);
  //handles when clicked on icons
  const handlePress = (iconName) => {
    if (iconName == PAGE_NAMES.HOME) {
      selected = PAGE_NAMES.HOME;
      navigation.navigate("Homepage");
    } else if (iconName == PAGE_NAMES.MAP) {
      selected = PAGE_NAMES.MAP;
      navigation.navigate("Map");
    } else if (iconName == PAGE_NAMES.ADD) {
      selected = PAGE_NAMES.ADD;
      navigation.push("Add");
    } else if (iconName == PAGE_NAMES.STATS) {
      selected = PAGE_NAMES.STATS;
      navigation.navigate("Stats");
    } else if (iconName == PAGE_NAMES.PROFILE) {
      selected = PAGE_NAMES.PROFILE;
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.tabBarStyle}>
      <Pressable onPress={() => handlePress(PAGE_NAMES.HOME)}>
        {
          //check which icon will load
          selected == PAGE_NAMES.HOME ? (
            <Ionicons name="ios-home-sharp" size={24} color={Primarycolor1} />
          ) : (
            <Ionicons name="ios-home-outline" size={24} color={Primarycolor1} />
          )
        }
      </Pressable>

      <Pressable onPress={() => handlePress(PAGE_NAMES.MAP)}>
        {
          //check which icon will load
          selected == PAGE_NAMES.MAP ? (
            <Fontisto name="map-marker-alt" size={24} color={Primarycolor1} />
          ) : (
            <Feather name="map-pin" size={24} color={Primarycolor1} />
          )
        }
      </Pressable>

      <Pressable onPress={() => handlePress(PAGE_NAMES.ADD)}>
        {
          //check which icon will load
          selected == PAGE_NAMES.ADD ? (
            <AntDesign name="pluscircle" size={24} color={Primarycolor1} />
          ) : (
            <AntDesign name="pluscircleo" size={24} color={Primarycolor1} />
          )
        }
      </Pressable>

      <Pressable onPress={() => handlePress(PAGE_NAMES.STATS)}>
        {
          //check which icon will load
          selected == PAGE_NAMES.STATS ? (
            <Ionicons
              name="stats-chart-sharp"
              size={22}
              color={Primarycolor1}
            />
          ) : (
            <Ionicons
              name="stats-chart-outline"
              size={24}
              color={Primarycolor1}
            />
          )
        }
      </Pressable>

      <Pressable onPress={() => handlePress(PAGE_NAMES.PROFILE)}>
        <View style={{ position: "relative" }}>
          {
            //check which icon will load
            selected == PAGE_NAMES.PROFILE ? (
              <Ionicons
                name="person-circle-sharp"
                size={24}
                color={Primarycolor1}
              />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={24}
                color={Primarycolor1}
              />
            )
          }
          {badgeCount > 0 && <Badge count={badgeCount} />}
        </View>
      </Pressable>
    </View>
  );
};

// The notification badge for drafts created that would later be displayed under profile-> my drafts
const Badge = ({ count }) => {
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
};

export default Navigationbar;
// styles for the tool bar
const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: -5,
    left: -5,
    elevation: 0,
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: Primarycolor2,
    borderWidth: 2,
  },
  badgeContainer: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: Primarycolor1,
    borderRadius: 0,
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
