import React from 'react';
import { View, Text,} from 'react-native';
import PropTypes from 'prop-types';

import { t, useLanguage } from '../../Languages/LanguageHandler';

import {styles, Backgroundstyle} from "../../styles/Stylesheet";
import {MenuItems} from "../../styles/MenuItems";
import GlobalStyle from '../../styles/GlobalStyle'
import BackButton from '../../componets/BackButton';
import Navigationbar from '../../componets/Navigationbar';

const MY_SETTINGS_SCREEN = {
    AccountSettings: 'AccountSettings',
    Notifications: 'Notifications',
    ChangePassword: 'ChangePassword',
};

const MySettings = ({ navigation }) => {
    const { currentLanguage } = useLanguage(); // Move the hook inside the functional component

    const backButtonPressed = () => navigation.goBack()

    const handlePress = (selectedOption) => {
        if (selectedOption === MY_SETTINGS_SCREEN.AccountSettings) {
            navigation.navigate('AccountSettings');
        } else if (selectedOption === MY_SETTINGS_SCREEN.Notifications) {
            navigation.navigate('Notifications');
        } else if (selectedOption === MY_SETTINGS_SCREEN.ChangePassword) {
            navigation.navigate('ChangePassword');
        }
    };

    return (
        <View style={Backgroundstyle.interactive_screens}>
            <View style={{ alignSelf: "stretch", paddingLeft: 25}}>
                <BackButton onPress={backButtonPressed}/>
            </View>
            <View style={GlobalStyle.BodyWrapper}>
                <Text style={[styles.Header_Primarycolor1, styles.Header]}>{t('MySettingsScreen.Header', currentLanguage)}</Text>
                <MenuItems msg={t('AccountSettingsScreen.Header', currentLanguage)} onPress={() => handlePress(MY_SETTINGS_SCREEN.AccountSettings)} />
                <MenuItems msg={t('NotificationsScreen.Header', currentLanguage)} onPress={() => handlePress(MY_SETTINGS_SCREEN.Notifications)} />
            </View>
            <Navigationbar navigation={navigation} />
        </View>
    );
};

// Add prop validation
MySettings.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default MySettings;
