import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import * as styles from "../../styles/Stylesheet";
import { t, useLanguage } from "../../Languages/LanguageHandler";

const GeneralPopUp = ({ message, confirmLabel, cancelLabel, onConfirm, onCancel, customButtonStyle }) => {

  const {currentLanguage} = useLanguage();
  const translatedMessage = t(message, currentLanguage);
  const translatedConfirmLabel = t(confirmLabel, currentLanguage);
  const translatedCancelLabel = t(cancelLabel, currentLanguage);

  const handleConfirm = () => {

    onConfirm && onConfirm();
  };

  const handleCancel = () => {

    onCancel && onCancel();
  };

  return (
    <View>
      <Modal
        transparent
        animationType="none"
        onRequestClose={handleCancel}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          <View
            style={{
              backgroundColor: styles.Primarycolor2,
              padding: 20,
              borderRadius: 0,
              width: '70%',
              aspectRatio: 1.15,
              justifyContent: 'center',
            }}>
              
            <Text style={[styles.HeaderText.Header_Primarycolor1, { textAlign: 'center', fontSize: 14 }]}>{message}</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              
              <TouchableOpacity
                onPress={handleConfirm}
                style={[styles.Buttons.main_button, customButtonStyle, { marginBottom: 12 }]}>
                <Text style={styles.Buttons.main_buttonText}>{confirmLabel}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.Buttons.secondary_button}>
                <Text style={styles.Buttons.secondary_buttonText}>{cancelLabel}</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GeneralPopUp;