

import React, { useState, useContext, createContext } from 'react';
import en from './en';
import da from './da';


const LanguageContext = createContext();


function getLanguageObject(currentLanguage) {
  switch (currentLanguage) {
    case 'en':
      return en;
    case 'da':
      return da;
    default:
      return en;
  }
}


export function t(key, currentLanguage) {
  const langObj = getLanguageObject(currentLanguage);
  const keys = key.split('.');


  let translation = langObj;


  for (const k of keys) {
    if (translation[k]) {
      translation = translation[k];
    } else {
      return key;
    }
  }


  return translation;
}


export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('da');


  function setLanguage(lang) {
    console.log('Language changing to:', lang);
    setCurrentLanguage(lang);
  }


  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }} >

      {children}
    </LanguageContext.Provider>
  );
}


export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
