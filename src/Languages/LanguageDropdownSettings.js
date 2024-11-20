import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {Primarycolor3, Primarycolor1, dropdownStyles} from "../styles/Stylesheet";
import { useLanguage, t } from "../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const LanguageDropdownSettings = () => {
    const { currentLanguage, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

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
                    <ScrollView style={dropdownStyles.dropdownList}>
                        {languageOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                onPress={() => handleLanguageSelect(option.value)}
                                style={dropdownStyles.dropdownListItem}
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
        width: "80%",
        position: "relative",
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
        position: "absolute", // Add this line
        top: "100%", // Add this line to position the dropdown below the button
        left: 0, // Add this line to align the dropdown with the button
        zIndex: 1, // Add this line to ensure the dropdown appears above other content
        width: "100%", // Add this line to make the dropdown full-width
        maxHeight: 150, // Set a max height for the dropdown if needed
        overflowY: "auto", // Add scrollbars if the content exceeds the max height
        alignContent:"center",
    },
    dropdownListItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Primarycolor1,
        backgroundColor: Primarycolor3,
    },
};

export default LanguageDropdownSettings;
