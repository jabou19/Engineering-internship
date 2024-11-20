import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import {Primarycolor1} from "../../../styles/Stylesheet";

const BackButton = ({ navigation }) => {
    return (
        <TouchableOpacity style={[styles.container]} onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={20} color="white" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Primarycolor1,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BackButton;
