import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {t, useLanguage} from "../../Languages/LanguageHandler";

// This component is used to wrap the input component and show the hint text "optional"
// you need to set whether show the hint by passing the prop "showStar"
// you can also set the margin of the hint text by passing the prop "optionalMarginXXX".
// You can also set the font size of the hint text by passing the prop "optionalFontSize".

const CustomInput = ({children, showStar,
                       optionalMarginTop=5,
                       optionalMarginLeft = 10,
                       optionalFontSize = 14,
                     optionalMarginBottom = 10,}) => {
  const {currentLanguage} = useLanguage();

  return (
    <View style={customInputStyles.container}>
      {children}
      {showStar && <Text style={{
        fontSize: optionalFontSize,
        marginTop: optionalMarginTop,
        marginLeft: optionalMarginLeft,
        marginBottom: optionalMarginBottom,
      }}>{t("CustomInput.hint", currentLanguage)}</Text>}
    </View>
  );
};

const customInputStyles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'column',
  },
});

export default CustomInput;
