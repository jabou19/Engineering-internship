
import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import {t, useLanguage} from "../../Languages/LanguageHandler";
import {styles} from "../../styles/Stylesheet";




const Notifications = () => {
    const { currentLanguage } = useLanguage();
    return (
        <View>
            <Text style={[styles.Header]}>{t('NotificationsScreen.Header', currentLanguage)}</Text>
        </View>
    );
};

// Add prop validation
Notifications.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Notifications;
