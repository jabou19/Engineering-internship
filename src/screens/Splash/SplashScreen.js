import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Image } from "react-native";
import { Primarycolor1 } from "../../styles/Stylesheet";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.navigate("LoadingScreen"), 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Image
          resizeMode="center"
          source={require("../../../assets/images/updropp.png")}
          style={{
            // width: windowWidth / 1.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Primarycolor1,
    justifyContent: "center",
    alignContent: "center",
    // alignSelf: "center",
    alignItems: "center",
  },
});
