import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Primarycolor1, Primarycolor3, styles, styles as stylesGlobal } from "../../styles/Stylesheet";
import backButton from "../../componets/BackButton"; // Make sure to import this if used
import BackButton from "../../componets/BackButton"; // Make sure to import this if used
import { useNavigation } from "@react-navigation/native";
import { NavigationActions as navigation } from "react-navigation";
import {t,useLanguage} from "../../Languages/LanguageHandler";
import {items} from "../../utils/SeedData";

const ConditionDropdown = ({ onConditionSelect, data, isVisible }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState(data);
    const [isValidationError, setIsValidationError] = useState(false);
    const [conditions, setConditions] = useState(["As new", "Good but used", "Worn but working", "Smaller defects", "Broken"]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const [filteredConditions, setFilteredConditions] = useState(conditions);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch conditions data here, if available
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        setIsModalVisible(isVisible);
    }, [isVisible]);

    const handleConditionSelect = (condition) => {
        setSelectedCondition(condition);
        setIsOpen(false);
        setIsValidationError(false);
        if (onConditionSelect) {
            onConditionSelect(condition);
        }
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = conditions.filter(condition => condition.toLowerCase().includes(text.toLowerCase()));
        setFilteredConditions(filtered);
    };

    const handleBack = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={conditionDropdownContainer.container}>
            <Text style={[stylesGlobal.formLabel, { marginLeft: 0, marginTop: 15 }]}>
                {t("ConditionDropdown.selectCondition", currentLanguage)}
            </Text>
            <TouchableOpacity
                style={[
                    conditionDropdownContainer.dropdownButton,
                ]}
                onPress={() => {
                    setIsModalVisible(true);
                }}
            >
                <Text style={[conditionDropdownContainer.dropdownText, !selectedCondition && { color: "#8EA59E" }]}>
                    {selectedCondition || t("ConditionDropdown.placeholder", currentLanguage)}
                </Text>
                <AntDesign name={isOpen ? "up" : "down"} size={20} style={styles.menuItem_arrow} />
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide">
                <View style={conditionDropdownContainer.modalContainer}>
                    <View style={conditionDropdownContainer.topBar}>
                        <BackButton onPress={handleBack}></BackButton>
                        <View style={conditionDropdownContainer.searchContainer}>
                            <Text style={[styles.paragraph_text, { fontWeight: "bold" }]}>
                                {t("DropdownScreen.Condition", currentLanguage)}
                            </Text>
                        </View>
                    </View>
                    <ScrollView style={conditionDropdownContainer.dropdownList}>
                        {filteredConditions.map(condition => (
                            <TouchableOpacity
                                key={condition}
                                onPress={() => {
                                    handleConditionSelect(condition);
                                    setIsModalVisible(false);
                                }}
                                style={conditionDropdownContainer.dropdownListItem}>
                                <Text style={conditionDropdownContainer.dropdownText}>{condition}</Text>
                            </TouchableOpacity>
                        ))}
                        <Text style={[styles.article_text, { textAlign: "center", marginTop:20 }]}>
                            {t("DropdownScreen.Text", currentLanguage)}
                        </Text>

                    </ScrollView>
                </View>
            </Modal>

            {isValidationError && !selectedCondition && (
                <Text style={conditionDropdownContainer.validationErrorText}>Validation error message here</Text>
            )}
        </View>
    );
};

const conditionDropdownContainer = {
    container: {
        flexDirection: "column",
    },
    validationErrorText: {
        color: "red",
    },
    dropdownText: {
        fontFamily: "space-grotesk",
        fontSize: 16,
        marginRight: 5,
    },
    dropdownButton: {
        borderWidth: 3,
        borderColor: Primarycolor1,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dropdownList: {
        borderTopWidth: 1,
        borderTopColor: Primarycolor1,
    },
    dropdownListItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Primarycolor1,
        backgroundColor: Primarycolor3,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "white",
        margin: 0, // Reset margin to fill entire screen
        justifyContent: "flex-start",

    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop:20
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 1,
        width: "80%",
        paddingLeft: 10,
    },
    input: {
        height: 40,
        width: "85%",
        marginLeft: 10,
    },
};

export default ConditionDropdown;
