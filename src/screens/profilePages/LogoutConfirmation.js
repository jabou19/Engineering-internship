import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, BackHandler} from "react-native";
import { styles, Backgroundstyle, Buttons } from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { firebaseAurth } from "../../utils/Firebase";
import { signOut } from "firebase/auth";


const LogoutConfirmation = ({ navigation }) => {
  const { currentLanguage } = useLanguage();

  const handleLogout = () => {
    signOut(firebaseAurth)
      .then(() => {
        // Reset the navigation stack to prevent going back
        navigation.reset({
          index: 0,
          routes: [{ name: 'Sign in' }],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

 
  return (
    <View style={Backgroundstyle.interactive_screens}>
      <Text style={styles.Header_Primarycolor1}>
        {t("LogoutConfirmation.confirmMessage", currentLanguage)}
      </Text>

      <TouchableOpacity 
        style={[Buttons.main_button, { marginTop: 20, marginBottom: 10 }]}
        onPress={handleLogout}>
        <Text style={Buttons.main_buttonText}>
        {t("LogoutConfirmation.logoutButton", currentLanguage)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={ Buttons.secondary_button }
        onPress={() => navigation.navigate("Profile")}>
        <Text style={Buttons.secondary_buttonText}>
        {t("LogoutConfirmation.cancelButton", currentLanguage)}        
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default LogoutConfirmation;
