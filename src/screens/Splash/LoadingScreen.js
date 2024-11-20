import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Primarycolor1, Primarycolor2 } from "../../styles/Stylesheet";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = () => {
  const navigation = useNavigation();

  
  //Conditionally navigate to Landing or Sign in screen based on if it is the first app start
  // Async storage uses local storage to count if this is the first ap start so landing screen only appears once
  useEffect(() => {
    async function checkFirstTime() {
      try {
        const isFirstTime = await AsyncStorage.getItem('isFirstTime9');
        console.log(isFirstTime);
        if (isFirstTime === null) {
          // It's the first time, show LandingScreen
          // Set isFirstTime to 'true' in AsyncStorage
          await AsyncStorage.setItem('isFirstTime9', 'true');
          setTimeout(() => {
            navigation.navigate("Landingscreen");
          }, 2000);
        } else {
          // Not the first time, navigate to Sign in
          setTimeout(() => {
            navigation.navigate("Sign in");
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    checkFirstTime();
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
        <ActivityIndicator size="large" color={Primarycolor1} />
      </View>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Primarycolor2,
    justifyContent: "center",
    alignContent: "center",
    // alignSelf: "center",
    alignItems: "center",
  },
});
