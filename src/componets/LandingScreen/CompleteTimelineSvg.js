import React, { useState, useEffect } from "react";
import TimelineSvg from "../svg-components/TimelineSvg";
import { View, StyleSheet, Text, Animated } from "react-native";
import PhoneSvg from "../svg-components/Phone";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import { Primarycolor1 } from "../../styles/Stylesheet";

const CompleteTimelineSvg = () => {
  const { currentLanguage } = useLanguage();
  const [isLeft, setIsLeft] = useState(true);
  const phonePositionX = new Animated.Value(isLeft ? -3 : 0);
  const phoneOpacity = new Animated.Value(1);

  setTimeout(() => {
    setIsLeft(false);
  }, 1000);

  useEffect(() => {
    // Animation of phone's position when the component mounts
    const sequence = Animated.sequence([
      Animated.timing(phonePositionX, {
        toValue: 0,
        duration: 9000,
        useNativeDriver: false,
      }),
      Animated.timing(phonePositionX, {
        toValue: -3,
        duration: 9000,
        useNativeDriver: false,
      }),
    ]);

    const loop = Animated.loop(sequence);

    loop.start(() => {
      setIsLeft(true);
    });

    return () => {
      loop.stop();
    };
  }, []);

  return (
    <View>
      <View style={[isLeft ? "" : styles.containerCenter, { gap: 10 }]}>
        <Animated.View
          style={[
            styles.phone,
            isLeft ? styles.phoneLeft : { marginLeft: phonePositionX },
            { opacity: phoneOpacity },
          ]}>
          {/* <PhoneSvg style={isLeft ? styles.phoneLeft : ""} /> */}
          <PhoneSvg />
        </Animated.View>
        <TimelineSvg />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
          color: Primarycolor1,
        }}>
        <Text style={[{ right: 15 }, styles.text]}>
          {t("SolutionTimeline.Bottom.first", currentLanguage)}
        </Text>
        <Text style={styles.text}>
          {t("SolutionTimeline.Bottom.second", currentLanguage)}
        </Text>
        <Text style={[{ left: 15 }, styles.text]}>
          {t("SolutionTimeline.Bottom.third", currentLanguage)}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  phoneLeft: {
    left: -10,
  },
  containerCenter: {
    alignItems: "center",
  },
  text: {
    color: Primarycolor1,
    fontFamily: "space-grotesk-bold",
  },
});
export default CompleteTimelineSvg;
