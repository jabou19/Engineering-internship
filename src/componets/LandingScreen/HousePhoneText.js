

import React, {useEffect, useRef} from "react";
import {View, Text, StyleSheet, Animated} from "react-native";
import PhoneSvg from "../svg-components/Phone";
import HouseSvg from "../svg-components/House";
import { Primarycolor1 } from "../../styles/Stylesheet";
const HousePhoneText = ({showPhone, textUnderHouse}) =>{
    //created a container that has the svgs of : phone,house and text
    //conditional dispay the phone svg depending on instructions of parrent component;
    //display text from parent component;
    //this is actually half currently of CompleteHousePhoneText component



    // Use useRef to create a reference to the animated value
    const moveAnim = useRef(new Animated.Value(0)).current;

    // useEffect will run the animation when the component mounts

    useEffect(() => {
        // Wait for (1700 milliseconds) before starting the animation
        const timer = setTimeout(() => {
            // Define the animation
            Animated.timing(moveAnim, {
                toValue: 1, // End position of the animation
                duration: 2000, // Duration of the animation in milliseconds
                useNativeDriver: false, // Use native driver for better performance
            }).start();
        }, 1100);

        // Clear the timeout if the component is unmounted before the timeout completes
        return () => clearTimeout(timer);
    }, [moveAnim]);

    // Interpolate the animated value to create the moving effect
    const moveX = moveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200], // Start and end positions of the movement
    });

    return (<View style={styling.container}>
        <Animated.View style={{  transform: [{ translateX: moveX }] }} >
        {showPhone?<PhoneSvg style={styling.phone}/>:null}
        </Animated.View>
        <HouseSvg/>
        <Text style={styling.text}>{textUnderHouse}</Text>
    </View>
  );
};
const styling = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        color:Primarycolor1,
        fontFamily: 'space-grotesk-bold',
        marginTop:10
    },
    phone:{
        position:"absolute",
        top:-55,
        right:187.9,
    }
})
export default HousePhoneText;
