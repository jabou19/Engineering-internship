import React, { useEffect, useState } from "react";
import { ECharts } from "react-native-echarts-wrapper";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Primarycolor1,
  Primarycolor2,
  Primarycolor3,
} from "../../styles/Stylesheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PollChart = ({ pollData }) => {
  const [loaded, setLoaded] = useState(false);

  const [userClicked, setUserClicked] = useState(false);
  const [chartVisible, setChartVisible] = useState(false);
  const loadFromStorage = async () => {
    try {
      const getData = await AsyncStorage.getItem("pollClicked");
      if (getData) {
        setUserClicked(JSON.parse(getData));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOptionSelect = (option) => {
    // Show the chart when the poll option is pressed
    setChartVisible(true);
  };

  loadFromStorage();
  // If pollData is available
  if (!pollData) {
    return null;
  }

  let sum = 0;

  pollData.options.forEach((x) => (sum += x.responses)); //calculating the percentages

  // Reversing the order of options
  const reversedOptions = [...pollData.options].reverse();

  // Chart's options using pollData
  const chartOptions = {
    backgroundColor: Primarycolor2,
    textStyle: {
      fontFamily: "space-grotesk-Medium",
    },
    grid: {
      top: 0,
      width: "100%",
      bottom: 0,
      left: 20,
      right: 0,
    },
    yAxis: {
      axisLabel: {
        inside: true,
        padding: [0, 0, 45, -7],
        hideOverlap: false,
        color: Primarycolor1,
        fontSize: 13,
      },
      type: "category",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: reversedOptions.map((option) => option.text),
    },
    xAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      type: "value",
      splitLine: {
        show: false,
      },
      boundaryGap: false,
    },
    series: [
      {
        stack: "chart",
        data: reversedOptions.map((option) => option.responses),
        type: "bar",
        itemStyle: {
          height: 10,
          color: Primarycolor1,
        },
        barWidth: 20,
        barBorderRadius: [0, 0, 0, 0],
        label: {
          show: true,
          formatter: "{c}%",
          color: Primarycolor1,
          fontSize: 13,
          position: "outsideRight",
          offset: [250, -22],
        },
      },
      {
        stack: "chart",
        silent: true,
        data: reversedOptions.map((option) => sum - option.responses),
        type: "bar",
        itemStyle: {
          height: 10,
          color: Primarycolor3,
        },
        barWidth: 20,
        barBorderRadius: [0, 0, 0, 0],
        label: {
          show: false,
        },
      },
    ],
    additionalCode: `
        chart.on('rendered', function(param) {
            sendData('renderFinish');
        });
    `,
  };

  const containerStyle = StyleSheet.create({
    flexDirection: "column",
    width: "100%",
    height: 265,
    minHeight: 265,
    marginBottom: 0,
    marginTop: 0,
  });

  const styles = {
    invisible: {
      opacity: 0,
      height: "100%",
    },
    loaded: {
      backgroundColor: Primarycolor2,
      height: "100%",
      opacity: 1,
    },
    container: {
      backgroundColor: Primarycolor2,
      display: "flex",
      width: "100%",
      height: 315,
      minHeight: "30%",
      marginBottom: 50,
      marginTop: 9,
    },
    questionText: {
      color: Primarycolor1,
      fontSize: 18,
      fontFamily: "space-grotesk-Medium",
      fontWeight: "bold",
      marginTop: 8,
      marginBottom: 7,
      textAlign: "left",
      marginLeft: 15,
    },
    optionButton: {
      padding: 7,
      margin: 12,
      backgroundColor: "white",
      borderColor: Primarycolor1,
      borderWidth: 2,
      marginBottom: 8,
    },
    optionText: {
      fontSize: 14,
      fontFamily: "space-grotesk-Medium",
      color: Primarycolor1,
      marginLeft: 5,
    },
  };
  const onFinishLoading = () => {
    if (!loaded) {
      setTimeout(() => {
        setLoaded(true);
      }, 500); //This is because on "rendered" event in echarts, it triggers too fast and we can see a white screen before it actually finishes rendering.
    }
  };

  const savePoll = async () => {
    try {
      await AsyncStorage.setItem("pollClicked", JSON.stringify(true));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={containerStyle}>
        <Text style={styles.questionText}>{pollData.question}</Text>
        {!chartVisible &&
          !userClicked &&
          pollData.options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              onPress={() => {
                setUserClicked(true);
                savePoll();
                handleOptionSelect(option);
              }}
              style={styles.optionButton}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        {(chartVisible || userClicked) && (
          <View style={loaded ? styles.loaded : styles.invisible}>
            <ECharts onData={onFinishLoading()} option={chartOptions} />
          </View>
        )}
      </View>
    </View>
  );
};

export default PollChart;
