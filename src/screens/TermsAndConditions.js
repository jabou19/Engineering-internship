import React from "react";
import { createUser} from "../utils/Repo";
import { firebaseAurth } from "../utils/Firebase";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Backgroundstyle, styles, Buttons } from "../styles/Stylesheet";

const TermsAndConditions = ({ navigation, route }) => {
    const { email, password } = route.params;

    const terms = [
      "You agree not to misuse the services.",
      "All content is copyrighted and owned us.",
      "Personal data shared will be protected.",
      "You agree not to misuse the services.",
      "Personal data shared will be protected.",
      "All content is copyrighted and owned us.",
      "You agree not to misuse the services.",
      "All content is copyrighted and owned us."
  ];

  const handleAccept = async () => {
      await createUser(email, password);
      if (firebaseAurth.currentUser !== null) {
          navigation.navigate("ProfileCreated");
      }
  };

  const renderTerm = ({ item, index }) => (
    <Text style={styles.paragraph_text}>{index + 1}. {item}</Text>
  );

  return (
    <View style={[Backgroundstyle.interactive_screens, { padding: 15 }]}>
      <Text style={[styles.Header, styles.Header_Primarycolor1, { fontSize: 25 }]}>
        Terms and Conditions 
      </Text>
      <FlatList 
        data={terms}
        renderItem={renderTerm}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginVertical: 20, paddingHorizontal: 20 }}/>
      <TouchableOpacity 
        style={[Buttons.main_button, { marginBottom: 10 }]}
        onPress={handleAccept}>
        <Text style={Buttons.main_buttonText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[Buttons.secondary_button, { marginBottom: 20 }]}
        onPress={() => navigation.goBack()}>
        <Text style={Buttons.secondary_buttonText}>Decline</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TermsAndConditions;