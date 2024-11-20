import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import {
    Backgroundstyle,
    Primarycolor1,
    Primarycolor2,
    Primarycolor3, Primarycolor4,
    styles,
    styles as stylesGlobal
} from '../../styles/Stylesheet';
import { useLanguage, t } from '../../Languages/LanguageHandler';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { getAllCategories } from '../../utils/Repo';
import backButton from "../../componets/BackButton";
import BackButton from "../../componets/BackButton";
import { NavigationActions as navigation } from "react-navigation";
import { useNavigation } from "@react-navigation/native";

const CategoryDropdown = ({ onCategorySelect, data, setIsProductDropdownVisible, isProductDropdownVisible , onSkip, isVisible,  }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(data || null);
    const [isValidationError, setIsValidationError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesList = await getAllCategories();
                setCategories(categoriesList);
                setFilteredCategories(categoriesList);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData();
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsOpen(false);
        setIsValidationError(false);
        if (onCategorySelect) {
            onCategorySelect(category);
        }
        if (onSkip) {
            onSkip();
        }
    };


    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = categories.filter(category => category.categoryName.toLowerCase().includes(text.toLowerCase()));
        setFilteredCategories(filtered);
    };


    const handleBack = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={categoryDropdownContainer.container}>
            <Text style={[stylesGlobal.formLabel, { marginLeft: 0 }]}>
                {t('CategoryDropdown.selectCategory', currentLanguage)}
            </Text>
            <TouchableOpacity
                style={categoryDropdownContainer.dropdownButton}
                onPress={() => {
                    setIsModalVisible(true);
                }}>
                <Text style={[categoryDropdownContainer.dropdownText, !selectedCategory && { color: '#8EA59E' }]}>
                    {selectedCategory ? selectedCategory.categoryName : t('CategoryDropdown.placeholder', currentLanguage)}
                </Text>
                <AntDesign name={isOpen ? 'up' : 'down'} size={20} style={styles.menuItem_arrow} />
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={categoryDropdownContainer.modalContainer}>
                    <View style={categoryDropdownContainer.topBar}>
                        <BackButton onPress={handleBack}></BackButton>
                        <View style={categoryDropdownContainer.searchContainer}>
                            <Ionicons name="search" size={20} color={Primarycolor4} />
                            <TextInput
                                style={[categoryDropdownContainer.input,{marginLeft:5}]}
                                placeholderTextColor={Primarycolor4}
                                onChangeText={handleSearch}
                                placeholder={t("DropdownScreen.Category", currentLanguage)}
                            />
                        </View>
                    </View>
                    <ScrollView style={categoryDropdownContainer.dropdownList}>
                        {filteredCategories.map((category) => (
                            <TouchableOpacity
                                key={category.categoryId}
                                onPress={() => {
                                    handleCategorySelect(category);
                                    setIsModalVisible(false);
                                }}
                                style={categoryDropdownContainer.dropdownListItem}>
                                <Text style={categoryDropdownContainer.dropdownText}>{category.categoryName}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const categoryDropdownContainer = {
    container: {
        flexDirection: 'column',
    },
    validationErrorText: {
        color: 'red',
    },
    dropdownText: {
        fontFamily: 'space-grotesk',
        fontSize: 16,
        marginRight: 5,
    },
    dropdownButton: {
        borderWidth: 3,
        borderColor: Primarycolor1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        backgroundColor: 'white',
    flex:1,
    },


    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop:20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        width: '80%',
        paddingLeft: 10,
    },

};

export default CategoryDropdown;
