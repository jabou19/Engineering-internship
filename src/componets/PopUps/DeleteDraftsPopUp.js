import React from 'react';
import GeneralPopUp from './GeneralPopUp';
import { useLanguage, t } from '../../Languages/LanguageHandler';

const DeleteDraftsPopUp = ({ onConfirm, onCancel }) => {
  const { currentLanguage } = useLanguage();

  const messageKey = "MyDraftsScreen.closeButtonAsking";
  const confirmLabelKey = "MyDraftsScreen.closeButtonAnswerYes";
  const cancelLabelKey = "MyDraftsScreen.closeButtonAnswerNo";

  const translatedMessage = t(messageKey, currentLanguage);
  const translatedConfirmLabel = t(confirmLabelKey, currentLanguage);
  const translatedCancelLabel = t(cancelLabelKey, currentLanguage);

  const customButtonStyle = {
    backgroundColor: "#AA0000",
    borderRadius: 0,
    borderColor: "#AA0000",
    alignItems: 'center',
  };

  const handleConfirm = () => {
    console.log('Confirm button pressed');
    onConfirm && onConfirm();
  };

  const handleCancel = () => {
    console.log('Cancel button pressed');
    onCancel && onCancel();
  };

  return (
    <GeneralPopUp
      message={translatedMessage}
      confirmLabel={translatedConfirmLabel}
      cancelLabel={translatedCancelLabel}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      customButtonStyle={customButtonStyle}
    />
  );
};

export default DeleteDraftsPopUp;