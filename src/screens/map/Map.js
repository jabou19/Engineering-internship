import { styles ,Backgroundstyle} from '../../styles/Stylesheet';
import Navigationbar from '../../componets/Navigationbar';
import React from 'react';
import StationsMap from "./mapDisplay/StationsMap";
import {View} from "react-native";


const Map = ({ navigation }) => {
return (
    <View style={Backgroundstyle.interactive_screens}>
        <StationsMap navigation={navigation}/>
        <Navigationbar navigation={navigation}/>
    </View>
);
}

export default Map;
