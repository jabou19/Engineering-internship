import {View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';  // Import useState
import { useLanguage, t } from '../../Languages/LanguageHandler';
import { Primarycolor1, Primarycolor3, styles as stylesGlobal} from "../../styles/Stylesheet";
import CustomInput from "../../componets/atoms/CustomInput";

const DescriptionField = ({ onInputComplete, data = ''}) => {
    const { currentLanguage } = useLanguage();
    const [inputValue, setInputValue] = useState(data); // Create a state to store the input value

    return (
      <View style={{marginTop: 5}}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[stylesGlobal.formLabel, { marginLeft: 0, marginTop:15 }]}>
                {t("DescriptionField.label", currentLanguage)}
            </Text>
            <Text style={[descriptionFieldStyles.optionalText,{marginLeft: 5, marginTop: 5 }]}>
                ({t("AccountSettingsScreen.Optional", currentLanguage)})
            </Text>
            </View>

          <CustomInput optionalMarginBottom>
          <TextInput
            style={descriptionFieldStyles.dscInput}
            placeholder={t("DescriptionField.placeholder", currentLanguage)}
            placeholderTextColor="#8EA59E"
            multiline={true}
            defaultValue={data}
            onChangeText={text => setInputValue(text)}  // Update the state with the input value
            onEndEditing={() => onInputComplete && onInputComplete(inputValue)}  // Call the provided function with the input value
            textAlignVertical="top"
          />
         </CustomInput>
      </View>
    );
}

const descriptionFieldStyles = {
    dscLabel: {
        fontFamily: "space-grotesk-Medium",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        marginRight: 'auto'
    },
    dscInput: {
        alignItems: 'center',
        height: 100,
        fontFamily: "space-grotesk",
        borderWidth: 3,
        borderColor: Primarycolor1,
        backgroundColor: Primarycolor3,
        padding: 10,
        fontSize: 16,
    },
    optionalText: {
        color: Primarycolor1,
        fontSize: 14,
        fontWeight: "300",
        fontFamily: "space-grotesk"
    }
};

export default DescriptionField;
