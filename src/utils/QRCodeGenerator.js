import React from 'react';
import QRCode from 'react-native-qrcode-svg';

export function generateQRCode(data) {
  return (
    <QRCode
      value={data}
      size={100} // Adjust the size as per your requirement
      // Other QR code props can be added here
    />
  );
}
