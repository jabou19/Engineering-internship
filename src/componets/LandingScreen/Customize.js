import React from "react";
import { StyleSheet,View,Text } from "react-native";
import { Primarycolor1,Primarycolor2,Primarycolor3 } from "../../styles/Stylesheet";
const Customize = ({top,image,bottom}) =>{
    //each slide looks the same : it has a header with same styles,
    //an image svg in center and some bottom text
    //because of this i create this Customize components which gets data from parent and renders on the screen
    return <View style={{flex:1}}>
        <Text style={styling.top}>{top}</Text>
        <View style={styling.imageContainer}>{image}</View>
        <Text style={styling.bottom}>{bottom}</Text>
    </View>
}
const styling = StyleSheet.create({
    top:{fontSize: 35,
        fontFamily: "space-grotesk-bold",
        color:Primarycolor1,
        marginLeft:19.5,
    },
    imageContainer:{
        flex:3,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:30
    },
    bottom:{
        color:Primarycolor1,
        fontFamily: 'space-grotesk-bold',
        paddingHorizontal:20,
        flex:2,
        alignItems:"center",
        justifyContent:"center"
    }
})
export default Customize;
