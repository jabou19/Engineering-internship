import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomInput from "../../componets/atoms/CustomInput";
import BackButton from "../../componets/BackButton";
import { useNavigation } from "@react-navigation/native";
import { NavigationActions as navigation } from "react-navigation";
import {
    Primarycolor1,
    Primarycolor2,
    Primarycolor3,
    Primarycolor4,
    styles,
    styles as stylesGlobal
} from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { getAllModels } from "../../utils/Repo";

const ModelDropdown = ({ onModelSelect, brandSelected, data, isVisible, setIsConditionDropdownVisible, isConditionDropdownVisible, onSkip }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(data || null);
    const [models, setModels] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const [filteredModels, setFilteredModels] = useState([]);
    useEffect(() => {
        setIsModalVisible(isVisible);
    }, [isVisible]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const modelsList = await getAllModels();
                setModels(modelsList);
                setFilteredModels(modelsList);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData();
    }, []);

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setIsOpen(false);
        if (onModelSelect) {
            onModelSelect(model);
        }
        // Set Condition Dropdown visibility to true when a model is selected
        setIsConditionDropdownVisible(true);
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = models.filter(model => model.modelName.toLowerCase().includes(text.toLowerCase()));
        setFilteredModels(filtered);
    };
    const handleSkip = () => {
        setIsModalVisible(false);
        if (onSkip) {
            onSkip();
        }
        if (!isConditionDropdownVisible) {
            setIsConditionDropdownVisible(true);
        }
        if (isConditionDropdownVisible) {
            setIsConditionDropdownVisible(true);
        }
    };
    const handleBack = () => {
        setIsModalVisible(false);
    };

    return (
        <CustomInput optionalMarginBottom>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[stylesGlobal.formLabel, { marginLeft: 0, marginTop: 15 }]}>
                    {t("ModelDropdown.selectModel", currentLanguage)}
                </Text>
                <Text style={[stylesGlobal.optionalText, { marginLeft: 5, marginTop: 5 }]}>
                    ({t("AccountSettingsScreen.Optional", currentLanguage)})
                </Text>
            </View>
            <View style={modelDropdownContainer.container}>
                <TouchableOpacity
                    style={[
                        modelDropdownContainer.dropdownButton,
                        !brandSelected && modelDropdownContainer.disabled
                    ]}
                    onPress={() => {
                        if (brandSelected) {
                            setIsModalVisible(true);
                        }
                    }}
                    disabled={!brandSelected}
                >
                    <Text style={[modelDropdownContainer.dropdownText, !selectedModel && { color: "#8EA59E" }]}>
                        {selectedModel?.modelName || (!brandSelected ? t("ModelDropdown.placeholder", currentLanguage) : "Model")}
                    </Text>
                    <AntDesign name={isOpen ? "up" : "down"} size={20} style={styles.menuItem_arrow} />
                </TouchableOpacity>
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide">
                    <View style={modelDropdownContainer.modalContainer}>
                        <View style={modelDropdownContainer.topBar}>
                            <BackButton onPress={handleBack}></BackButton>
                            <View style={modelDropdownContainer.searchContainer}>
                                <Ionicons name="search" size={20} color={Primarycolor4} />
                                <TextInput
                                    style={[modelDropdownContainer.input,{marginLeft:5}]}
                                    placeholderTextColor={Primarycolor4}
                                    onChangeText={handleSearch}
                                    placeholder={t("DropdownScreen.Model", currentLanguage)}
                                />
                            </View>
                            <TouchableOpacity onPress={handleSkip} style={styles.badgeText}>
                                <Text style={styles.link}>Skip</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={modelDropdownContainer.dropdownList}>
                            {filteredModels.map(model => (
                                <TouchableOpacity
                                    key={model.modelId}
                                    onPress={() => {
                                        handleModelSelect(model);
                                        setIsModalVisible(false);
                                    }}
                                    style={modelDropdownContainer.dropdownListItem}>
                                    <Text style={modelDropdownContainer.dropdownText}>{model.modelName}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        </CustomInput>
    );
};

const modelDropdownContainer = {
    container: {
        flexDirection: "column",
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
        width: "70%",
        paddingLeft: 10,
    },
    input: {
        height: 40,
        width: "85%",
        marginLeft: 10,
    },
    disabled: {
        backgroundColor: "#f0f0f0",
    },
};

export default ModelDropdown;
