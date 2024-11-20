import React, { useState } from "react";
import HousePhoneText from "./HousePhoneText";
import { View, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Primarycolor1 } from "../../styles/Stylesheet";

import {t, useLanguage} from "../../Languages/LanguageHandler";
const CompleteHousePhoneText = () =>{
    const {currentLanguage} = useLanguage();
    const [showFirstPhone,setShowFirstPhone] = useState(true);
    setTimeout(()=>{setShowFirstPhone(false)})// you can add the time of showing the pone on the screen.
    // this is the main components that gets to be shown on the screen
    // it has 2 components of HousePhoneText and uses state to tell what child should show the phone svg
    return( <View style={styling.container}>
        <HousePhoneText showPhone={showFirstPhone} textUnderHouse={t("SolutionComponent.Bottom.firstHalf",currentLanguage)}/>
        <Octicons name="arrow-right" size={50} style={{color: Primarycolor1}}/>
        <HousePhoneText showPhone={!showFirstPhone} textUnderHouse={t("SolutionComponent.Bottom.secondHalf",currentLanguage)}/>

    </View>
  );
};
const styling = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "center",
  },
});
export default CompleteHousePhoneText;
