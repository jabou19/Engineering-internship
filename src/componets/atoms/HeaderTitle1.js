import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Primarycolor1, Primarycolor2, Primarycolor3} from "../../styles/Stylesheet";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

const Headertitle1 = ({
                         onLeftIconPress,
                         onRightIconPress,
                         headerTitle,
                         leftIcon,
                         rightIcon,
                     }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // paddingTop: 40,
                marginLeft: 20,
                marginBottom: 20,
                alignItems: "center",
                alignContent: "center",
            }}
        >
            {leftIcon && (
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={onLeftIconPress}
                    style={{
                        backgroundColor: Primarycolor1,
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Ionicons name={leftIcon} size={25} color="white" />
                </TouchableOpacity>
            )}

            <Text style={{ color: Primarycolor1, fontWeight: "700", fontSize: 16 }}>
                {headerTitle}
            </Text>
            {rightIcon && (
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                        marginRight: 10,
                        marginLeft: 30,
                        backgroundColor: Primarycolor3,
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={onRightIconPress}
                >
                    <Ionicons name={rightIcon} size={30} style={{color:Primarycolor1}} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Headertitle1;

const styles = StyleSheet.create({});