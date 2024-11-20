import GlobalStyle from "../../../styles/GlobalStyle";
import {Pressable, Text, TouchableOpacity, View,} from "react-native";
import {Backgroundstyle, Buttons, Primarycolor1, styles} from "../../../styles/Stylesheet";
import React from "react";
import {BoxLink} from "../../../styles/BoxLink";
import {AntDesign} from "@expo/vector-icons";
import {msg} from "@babel/core/lib/config/validation/option-assertions";
import { t, useLanguage} from "../../../Languages/LanguageHandler";
import {useNavigation} from "@react-navigation/native";

export const YourVisitedUptainer = () => {
    const navigation = useNavigation();
    const { currentLanguage } = useLanguage();
    const location = "COOP 365";
    const address = "/Norrebrogade 70, Horsens";
    return(
        <View style={GlobalStyle}>
            <View>
                <View>
                    <TouchableOpacity >
                        <View style={styles.boxlink}>
                            <View style={GlobalStyle.BodyWrapper}>
                                <Text style={styles.menuItem_text}>{location} </Text>
                                <Text style={[styles.menuItem_text,{ fontFamily: "space-grotesk",fontSize: 15}]}>{address} </Text>
                            </View>
                            <View style={styles.Icon_container}>
                                <AntDesign name="right" size={30} style={styles.menuItem_arrow} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}
export default YourVisitedUptainer
