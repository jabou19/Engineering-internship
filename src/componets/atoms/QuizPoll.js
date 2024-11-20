import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import * as style from "../../styles/Stylesheet";
import PollChart from "./PollChart";
import Quiz from "./Quiz";

const QuizPoll = ({data}) => {


  return (
    <View>
      {data.type === "quiz" ? (
        <Quiz questionData={data} />
      ) : (
        <View>
          <PollChart pollData={data} />
        </View>
      )}
    </View>
  );
};

export default QuizPoll;
