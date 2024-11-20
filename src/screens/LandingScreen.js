import {
  View,
  Text,
  StyleSheet,
  Pressable,
  BackHandler,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  styles,
  Backgroundstyle,
  Primarycolor1,
  Buttons,
  Primarycolor2,
  Primarycolor3,
  main_button,
} from "../styles/Stylesheet";
import { Ionicons, Octicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useLanguage, t } from "../Languages/LanguageHandler";

import { firebaseAurth } from "../utils/Firebase";

import Customize from "../componets/LandingScreen/Customize";
import ReuseSvg from "../componets/svg-components/ReuseSvg";
import CompletePlantSvg from "../componets/svg-components/CompletePlantSvg";
import CompleteHousePhoneText from "../componets/LandingScreen/CompleteHousePhoneText";
import GlobalStyle from "../styles/GlobalStyle";
import BackButton from "../componets/BackButton";
import CompleteTimelineSvg from "../componets/LandingScreen/CompleteTimelineSvg";
import { onAuthStateChanged } from "firebase/auth";
import LanguageDropdown from "../Languages/LanguageDropdown";
const LandingScreen = ({ navigation }) => {
  // for multi language
  const { currentLanguage, setLanguage } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userLogged, setUserLogged] = useState(false);
  const backButton =
    currentSlide === 0 ? null : (
      <BackButton onPress={() => setCurrentSlide(currentSlide - 1)} />
    );

  //data to be used that will render on the screen

  const data = [
    {
      top: t("LandingScreen.Header", currentLanguage),
      image: <ReuseSvg />,
      bottom: t("LandingScreen.Intro", currentLanguage),
    },
    {
      top: t("ProblemComponent.Header", currentLanguage),
      image: <CompletePlantSvg />,
      bottom: t("ProblemComponent.Body", currentLanguage),
    },
    {
      top: t("SolutionComponent.Header", currentLanguage),
      image: <CompleteHousePhoneText />,
      bottom: t("SolutionComponent.Body", currentLanguage),
    },
    {
      top: t("SolutionTimeline.Header", currentLanguage),
      image: <CompleteTimelineSvg />,
      bottom: t("SolutionTimeline.Body", currentLanguage),
    },
  ];

  function nextSlideAndSignUp() {
    if (currentSlide + 2 > data.length) {
      navigation.navigate("SignUp");
    } else {
      setCurrentSlide((previousState) => previousState + 1);
    }
  }

  //Fn to navigate to the Signup Screern
  onAuthStateChanged(firebaseAurth, async (user) => {
    if (user) {
      setUserLogged(true);
    } else {
      setUserLogged(false);
    }
  });
  if (userLogged) {
    navigation.navigate("Homepage");
  }

  //Fn to change to langauge and display correct language

  const LanguageSelector = () => {
    if (currentLanguage == "en") {
      setLanguage("da");
    } else {
      setLanguage("en");
    }
  };

  return (
    <SafeAreaView style={Backgroundstyle.informationScreens}>
      {/* this is the main below that shows on the screen */}
      <View style={GlobalStyle.BodyWrapper}>
        <View style={styling.topBar}>
          {backButton}
          {[1, 2, 3, 4].includes(currentSlide) ? null : <LanguageDropdown />}

        </View>
        {<Customize {...data[currentSlide]} />}

      <Pressable onPress={nextSlideAndSignUp} style={styling.main_button}>
        <Text style={Buttons.main_buttonText}>
          {t("LandingScreen.continue", currentLanguage)}
        </Text>
      </Pressable>
      <View style={styling.tabBarStyle}>
        {data.map((element, index) => (
          <Octicons
            key={index}
            name={`dot${index === currentSlide ? "-fill" : ""}`}
            size={24}
            color={Primarycolor1}
          />
        ))}
      </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
//     <Image source={require('./my-icon.png')} />
const styling = StyleSheet.create({
  tabBarStyle: {
    bottom: 0,
    elevation: 0,
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginLeft : "auto",
    // marginRight :"auto",
    marginTop: 30,
  },
  languageSelector: {
    backgroundColor: Primarycolor3,
    borderColor: Primarycolor1,
    borderWidth: 4,
    padding: 7,
    width: "25%",
    marginLeft: "auto",
  },
  topBar: {
    zIndex:1,
    flexDirection: "row",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    marginBottom: 10,
    marginLeft:-8.5
  },
  main_button:{
    ...Buttons.main_button, width: "88.9%",
  },
  backButton: {
    backgroundColor: "#1c4b3d",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
