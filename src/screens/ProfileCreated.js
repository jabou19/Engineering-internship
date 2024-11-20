import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { Backgroundstyle, Primarycolor3 } from '../styles/Stylesheet';

const ProfileCreated = ({ navigation }) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;  // opacity animation

  useEffect(() => {
    // Opacity animation for the checkmark
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // timer for navigation
    const timer = setTimeout(() => {
      navigation.navigate('Homepage');  // Navigate to home page
    }, 1500);

    // Clean up timer
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[Backgroundstyle.message_Screens, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
      <View style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'transparent',
        borderColor: Primarycolor3,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <Animated.Text style={{ opacity: opacityAnim, fontSize: 40, color: Primarycolor3 }}>
          ✓
        </Animated.Text>
      </View>
      <Text style={{ color: Primarycolor3, fontSize: 20, margin: 20, textAlign: 'center' }}>
        Profile Created Successfully!
      </Text>
    </View>
  );
}

export default ProfileCreated;
