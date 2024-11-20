import React from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles} from "./Stylesheet";

export const MenuItems = ({ msg, onPress, badge }) => {
  return (
      <View>
        <Pressable onPress={onPress}>
          <View style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItem_text}>{msg}</Text>
            </View>
            <View>
              {badge && badge > 0 && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{badge}</Text>
                  </View>
              )}
            </View>
            <View style={styles.Icon_container}>
              <AntDesign name="right" size={30} style={styles.menuItem_arrow} />
            </View>
          </View>
      </Pressable>
    </View>
  );
};
export default MenuItems;
