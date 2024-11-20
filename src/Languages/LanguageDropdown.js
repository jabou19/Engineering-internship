import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Primarycolor3, Primarycolor1 } from "../styles/Stylesheet";
import { useLanguage, t } from "../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";


const LanguageDropdown = () => {
    const { currentLanguage, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
const navigation=useNavigation();
    const languageOptions = [
        { label: "English", value: "en" },
        { label: "Danish", value: "da" },
        // Add more language options as needed
    ];

    const handleLanguageSelect = (language) => {
        setLanguage(language);
        setIsOpen(false);
    };

    return (
        <View style={styles.parentContainer}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <FontAwesome name="globe" size={24} color={Primarycolor1} />
                    <Text style={styles.dropdownText}>
                        {languageOptions.find((option) => option.value === currentLanguage)
                            ?.label || "Select Language"}
                    </Text>
                    <AntDesign name={isOpen ? "up" : "down"} size={20} />
                </TouchableOpacity>

                {isOpen && (
                    <ScrollView style={styles.dropdownList}>
                        {languageOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                onPress={() => handleLanguageSelect(option.value)}
                                style={styles.dropdownListItem}
                            >
                                <Text style={styles.dropdownText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
    );
};

const styles = {
    parentContainer: {
        width: "100%",
        position: "relative",
        zIndex: 1,
    },
    container: {
        flexDirection: "column",
        position: "relative",
    },
    dropdownText: {
        fontFamily: "space-grotesk",
        fontSize: 16,
        marginRight: "50%",
    },
    dropdownButton: {
        borderWidth: 3,
        borderColor: Primarycolor1,
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
    },
    dropdownList: {
        borderWidth: 3,
        borderColor: Primarycolor1,
        position: "absolute",
        top: "100%", // Position the dropdown below the button
        left: 0,
        zIndex: 2, // Set a higher z-index to make the dropdown appear above other content
        width: "100%",
        maxHeight: 150,
        overflowY: "auto",
        opacity: 1, // Remove opacity for a fully visible dropdown
    },
    dropdownListItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Primarycolor1,
        backgroundColor: Primarycolor3,
    },
};

export default LanguageDropdown;
