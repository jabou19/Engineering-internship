import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import {Primarycolor1} from "../../../styles/Stylesheet";

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.9;

const WhiteColorButton = ({ onPress, titleText }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{titleText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        width: buttonWidth,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Primarycolor1,
        borderWidth: 1,
        // shadow for ios
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // shadow for Android
        elevation: 5,
    },
    buttonText: {
        fontFamily: 'space-grotesk',
        color: Primarycolor1,
        fontSize: 20,
    },
});

export default WhiteColorButton;
