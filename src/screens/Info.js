import { View, Text} from 'react-native';
import { styles ,Backgroundstyle} from '../styles/Stylesheet';
import React from 'react';


const Info = ({ navigation }) => {
return (
    <View style={Backgroundstyle.interactive_screens}> 
        <Text style={styles.Header_Primarycolor1}> Info page </Text>
    </View>
);
}

export default Info;