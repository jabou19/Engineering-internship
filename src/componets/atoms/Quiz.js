import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as style from "../../styles/Stylesheet";
import LottieView from "lottie-react-native";

const Quiz = ({ questionData }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const animationRef = useRef(null);

  const styles = {
    container: {
      width: "100%",
      height: "auto",
      backgroundColor: style.Primarycolor2,
      marginBottom: 15,
      marginTop: 10,
      paddingBottom: 3,
    },
    questionText: {
      color: style.Primarycolor1,
      fontSize: 18,
      fontFamily: "space-grotesk-Medium",
      fontWeight: "bold",
      marginTop: 13,
      marginBottom: 15,
      textAlign: "left",
      marginLeft: 8,
    },
    optionButton: {
      padding: 7,

      marginLeft: 8,
      marginRight: 8,
      marginBottom: 15,

      backgroundColor: style.Primarycolor3,
      borderColor: style.Primarycolor1,
      borderWidth: 2,
      justifyContent: "center",
    },
    optionText: {
      fontSize: 14,
      fontFamily: "space-grotesk-Medium",
      color: style.Primarycolor1,
      marginLeft: 5,
    },
    selectedOptionText: {
      color: style.Primarycolor3,
    },
    correctAnswerStyle: {
      borderColor: style.Primarycolor1, // Correct answer color
      backgroundColor: style.Primarycolor1, // Correct answer color
    },
    incorrectAnswerStyle: {
      borderColor: "#AA0000", // Incorrect answer color
      backgroundColor: "#AA0000",
    },
    animationStyle: {
      position: "absolute",
      flex: 1,
      pointerEvents: "none",

      zIndex: 1,
    },
  };
  const styleButtonOnClick = (option) => {
    if (!!selectedOption) {
      if (option.isCorrect) {
        return styles.correctAnswerStyle;
      } else {
        if (option === selectedOption) {
          return styles.incorrectAnswerStyle;
        }
      }
    }
  };

  const styleTextOnClick = (option) => {
    if (!!selectedOption) {
      if (option.isCorrect) {
        return styles.selectedOptionText;
      } else {
        if (option === selectedOption) {
          return styles.selectedOptionText;
        }
      }
    }
  };

  const handlePress = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption.isCorrect) {
      animationRef.current?.play();
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        style={styles.animationStyle}
        source={require("../../../assets/animations/firework.json")}
        autoPlay={false}
        loop={false}
      />
      <Text style={styles.questionText}>{questionData.question}</Text>
      {questionData.options.map(
        (
          option,
          optionIndex //For each option -->making  button
        ) => (
          <TouchableOpacity
            key={optionIndex}
            onPress={() => handlePress(option)}
            style={[styles.optionButton, styleButtonOnClick(option)]}
            disabled={selectedOption !== null} // Disable options after selection
          >
            <Text style={[styles.optionText, styleTextOnClick(option)]}>
              {option.text}
            </Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

export default Quiz;
