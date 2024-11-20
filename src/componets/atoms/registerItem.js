/**
 * Register Item
 * button to go from screen to screen in the register item section
 * **/

// Donia code
// Used the "Dashboard" and "ItemButton" function created by Sebastian to create a identical "LandingPage" page and "RegisterItem" button.
import React from "react";
import { Button } from "react-native-elements";

import { elementsStyles } from "../../../src/styles/Stylesheet";

// temporary storage of values, if none are given then it's just null that's passed, though this shouldn't happen normally
var tempid = null;
var tempname = null;

export const RegisterItem = ({
  navigation,
  navplace,
  id = tempid,
  name = tempname,
}) => {
  return (
    <Button
      buttonStyle={elementsStyles.buttonStyles}
      onPress={() => {
        // eslint-disable-next-line react/prop-types
        navigation.navigate(navplace, { id: id, name: name });
        // If button is pressed: Redirect to "registrering item"
      }}
      // if navigation is to map, called stations, then i'll show "next" else i'll show register item
      title={navplace == "Stations" ? "Next" : "+ Register \n item"}
    />
  );
};
