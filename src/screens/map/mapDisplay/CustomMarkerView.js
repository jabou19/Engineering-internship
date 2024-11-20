import React from "react";
import {View, Image, StyleSheet} from "react-native";

class CustomMarkerView extends React.Component {
    render() {
        return (
            <View>
                <Image source={require('../../../../assets/images/marker_bg.jpg')} style={styles.image}/>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    }
});

export default CustomMarkerView;
