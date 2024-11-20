import { SafeAreaView, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Buttons,
  Primarycolor1,
  Primarycolor2,
  Primarycolor3,
} from "../../styles/Stylesheet";
import Navigationbar from "../../componets/Navigationbar";
import { Pressable } from "react-native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import { Animated } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProductSaved = ({ navigation }) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const opacityAnim = useRef(new Animated.Value(0)).current; // opacity animation

  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Opacity animation for the checkmark
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // timer for navigation
    setTimeout(() => {
      setShowButtons(true);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={productSavedStyles.container}>
      <View style={productSavedStyles.savedContainer}>
        <View style={productSavedStyles.animatedView}>
          <Animated.Text
            style={[productSavedStyles.animatedText, { opacity: opacityAnim }]}
          >
            ✓
          </Animated.Text>
        </View>

        <Text style={productSavedStyles.addedText}>
          {t("UpdroppForm.draftSavedtext", currentLanguage)}
        </Text>
        {showButtons && (
          <View>
            <Pressable
              style={[
                Buttons.secondary_button,
                { borderWidth: 2, width: "100%", marginBottom: 20 },
              ]}
              onPress={() => {
                navigation.navigate("Map");
              }}
            >
              <Text style={Buttons.secondary_buttonText}>
                {t("UpdroppForm.viewUptainers", currentLanguage)}
              </Text>
            </Pressable>
            <Pressable
              style={[
                Buttons.secondary_button,
                { borderWidth: 2, width: "100%" },
              ]}
              onPress={() => {
                navigation.navigate("Add");
              }}
            >
              <Text style={Buttons.secondary_buttonText}>
                {t("UpdroppForm.addDraft", currentLanguage)}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
      <Navigationbar navigation={navigation} />
    </SafeAreaView>
  );
};

export default ProductSaved;

const productSavedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Primarycolor1,
  },
  savedContainer: {
    justifyContent: "center",
    alignContent: "center",
    // alignSelf: "center",
    padding: 20,
    paddingTop: windowHeight / 4,
  },
  addedText: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 30,
    color: Primarycolor2,
    fontSize: 20,
    fontWeight: "700",
  },
  checkmark: {
    borderRadius: windowWidth / 1.2,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    height: windowHeight / 9,
    width: windowWidth / 4,
    backgroundColor: "red",
  },
  animatedView: {
    height: windowHeight / 9,
    width: windowWidth / 4,
    borderRadius: windowWidth,
    backgroundColor: "transparent",
    borderColor: Primarycolor3,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    // justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  animatedText: {
    fontSize: 140,
    color: Primarycolor3,
    paddingBottom: 10,
    zIndex: 999,
    position: "absolute",
    width: windowWidth,
    left: 0,
  },
});
