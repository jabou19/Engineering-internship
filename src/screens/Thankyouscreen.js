import {t, useLanguage} from "../Languages/LanguageHandler";
import StatusBarComponent from "../componets/atoms/StatusBarComponent";
import ScrollViewComponent from "../componets/atoms/ScrollViewComponent";
import {Animated, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import React from "react";
import Headertitle1 from "../componets/atoms/HeaderTitle1";
import {Backgroundstyle, Primarycolor1, Primarycolor3} from "../styles/Stylesheet";


const ThankYouscreen = ({navigation}) =>{

    const { currentLanguage } = useLanguage();
    return (
        <View style={[Backgroundstyle.message_Screens]}>
        <StatusBarComponent >
            <ScrollViewComponent >
                <View >
                    <Headertitle1
                        onRightIconPress={() => {
                            navigation.goBack();
                        }}
                        rightIcon="close-outline"
                    />
                </View >
                <View style={{ flex: 1,justifyContent:'center',marginTop:250,marginBottom:250 }}>
                    <Text style={{ color: Primarycolor3, fontSize: 20, margin: 20, textAlign: 'center' }}>
                        {t('thankYouScreen.header',currentLanguage)}
                    </Text>
                </View>
            </ScrollViewComponent>
        </StatusBarComponent>
          </View>
    );

}
export default ThankYouscreen;

