import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomInput from "../../componets/atoms/CustomInput 2";
import backButton from "../../componets/BackButton"; // Make sure to import this if used
import BackButton from "../../componets/BackButton"; // Make sure to import this if used
import { useNavigation } from "@react-navigation/native";
import { NavigationActions as navigation } from "react-navigation";
import { getAllBrands } from "../../utils/Repo";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import {
    Primarycolor1,
    Primarycolor2,
    Primarycolor3,
    Primarycolor4,
    styles,
    styles as stylesGlobal
} from "../../styles/Stylesheet";

const BrandDropdown = ({ onBrandSelect, productSelected, data, isVisible, setIsVisible, onSkip,  setIsModelDropdownVisible, shouldOpenBrandDropdown}) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(data || null);
    const [brands, setBrands] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const [filteredBrands, setFilteredBrands] = useState([]);
    useEffect(() => {
        if (shouldOpenBrandDropdown) {
            setIsModalVisible(true);
        }
    }, [shouldOpenBrandDropdown]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const brandsList = await getAllBrands();
                setBrands(brandsList);
                setFilteredBrands(brandsList);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData();
    }, []);

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
        setIsOpen(false);
        if (onBrandSelect) {
            onBrandSelect(brand);
        }
        setIsModelDropdownVisible(true);

    };

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = brands.filter(brand => brand.brandName.toLowerCase().includes(text.toLowerCase()));
        setFilteredBrands(filtered);
    };


    const handleBack = () => {
        setIsModalVisible(false);
    };
    const handleSkip = () => {
        setIsModalVisible(false);
    };

    return (
        <CustomInput optionalMarginBottom={1}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[stylesGlobal.formLabel, { marginLeft: 0, marginTop: 15 }]}>
                    {t("BrandDropdown.selectBrand", currentLanguage)}
                </Text>
                <Text style={[stylesGlobal.optionalText, { marginLeft: 5, marginTop: 5 }]}>
                    ({t("AccountSettingsScreen.Optional", currentLanguage)})
                </Text>
            </View>

            <View style={brandDropdownContainer.container}>

                <TouchableOpacity
                    style={[
                        brandDropdownContainer.dropdownButton,
                        !productSelected && brandDropdownContainer.disabled
                    ]}
                    onPress={() => {
                        if (productSelected) {
                            setIsModalVisible(true);
                        }
                    }}
                    disabled={!productSelected}
                >
                    <Text style={[brandDropdownContainer.dropdownText, !selectedBrand && { color: "#8EA59E" }]}>
                        {selectedBrand?.brandName || (!productSelected ? t("BrandDropdown.placeholder", currentLanguage) : "Brand")}
                    </Text>
                    <AntDesign name={isOpen ? "up" : "down"} size={20} style={styles.menuItem_arrow} />
                </TouchableOpacity>
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide">
                    <View style={brandDropdownContainer.modalContainer}>
                        <View style={brandDropdownContainer.topBar}>
                            <BackButton onPress={handleBack}></BackButton>
                            <View style={brandDropdownContainer.searchContainer}>
                                <Ionicons name="search" size={20} color={Primarycolor4} />
                                <TextInput
                                    style={[brandDropdownContainer.input,{marginLeft:5}]}
                                    placeholderTextColor={Primarycolor4}
                                    onChangeText={handleSearch}
                                    placeholder={t("DropdownScreen.Brand", currentLanguage)}
                                />
                            </View>
                            <TouchableOpacity onPress={handleSkip} style={styles.badgeText}>
                                <Text style={styles.link}>Skip</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={brandDropdownContainer.dropdownList}>
                            {filteredBrands.map(brand => (
                                <TouchableOpacity
                                    key={brand.brandId}
                                    onPress={() => {
                                        handleBrandSelect(brand);
                                        setIsModalVisible(false);
                                    }}
                                    style={brandDropdownContainer.dropdownListItem}>
                                    <Text style={brandDropdownContainer.dropdownText}>{brand.brandName}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        </CustomInput>
    );
};

const brandDropdownContainer = {
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
        marginTop:20,
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

export default BrandDropdown;
