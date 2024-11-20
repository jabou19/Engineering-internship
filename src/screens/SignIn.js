import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput , Pressable , Alert } from 'react-native';
import {
    styles,
    Backgroundstyle,
    Buttons,
    Primarycolor1, Primarycolor3,
}
    from '../styles/Stylesheet';
import { Ionicons } from '@expo/vector-icons';
import {t, useLanguage} from "../Languages/LanguageHandler"; // or any other icon library you prefer
import { signInUser } from '../utils/Repo';//function to login, only needs email and password... returns a boolean
import { firebaseAurth } from '../utils/Firebase';
import GlobalStyle from "../styles/GlobalStyle";
import ForgotPassword from './ForgotPassword';
import ErrorBanner from './ErrorBanner';
import { onAuthStateChanged } from '@firebase/auth';
import BackButton from "../componets/BackButton";

const SignIn = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(true); // to check on password
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error msg");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [userLogged, setUserLogged] = useState(false);
    const { currentLanguage, setLanguage } = useLanguage();

    //To check on email
    const onChangeEmailHandler = (text) => {
        onChangeEmail(text);
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (formSubmitted) setEmailValid(emailPattern.test(text));
    };

    //To check on password
    const CheckPassword = (text) => {
        onChangePassword(text);
        setPasswordCheck(text.length >= 8); // it must be at least 8 chars
    };

    // Hide the banner when email or password is edited
    React.useEffect(() => {
        setShowError(false);
    }, [email, password]);

    //Check on both
    const handleSubmit = () => {
        setFormSubmitted(true);
        // Check if email is empty
        if (email.trim() === "") {
            setShowError(true);
            setErrorMessage([t("SignInScreen.fields",currentLanguage)]);
            setEmailValid(false);
            setPasswordCheck(true);
            return; // Return early since email is a prerequisite for password check
        }

        // Validate email format
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email) && email.trim()!=="") {
            setShowError(true);
            setErrorMessage("Error msg");
            setEmailValid(false);
            setPasswordCheck(true);
            return; // Return early since we need a valid email before checking password
        }

        // Check if password is empty only if email is valid
        if (password.trim() === "") {
            setShowError(true);
            setErrorMessage([t("SignInScreen.fields",currentLanguage)]);
            setPasswordCheck(false);
            setEmailValid(true);
            return; // Return early to ask for password input
        }

        // Validate password length
        if (password.length < 8 && password.trim()!=="") {
            setShowError(true);
            setErrorMessage("Error msg");
            setPasswordCheck(false);
            setEmailValid(true);
            return; // Return early since password needs to meet length requirement
        }

        // If all validations pass
            setShowError(false);
            signInUser(email, password, navigation);

    };

    //check if pass should be shown
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    //Fn to navigate to the Homepage if the user is logged in
    onAuthStateChanged(firebaseAurth, async (user) => {
        if (user) {
            setUserLogged(true);
        } else {
            setUserLogged(false);
        }
    });
    if (userLogged) {
        navigation.navigate("Homepage");
    }

    let Header= t('SignInScreen.Headline', currentLanguage);

    return (
        <View style={Backgroundstyle.informationScreens}>
            {showError && <ErrorBanner message={errorMessage} />}
            <View style={{ alignSelf: "stretch", paddingLeft: 25}}>
                <BackButton onPress={navigation.goBack}/>
            </View>
        <View style={GlobalStyle.BodyWrapper}>
            <Text style={[styles.Header_Primarycolor1,styles.Header]}>{Header}</Text>
            <TextInput
                placeholder="E-mail"
                placeholderTextColor="#8EA59E"
                value={email}
                onChangeText={onChangeEmailHandler}
                keyboardType="email-address"
                autoCapitalize="none"
                clearButtonMode={"always"}
                style={[styles.inputBox, (!emailValid && formSubmitted) && SignUpStyles.errorInputBox]}
                />
                {!emailValid && formSubmitted && <Text style={SignUpStyles.errorText}>{t("SignInScreen.validemail",currentLanguage)}</Text>}

                <View style={[styles.inputBox , {flexDirection:"row"}, (!passwordCheck && formSubmitted) && SignUpStyles.errorInputBox]}>
                <TextInput
                    value={password}
                    onChangeText={CheckPassword}
                    placeholder={`${t("SignUpScreen.password", currentLanguage)}`}
                    placeholderTextColor="#8EA59E"
                    keyboardType={'default'}
                    secureTextEntry={!showPassword}
                    style={{flex:1 , fontFamily: 'space-grotesk',fontSize:15}}

                />
                <Ionicons
                    name={showPassword ? 'ios-eye-off' : 'ios-eye'}
                    size={18}
                    color={Primarycolor1}
                    style={styles.Icon_container}
                    onPress={togglePasswordVisibility}
                />
            </View>
            { //Check on the password
                (!passwordCheck && formSubmitted) ? <Text style={SignUpStyles.errorText}>
                    {t("SignInScreen.passwordmsg",currentLanguage)}</Text> : null }
            <Pressable onPress={handleSubmit} style={Buttons.main_button}>
                <Text style={Buttons.main_buttonText}>{Header}</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={[styles.link, {marginTop: 15}]}>{t("SignInScreen.ForgetPwHint", currentLanguage)}</Text>
            </Pressable>

            <Pressable onPress={handleSubmit} style={Buttons.buttonfb}>
                <View style={SignUpStyles.container}>
                    <Text style={Buttons.SocialMediabuttonText}> Continue with Facebook</Text>
                </View>
            </Pressable>

            <Pressable onPress={handleSubmit}  style={Buttons.buttongoogle}>
                <View style={SignUpStyles.container}>
                    <Text style={Buttons.SocialMediabuttonText}> Continue with Google</Text>
                </View>
            </Pressable>

            <Pressable onPress={() => {
                navigation.navigate('SignUp')
            }}>
                <Text style={styles.link}>{t("SignInScreen.SignUpHint", currentLanguage)}</Text>
            </Pressable>
        </View>
        </View>
    );
}

const SignUpStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
errorInputBox: {
        borderColor: "#AA0000",
        borderWidth: 3,
    },
    errorText: {
        color: "#AA0000",
        fontSize: 12,
        marginTop: -10,
        marginBottom: 13,
        textAlign: "center",
    },
    errorBanner: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#AA0000",
        alignItems: "center",
        width: "100%",
        zIndex: 10,
     },
});

export default SignIn;
