import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // Replace with the appropriate icon library
import {
    Buttons,
  } from "./Stylesheet";
export const GoBackButton = () => {
    return (
    <View style={Buttons.iconContainerRight}>
        <Icon size={30} name="left" style={Buttons.Icon} />
    </View>
    )
};
