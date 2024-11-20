import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {Feather} from "@expo/vector-icons";

import {Primarycolor1, Primarycolor4} from "../styles/Stylesheet";
import { useLanguage, t } from '../Languages/LanguageHandler';

const SearchBox = ({ onChangeText, value, placeholderText }) => {
    const { currentLanguage } = useLanguage();
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={t(placeholderText, currentLanguage)}
                placeholderTextColor={Primarycolor4}
            />
            <Feather 
                style={styles.searchIcon} 
                name="search" 
                size={24} 
                color={Primarycolor4} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    container: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: Primarycolor1,
        borderWidth: 3,
        paddingHorizontal: 10,
    },
});

export default SearchBox;
