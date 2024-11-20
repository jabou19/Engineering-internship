import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {Primarycolor1} from "../../../styles/Stylesheet";

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.9;


const PrimaryColorButton = ({ onPress, titleText }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{titleText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Primarycolor1,
        width: buttonWidth,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
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
        color: 'white',
        fontSize: 20,
    },
});

export default PrimaryColorButton;
