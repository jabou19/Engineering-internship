import { Text, View, StyleSheet, TouchableOpacity} from "react-native";

import {Buttons, HeaderText} from "../../styles/Stylesheet";
import {t, useLanguage} from "../../Languages/LanguageHandler";
import React from "react";

// eslint-disable-next-line react/prop-types
const  DeleteAccount=({navigation})=>{
    const {currentLanguage}=useLanguage();
    const deleteacount =()=>{
        // What should happen, when pressing this is defined under 'backend
    };
    const BackToAccountSettings =()=>{
        // eslint-disable-next-line react/prop-types
        navigation.navigate('AccountSettings');
    };

        return(

    // eslint-disable-next-line react/react-in-jsx-scope
    <View style={styles1.container}>

            {/* Headline */}
            <Text style={[HeaderText.Header]}>{t('DeleteAccount.Header',currentLanguage)} </Text>



        <View style={styles1.buttonContainer}>
            <View >
                <TouchableOpacity style={[Buttons.main_button]}
                    onPress={deleteacount}
                >
                    <Text  style={[Buttons.main_buttonText]}> {t('DeleteAccount.MainButton',currentLanguage)}</Text>
                </TouchableOpacity>
            </View>

                <TouchableOpacity style={[Buttons.secondary_button,{marginTop:30}]}
                   onPress={BackToAccountSettings}
                    >

                    <Text   style={[Buttons.secondary_buttonText]}>   {t('DeleteAccount.SecondaryButton',currentLanguage)}</Text>
                </TouchableOpacity>
            </View>
    </View>
);

}
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
    },

    buttonContainer: {
        flexDirection: 'column',
        marginLeft:30,
        marginTop:70,
        justifyContent: 'center',
        width: '80%',
    },
});
  export default DeleteAccount;