import GlobalStyle from "../../../styles/GlobalStyle";
import {Text, View,} from "react-native";
import {Backgroundstyle, Buttons, Primarycolor1, styles} from "../../../styles/Stylesheet";
import React from "react";
import { t, useLanguage} from "../../../Languages/LanguageHandler";

export const StatsInfo = ({navigation,route}) => {
    const { currentLanguage } = useLanguage();


    return(
        <View style={[GlobalStyle, {alignContent: "center", marginTop: 15}]}>
            <Text style={[styles.paragraph_text,{fontSize: 19}]}>KU Lighthouse</Text>
        </View>
    )
}
export default StatsInfo
