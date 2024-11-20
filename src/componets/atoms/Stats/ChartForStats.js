
import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";
import { Primarycolor1 } from "../../../styles/Stylesheet";
import {t, useLanguage} from "../../../Languages/LanguageHandler";

const ChartForStats = ({value, refreshing}) => {
    const chartRef = useRef(null);
    const {currentLanguage}=useLanguage();
    // Number month for statistic
    const numberMonth = 10;
    // Today Date
    const now = new Date();
    // Month name
    const monthsName = [
        "Jan", "Feb", "Mar", "Apr", t("months.may", currentLanguage), "Jun", "Jul", "Aug", "Sep", t("months.October", currentLanguage), "Nov", "Dec"];
    
    
    const retreiveChartOptions = () => {
            // Create array for statistics
        const monthlyData = [];
        const months = [];
        // Props
        const data = value
        for(let i = numberMonth; i > 0; i --){
            // Getting previous month
            let nextDate = new Date(now.getFullYear(), now.getMonth() - i);
            // Adding name of month
            months.push(monthsName[nextDate.getMonth()]);
            if(data[nextDate.getFullYear().toString() + "-" + (nextDate.getMonth() + 1).toString()]){
                // Adding statistic in this month
                monthlyData.push(data[nextDate.getFullYear().toString() + "-" + (nextDate.getMonth() + 1).toString()])
            }
            else{
                // Adding 0 in this month
                monthlyData.push(0);
            }
        }
    
        // Set initial chart options
        return createChartOptions(months, monthlyData);
        
    }

    const options = retreiveChartOptions()
    useEffect(()=>{
        if(refreshing || value){
            const newOptions = retreiveChartOptions()
            chartRef.current.setOption(newOptions)
            console.log('chart data retrieved')
        }
    }, [value, refreshing])

    // Set options on the chart
    useRef(() => {
        chartRef.current.setOption(options);
    }, []);

    // on refresh update into chart
    useEffect(()=>{
        if(refreshing){ 
            const newOptions = retreiveChartOptions()
            chartRef.current.setOption(newOptions);
        }
        console.log('updated')
    }, [refreshing])

    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <ECharts ref={chartRef} option={options} />
            </View>
        </View>
    );
};

const createChartOptions = (months, data) => ({
    xAxis: {
        type: "category",
        data: months,
        axisLabel: {
            interval: 0, // Display all labels
           /* rotate: 45, // Rotate labels */
            textStyle: {
                fontSize: 13, // Adjust font size as needed
               /* fontWeight: 'bold'*/ // Make text bold
            }
        },
        axisTick: {
            alignWithLabel: true
        },
        itemStyle: {
            color: Primarycolor1,
        },
    },
    yAxis: {
        type: "value",
        itemStyle: {
            color: Primarycolor1,
        },
    },
    series: [
        {
            data: data,
            type: "bar",
            itemStyle: {
                color: Primarycolor1,
            },
        },
    ],
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chartContainer: {
        height: 300,
        width: "100%",
    },
});

export default ChartForStats;
