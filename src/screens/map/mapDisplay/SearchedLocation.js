import React from "react";
import {
    dropdownStyles,
    Primarycolor1,
    Primarycolor2,
    Primarycolor3,
    Primarycolor4,
    styles
} from "../../../styles/Stylesheet";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { calculateDistance } from "../../../utils/uptainersUtils";

const SearchedLocation = ({location, styling, onPress, userLatitude, userLongitude,}) =>{
    return (
    <TouchableOpacity
        key={location.uptainerName}
        onPress={onPress}
        style={styling}
    >
        <View style={styles1.stationInfo}>
            <View>
                <Text style={styles1.stationName}>{location.uptainerName}</Text>
                <View style={styles1.addressInfo}>
                    <Text style={[styles.article_text, styles1.stationAddress]}>{`${location.uptainerStreet}, ${location.uptainerCity}`}</Text>
                    <View style={styles1.spacer} />
                    {(userLatitude !== null && userLongitude !== null) &&
                    (<Text style={styles1.distance}>{` ${calculateDistance(
                        {latitude: userLatitude,
                            longitude: userLongitude},
                        {latitude: parseFloat(location.uptainerLat),
                            longitude: parseFloat(location.uptainerLong)}
                    )} km`}</Text>)}
                </View>
            </View>
        </View>
    </TouchableOpacity>)
}

const styles1 = StyleSheet.create({
    stationInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    stationName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
        color: Primarycolor1,
    },
    addressInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    stationAddress: {
        fontSize: 12,
        color:Primarycolor1,
        width:"75%"
    },

    distance: {
        width:"25%",
        fontSize: 12,
        color: Primarycolor1,
        alignItems:"center"
    },

});

export default SearchedLocation;