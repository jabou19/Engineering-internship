import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  styles,
  Backgroundstyle,
  Primarycolor2,
  Buttons,
  Primarycolor1,
} from "../styles/Stylesheet";
import { Ionicons, Octicons } from "@expo/vector-icons"; // or any other icon library you prefer
import { useLanguage, t } from "../Languages/LanguageHandler"; // Import 'useLanguage' and 't'
import CustomInput from "../componets/atoms/CustomInput";
import GlobalStyle from "../styles/GlobalStyle";
import BackButton from "../componets/BackButton";
import ErrorBanner from "./ErrorBanner";

const SignUpScreen = ({ navigation }) => {
  // State variables using React Hooks
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("false"); // to check on password
  const [showPassword, setShowPassword] = useState(false);
  const { currentLanguage } = useLanguage();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error msg");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  // Function to handle changes in the email input
const onChangeEmailHandler = (text) => {
  onChangeEmail(text);
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if(formSubmitted)
    if(emailPattern.test(text)){
      setShowError(false);
      setEmailValid(true);
      return;
    }
  if(!emailPattern.test(text)){
    setShowError(false);
    setEmailValid(false);
    return;
  }
  };
// Function to check password and update state
  const CheckPassword = (text) => {
    onChangePassword(text);
    if(formSubmitted)
      if(text.length >= 8 ) {
        setShowError(false);
        setPasswordCheck(true);
        return;
      }
    if(text.length < 8 ) {
      setShowError(false);
      setPasswordCheck(false);
      return ;
    }
  };

  // useEffect hook to reset error state on email or password change
  React.useEffect(() => {
    setShowError(false);
}, [email, password]);

  // Function to handle form submission and Checks and navigates to Terms and Conditions
  const handleSubmit = () => {
    setFormSubmitted(true);
    // Check if email and password is empty
    if (email.trim() === "" && password.trim()==="") {
      setShowError(true);
      setErrorMessage([t("SignUpScreen.fields",currentLanguage)]);
      setEmailValid(false);
      setPasswordCheck(false);
      return;
    }
    // Check if email is empty, and password is not empty
   if (email.trim() === ""&& password.trim()!=="" && password.length <8 ) {
      setShowError(true);
      setErrorMessage([t("SignUpScreen.fields",currentLanguage)]);
      setEmailValid(false);
     setPasswordCheck(false);
      return;
    }
    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // Check if email is not empty, and password is empty
    if (!emailPattern.test(email) && email.trim()!=="" && (password.trim()==="")) {
      setShowError(true);
      setErrorMessage("Error msg");
      setEmailValid(false);
      setPasswordCheck(false);
      return;
    }
    // Check if email is not empty, and password is not empty and number of characters are less than 8
    if (!emailPattern.test(email) && email.trim()!=="" && password.length < 8 && password.trim()!=="") {
      setShowError(true);
      setErrorMessage("Error msg");
      setEmailValid(false);
      setPasswordCheck(false);
      return;
    }
    // Check if email is not empty, and password is not empty and number of characters are bigger or equal than 8
    if (!emailPattern.test(email) && email.trim()!=="" && password.length >=8 && password.trim()!=="") {
      setShowError(true);
      setErrorMessage("Error msg");
      setEmailValid(false);
     setPasswordCheck(true);
      return;
    }
    // Check if email is empty, and password is not empty and number of characters are bigger or equal than 8
    if (!emailPattern.test(email) && email.trim()==="" && password.length >=8 && password.trim()!=="") {
      setShowError(true);
      setErrorMessage([t("SignUpScreen.fields",currentLanguage)]);
      setEmailValid(false);
      setPasswordCheck(true);
      return;
    }
    if (emailPattern.test(email) && email.trim()!=="" && (password.trim()==="")) {
      setShowError(true);
      setErrorMessage([t("SignUpScreen.fields",currentLanguage)]);
      setEmailValid(true);
      setPasswordCheck(false);
      return;
    }

    if (emailPattern.test(email) && email.trim()!=="" && password.length < 8 && password.trim()!=="") {
      setShowError(false);
      setErrorMessage("Error msg");
      setPasswordCheck(false);
      setEmailValid(true);
      return;
    }
    if (emailPattern.test(email) && email.trim()!=="" && password.length >=8 && password.trim()!=="") {
      setShowError(false);
      setErrorMessage("Error msg");
      setEmailValid(true);
      setPasswordCheck(true);
      return  navigation.navigate("TermsAndConditions", { email, password }); // Return early since we need a valid email before checking password
    }
   /* // If all validations pass
    setShowError(false);
    navigation.navigate("TermsAndConditions", { email, password });*/
  };

  // Function to render error or helper text based on form submission and password check
  const renderMessage = () => {
    // If the form has not been submitted yet, show a helper text
    if (!formSubmitted) {
      return (
          <Text style={SignUpStyles.helperText}>
            {t("SignUpScreen.passwordmsgUP", currentLanguage)}
          </Text>
      );
    }
    // If the form has been submitted and the password is invalid, show an error text
    else if (formSubmitted && !passwordCheck) {
      return (
          <Text style={[SignUpStyles.errorText, { marginLeft: 2, textAlign: "start" }]}>
            {t("SignUpScreen.passwordmsgUP", currentLanguage)}
          </Text>
      );
    }
    // If the password is valid, show a helper text
    else if (passwordCheck) {
      return (
          <Text style={SignUpStyles.helperText}>
            {t("SignUpScreen.passwordmsgUP", currentLanguage)}
          </Text>
      );
    }
    // Default case, show a helper text
     else {
      return (
          <Text style={SignUpStyles.helperText}>
            {t("SignUpScreen.passwordmsgUP", currentLanguage)}
          </Text>
      );
    }
  };

  //check if pass should be shown
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={Backgroundstyle.informationScreens}>
      {showError && <ErrorBanner message={errorMessage} />}


      <View style={{ alignSelf: "stretch", paddingLeft: 25, paddingTop: 5 }}>

        <BackButton onPress={navigation.goBack}/>
      </View>
        <View style={GlobalStyle.BodyWrapper}>
      <Text style={[styles.Header_Primarycolor1,styles.Header]}>{t('SignUpScreen.Signup', currentLanguage)}</Text>
      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#8EA59E"
        value={email}
        onChangeText={onChangeEmailHandler}
        keyboardType="email-address"
        autoCapitalize="none"
        clearButtonMode={"always"}
        style={[styles.inputBox, styles.inputBox, (!emailValid && formSubmitted) && SignUpStyles.errorInputBox]}
      />
      {!emailValid && formSubmitted ? <Text style={SignUpStyles.errorText}>{t("SignUpScreen.validemail", currentLanguage)}</Text> : null}

      <View style={[styles.inputBox , {flexDirection:"row"}, (!passwordCheck && formSubmitted) && SignUpStyles.errorInputBox]}>
      <TextInput
        value={password}
        onChangeText={CheckPassword}
        placeholder={t('SignUpScreen.password', currentLanguage)}
        placeholderTextColor="#8EA59E"
        keyboardType={'default'}
        secureTextEntry={!showPassword}
             style={{flex:1 ,fontFamily: 'space-grotesk',fontSize:15}}
      />
      <Ionicons
        name={showPassword ? 'ios-eye-off' : 'ios-eye'}
        size={18}
        color={Primarycolor1}
        style={styles.Icon_container}
        onPress={togglePasswordVisibility}
      />
      </View>
          { renderMessage()}
      <Pressable onPress={handleSubmit} style={Buttons.main_button}>
            <Text style={Buttons.main_buttonText}>{t('SignUpScreen.Signup', currentLanguage)}</Text>
        </Pressable>

        <Pressable onPress={handleSubmit} style={Buttons.buttonfb}>
          <View style={SignUpStyles.container}>
            <Text style={Buttons.SocialMediabuttonText}>
              {" "}
              Continue with Facebook
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={handleSubmit} style={Buttons.buttongoogle}>
          <View style={SignUpStyles.container}>
            <Text style={Buttons.SocialMediabuttonText}>
              {" "}
              Continue with Google
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Sign in");
          }}
        >
          <Text style={styles.link}>
            {" "}
            {t("SignUpScreen.LogInLink", currentLanguage)}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const SignUpStyles = StyleSheet.create({
  text_Tertiary: {
    marginBottom: 10,
    color: "#07A0A2",
    textAlign: "center",
    fontSize: 15,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#1c4b3d",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  errorInputBox: {
    borderColor: "#AA0000",
    borderWidth: 3,
    },
  errorText: {
    color: "#AA0000",
    fontSize: 14,
    marginTop: -10,
    marginBottom:13,
    textAlign: "center",
    },
  helperText: {
    color:  "#1c4b3d",
    fontSize: 14,
    marginTop: -10,
    marginBottom:13,
    marginLeft: 2,
    textAlign: "start"
  }

});

export default SignUpScreen;
