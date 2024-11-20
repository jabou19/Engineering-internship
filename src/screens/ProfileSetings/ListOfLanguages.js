

import React from 'react';
import {Pressable, View,Text} from "react-native";
import {dropdownStyles, styles} from "../../styles/Stylesheet";
import {t, useLanguage} from "../../Languages/LanguageHandler";
import {AntDesign} from "@expo/vector-icons";
// ... other imports

const ListLanguages = () => {
    const { currentLanguage, setLanguage } = useLanguage();
    const LanguageSelector = () => {
        if (currentLanguage === "en") {
            setLanguage("da");
        } else {
            setLanguage("en");
        }
    };


    return (
        <View >
            <View >
                <Pressable onPress={LanguageSelector} style={[styles.menuItem,{marginBottom: 0}]}>
                    <Text style={[dropdownStyles.dropdownText]}>
                        {t("LandingScreen.LanguageSelector", currentLanguage)}
                    </Text>
                    <View style={styles.Icon_container}>
                        <AntDesign name="down" size={30} style={styles.menuItem_arrow} />
                    </View>

                </Pressable>
            </View>
        </View>
    );
};


export default ListLanguages;
