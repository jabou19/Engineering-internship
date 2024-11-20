import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Primarycolor1 } from "../styles/Stylesheet";
import { t, useLanguage } from "../Languages/LanguageHandler";

const ProductAlert = () => {
  const { currentLanguage } = useLanguage(); // Move the hook inside the functional component

  return (
    <View style={styles.alertContainer}>
      <Text style={styles.alertText}>
        {t("ProductUpdroppedAlert.productUpdropped", currentLanguage)}
      </Text>
    </View>
  );
};

export default ProductAlert;

const styles = StyleSheet.create({
  alertContainer: {
    position: "absolute",
    bottom: 60,
    right: 0,
    left: 0,
    elevation: 0,
    height: 40,
    backgroundColor: Primarycolor1,
    // justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  alertText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});
