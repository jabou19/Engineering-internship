import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Primarycolor1} from "../../../styles/Stylesheet";
import {AntDesign} from "@expo/vector-icons";

class CustomCallout extends React.Component {
    render() {
        const {currentLocation} = this.props;

        return (
            <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
                    <Text style={styles.locationName}>{currentLocation.uptainerName}</Text>
                    <Text style={styles.locationAddress}>{currentLocation.uptainerStreet}</Text>
                </View>
                <View style={styles.Icon_container}>
                    <AntDesign style={{justifyContent: 'center'}} name="right" size={26} color={Primarycolor1}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    columnContainer: {
        flexDirection: 'column',
        marginLeft: 5,
        marginBottom: 3,
        marginTop: 3,
        marginRight: 5,
    },
    locationName: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'space-grotesk-bold',
        flexWrap: 'wrap',
        maxWidth: 300,
    },
    locationAddress: {
        flexWrap: 'wrap',
        marginBottom:1,
        fontSize: 13,
        fontFamily: 'space-grotesk',
        maxWidth: 300,
    },
});

export default CustomCallout;
