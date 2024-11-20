import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { 
    styles,
    Backgroundstyle,
    Buttons,
    HeaderText 
} from "../styles/Stylesheet";
import { t, useLanguage } from "../Languages/LanguageHandler";
import BackButton from "../componets/BackButton";
import GlobalStyle from "../styles/GlobalStyle";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const { currentLanguage } = useLanguage();

    const handleSendLink = () => {
        // Logic to send the link
    };

    return (
        <View style={Backgroundstyle.interactive_screens}>
            <View style={GlobalStyle.BodyWrapper}>

                <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}>
                    <BackButton onPress={() => navigation.goBack()} />
                    <Text style={[HeaderText.Header]}>
                        {t("ForgotPasswordScreen.Header", currentLanguage)}
                    </Text>
                </View>

                <Text style={[styles.Header_Primarycolor1,{paddingLeft: 17, marginTop: 25}]}>
                    {t("ForgotPasswordScreen.Description", currentLanguage)}
                </Text>
                
                <Text style={[styles.Header_Primarycolor1, { fontFamily: "space-grotesk-bold", fontSize: 16, marginBottom: 5, paddingLeft: 16 }]}>E-mail</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    clearButtonMode={"always"}
                    required
                    placeholder="E-mail"
                    style={[styles.inputBox, { marginBottom: 20, marginTop: 10, fontSize: 16, fontFamily: "space-grotesk" }]}
                />

                <TouchableOpacity 
                    style={Buttons.main_button}
                    onPress={handleSendLink}>
                    <Text style={Buttons.main_buttonText}>
                        {t("ForgotPasswordScreen.SendLinkButton", currentLanguage)}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default ForgotPassword;
