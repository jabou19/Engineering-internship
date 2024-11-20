import { View } from "react-native";
import { Backgroundstyle } from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import React, { useState } from "react";
import * as Location from "expo-location";
import SortUptainers from "../componets/sortUptainers";
import GlobalStyle from "../styles/GlobalStyle";
import SearchBox from '../componets/SearchBox';
import { firebaseAurth } from "../utils/Firebase";



const Home = ({ navigation }) => {
  const [search, onChangeSearch] = useState("");
  //Asks for premission to use location at home screen only, must be sent here for new users or copy paste to other screens
  console.log("start current useeffect " + firebaseAurth.currentUser);
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    } else {
      console.log("status good");
      //				let loc = await Location.getLastKnownPositionAsync({});
      let loc = await Location.getCurrentPositionAsync({});
    }
  })();

  return (
    <View style={[Backgroundstyle.interactive_screens]}>
      <View style={GlobalStyle.BodyWrapper}>
        <SearchBox
          onChangeText={onChangeSearch}
          value={search}
          placeholderText={"SearchField.productPlaceholder"}
        /> 
        <SortUptainers navigation={navigation} />
        <Navigationbar navigation={navigation} />
      </View>
    </View>
  );
};

export default Home;
