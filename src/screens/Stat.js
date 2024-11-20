import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  styles,
  Backgroundstyle,
  HeaderText,
  Buttons,
} from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import { useNavigation } from "@react-navigation/native";
import { t, useLanguage } from "../Languages/LanguageHandler";
import BackButton from "../componets/BackButton";
import GlobalStyle from "../styles/GlobalStyle";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the appropriate icon library
import StreetStat from "../componets/atoms/Stats/StreetStat";
import VisitedUptainerStat from "../componets/atoms/Stats/VisitedUptainerStat";
import Svg, { Path } from "react-native-svg";
import LightbulbIcon from "../componets/svg-components/LightbulbIcon";
import YourStats from "./YourStats";
import GreenBox from "../styles/GreenBox";
import ScrollViewComponent from "../componets/atoms/ScrollViewComponent";
import ChartForStats from "../componets/atoms/Stats/ChartForStats";
import { getAllItems, getAllUptainers, getProductById, getCurrentUser, getDraftFromUser, getAllProducts } from "../utils/Repo";
import { items } from "../utils/Testdata";


const Stat = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [userCurrent, setUserCurrent] = useState({});
  const [refreshing, setRefresh] = useState(false);
  const onRefresh = () => {

    setRefresh(true)
    setTimeout(() => { setRefresh(false) }, 1000)
  }

  const { currentLanguage } = useLanguage();
  let [data, setData] = useState({
    bestUptainer: {},
    allTakenItems: 0,
    todayTakenItems: 0,
    yesterdayTakenItems: 0,
    allTakenItemsMonth: {},
    top3Uptainers: {}
  });

  const allItems = async () => {
    // Load all items from database
    // const items = await getAllItems();
    // Load all Uptainers from database
    const allUptainers = await getAllUptainers();
    // Create variables for counting
    let allNumberTakenItems = 0;
    let todayNumberTakenItems = 0;
    let yesterdayNumberTakenItems = 0;

    //Date today
    const today = new Date();

    //Date yersterday
    const yesterday = new Date(today - 86400000);

    //Create a dictionary for counting reused items by month
    const allTakenItemsMonth = {};
    //Create all Uptainers in allUptainersStat
    const allUptainersStat = allUptainers.reduce((acc, uptainer) => {
      acc[uptainer.uptainerId] = {
        uptainerCity: uptainer.uptainerCity,
        uptainerName: uptainer.uptainerName,
        uptainerStreet: uptainer.uptainerStreet,
        uptainerId: uptainer.uptainerId,
        itemsReused: 0,
        savedCO2: 0,
        numberUsers: 0,
        uptainerDescription: uptainer.uptainerDescription,
        uptainerImage: uptainer.uptainerImage,
        uptainerLatitude: uptainer.uptainerLatitude,
        uptainerLongitude: uptainer.uptainerLongitude,
        uptainerQR: uptainer.uptainerQR,
        uptainerZip: uptainer.uptainerZip,
      };
      return acc;
    }, {});

    for (const item of items) {
      const itemUptainer = allUptainersStat[item["itemUptainer"]];
      //Counting how many times Uptainer was used for putting item
      if (itemUptainer) {
        if (item["itemUser"] == userCurrent["id"]) {
          itemUptainer["numberUsers"] += 1;
        }
      }
      //Filter items, which was taken
      if (item.itemTaken == true) {
        //Counting how many times Uptainer was used for taking item
        if (itemUptainer) {
          if (item["itemTakenUser"] == userCurrent["id"]) {
            itemUptainer["numberUsers"] += 1;
          }
          itemUptainer["itemsReused"] += 1;
          //Getting info about co2Footprint this item
          const productInfo = await getProductById(item["itemproduct"]);
          itemUptainer["savedCO2"] += productInfo["co2Footprint"];
        }
        allNumberTakenItems += 1;
        //Filter reused items, which have itemTakenDate. itemTakenDate should has format "YYYY-MM-DD" (like itemTakenDate: "2023-12-06")
        if (item.itemTakenDate) {
          const itemTakenDate = new Date(item.itemTakenDate);
          if (itemTakenDate.toLocaleDateString() == today.toLocaleDateString()) {
            todayNumberTakenItems += 1
          }
          if (itemTakenDate.toLocaleDateString() == yesterday.toLocaleDateString()) {
            yesterdayNumberTakenItems += 1
          }
          if (allTakenItemsMonth[itemTakenDate.getFullYear().toString() + "-" + (itemTakenDate.getMonth() + 1).toString()]) {
            allTakenItemsMonth[itemTakenDate.getFullYear().toString() + "-" + (itemTakenDate.getMonth() + 1).toString()] += 1
          }
          else {
            allTakenItemsMonth[itemTakenDate.getFullYear().toString() + "-" + (itemTakenDate.getMonth() + 1).toString()] = 1
          }
        }
      }
    }
    //Definition of the most popular Uptainer
    const bestUptainerId = Object.entries(allUptainersStat).reduce((acc, curr) => acc[1]["numberUsers"] > curr[1]["numberUsers"] ? acc : curr)[0];
    const bestUptainer = allUptainersStat[bestUptainerId];
    const mostAchievingUptainers = Object.entries(allUptainersStat)
      .map(([uptainerId, uptainer]) => ({
        uptainerId,
        uptainerName: uptainer.uptainerName,
        uptainerLocation: `${uptainer.uptainerStreet},${uptainer.uptainerCity}`,
        itemsReused: uptainer.itemsReused,
        Co2Savings: uptainer.savedCO2,
      }))
      .sort((a, b) => b.Co2Savings - a.Co2Savings);

    //Create result after counting reused items
    result = {
      allTakenItems: allNumberTakenItems,
      todayTakenItems: todayNumberTakenItems,
      yesterdayTakenItems: yesterdayNumberTakenItems,
      allTakenItemsMonth: allTakenItemsMonth, //{"2023-Dec": 1, "2023-Jul": 1, "2023-Nov": 1, "2023-Sep": 1}
      bestUptainer: bestUptainer,
      top3Uptainers: mostAchievingUptainers
    }
    //Print for checking
    // console.log(result)
    return result
  }

  useEffect(() => {
    async function fetchData() {
      const result = await allItems();
      setData(result)
      const userCurrent = await getCurrentUser();
      setUserCurrent(userCurrent);
      const products = await getAllProducts();
      setProducts(products);
    }
    fetchData()
  }, []);

  const handlePress = () => {
    navigation.goBack();
  };
  const [activeButton, setActiveButton] = useState("main"); // 'main' or 'secondary'
  const [co2Data, setCO2Data] = useState({
    todayCO2Saved: 0,
    yesterdayCO2Saved: 0,
    totalCO2Saved: 0,
  });
  useEffect(() => {
    updateCO2Savings();
  }, []);

  const updateCO2Savings = () => {
    const currentDate = new Date().toLocaleDateString();

    // Check if it's a new day
    if (currentDate !== co2Data.lastUpdateDate) {
      // Reset today's savings
      setCO2Data((prevData) => ({
        ...prevData,
        todayCO2Saved: 0,
        yesterdayCO2Saved: prevData.todayCO2Saved,
        lastUpdateDate: currentDate,
      }));
    }

    const todaySavings = calculateSavings('today');
    const yesterdaySavings = calculateSavings('yesterday');

    setCO2Data((prevData) => ({
      ...prevData,
      todayCO2Saved: prevData.todayCO2Saved + todaySavings,
      yesterdayCO2Saved: prevData.yesterdayCO2Saved + yesterdaySavings,
      totalCO2Saved: prevData.totalCO2Saved + todaySavings,
    }));
  };

  const calculateSavings = (type) => {
    const savings = products.reduce((acc, product) => {
      return acc + product.co2Footprint;
    }, 0);

    return savings;
  };

  const convertKgToTons = (kg) => {
    if (kg >= 1000) {
      return (kg / 1000).toFixed(2) + " t";
    } else {
      return kg + " kg";
    }
  };

  const co2EquivalentFact = 10;
  const co2SavedFact = 4;

  const calculateCO2Equivalent = (fact, kg) => {
    const equivalent = Math.round(fact * kg);
    const comparisonText = equivalent > 1 ? comparison + "s" : comparison; // Pluralize if necessary
    return `${equivalent} `;
  };

  const convertCO2Saved = (fact, kg) => {
    const threshold = 100;
    if (kg >= threshold) {
      return Math.round(kg / threshold) + " ";
    } else {
      return kg + " " + comparison;
    }
  };

  const todayEquivalent = calculateCO2Equivalent(co2EquivalentFact, co2Data.todayCO2Saved);
  const todaySavedConverted = convertCO2Saved(co2SavedFact, co2Data.todayCO2Saved);

  const Calculate_co2_Equivalent = (co2_pers, co2_total, conv_factor, comparison) => {
    console.log(
      "10 kg of CO2 is equivalent to approximately",
      Math.round(10 * conv_factor),
      comparison
    );

    console.log(
      "Your personal CO2 contribution is equivalent to approximately",
      Math.round(co2_pers * conv_factor),
      comparison
    );
    console.log(
      "So",
      co2_total,
      "kg would amount to approximately",
      Math.round(co2_total * conv_factor),
      comparison
    );

    const calc_pers = co2_pers * conv_factor;
    const calc_total = co2_total * conv_factor;

    return {
      personalEquivalent: Math.round(calc_pers),
      totalEquivalent: Math.round(calc_total),
    };
  };

  const co2_pers = 10;
  const co2_total = 100;
  const conv_factor = 4 / 10;
  const comparison = "loads of washing and drying.";

  const { personalEquivalent, totalEquivalent } = Calculate_co2_Equivalent(
    co2_pers,
    co2_total,
    conv_factor,
    comparison
  );

  const handlePress1 = (button) => {
    setActiveButton(button);
  };

  return (
    <View
      style={[
        Backgroundstyle.interactive_screens,
        GlobalStyle.BodyWrapper,
        { flex: 1, justifyContent: "center" },
      ]}
    >
      <SafeAreaView>
        <ScrollViewComponent refreshing={refreshing} onRefresh={onRefresh}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-start",
            }}
          >
            <BackButton onPress={handlePress} />
            <Text
              style={[
                HeaderText.Header,
                { fontFamily: "space-grotesk-Medium" },
              ]}
            >
              <Text>{t("StatsPage.Header", currentLanguage)}</Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View style={{ width: "48%" }}>
              <TouchableOpacity
                style={[
                  activeButton === "main"
                    ? Buttons.main_button
                    : Buttons.secondary_button,
                ]}
                onPress={() => handlePress1("main")}
              >
                <Text
                  style={
                    activeButton === "main"
                      ? Buttons.main_buttonText
                      : Buttons.secondary_buttonText
                  }
                >
                  {t("StatsPage.MainButton", currentLanguage)}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "48%" }}>
              <TouchableOpacity
                style={[
                  activeButton === "secondary"
                    ? Buttons.main_button
                    : Buttons.secondary_button,
                ]}
                onPress={() => handlePress1("secondary")}
              >
                <Text
                  style={
                    activeButton === "secondary"
                      ? Buttons.main_buttonText
                      : Buttons.secondary_buttonText
                  }
                >
                  {t("StatsPage.SecondaryButton", currentLanguage)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {activeButton === "main" ? (
            <View style={{ justifyContent: "space-between", marginTop: 10 }}>
              <View style={{ marginTop: 15, marginBottom: 10 }}>
                <Text
                  style={[
                    styles.article_text,
                    { fontWeight: "bold", fontSize: 18 },
                  ]}
                >
                  {t("StatsPage.AmountReduced", currentLanguage)}
                </Text>
              </View>
              <View>
                <View>
                  <View>
                    <GreenBox
                      msg={t("StatsPage.SoFar", currentLanguage)}
                      data={data.todayTakenItems}
                      secondMsg={t("StatsPage.Yesterday", currentLanguage)}
                      secondData={data.yesterdayTakenItems}
                    />
                  </View>
                  <View>
                    <GreenBox
                      msg={t("StatsPage.InTotal", currentLanguage)}
                      data={data.allTakenItems}
                    />
                  </View>
                </View>
              </View>
              <View style={[{ height: 285 }]}>
                <ChartForStats value={data["allTakenItemsMonth"]} refreshing={refreshing} />
              </View>
              <View style={{ marginTop: 2, marginBottom: 20 }}>
                <Text
                  style={[
                    styles.article_text,
                    { fontWeight: "bold", fontSize: 18 },
                  ]}
                >
                  {t("StatsPage.AmountCO2", currentLanguage)}
                </Text>
              </View>
              <View>
                <View>
                  <GreenBox
                    msg={t("StatsPage.SoFar", currentLanguage)}
                    data={convertKgToTons(co2Data.todayCO2Saved)}
                    secondMsg={t("StatsPage.Yesterday", currentLanguage)}
                    secondData={convertKgToTons(co2Data.yesterdayCO2Saved)}
                  />
                </View>
                <View>
                  <GreenBox
                    msg={t("StatsPage.InTotal", currentLanguage)}
                    data={convertKgToTons(co2Data.totalCO2Saved)}
                  />
                </View>
              </View>
              <View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      marginTop: 20,
                      marginBottom: 3,
                      marginRight: "4%",
                    },
                  ]}
                >
                  <LightbulbIcon />
                  <Text style={[styles.paragraph_text, { marginLeft: 5 }]}> {t('StatsPage.kgCO2', currentLanguage)}:{todayEquivalent}</Text>
                </View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      marginTop: 5,
                      marginBottom: 3,
                      marginRight: "4%",
                    },
                  ]}
                >
                  <LightbulbIcon />
                  <Text style={[styles.paragraph_text, { marginLeft: 5 }]}> {t('StatsPage.Amount', currentLanguage)}: {todaySavedConverted} </Text>
                </View>
              </View>
              <View style={[{ alignContent: "center", marginTop: 30 }]}>
                <Text style={styles.menuItem_text}>
                  {t("StatsPage.BestAcheieve", currentLanguage)}
                </Text>
              </View>
              <StreetStat data={data.top3Uptainers[0]} pos={100} />
              <StreetStat data={data.top3Uptainers[1]} pos={75}/>
              <StreetStat data={data.top3Uptainers[2]} pos={50}/>
              <View style={[{ alignContent: "center", marginTop: 30 }]}>
                <Text style={[styles.menuItem_text, { marginBottom: 10 }]}>
                  {t("StatsPage.MostVisitedUptainer", currentLanguage)}
                </Text>
                <VisitedUptainerStat navigation={navigation} value={data["bestUptainer"]} />
              </View>
            </View>
          ) : (
            <YourStats user={userCurrent} products = { products }/>
          )}
        </ScrollViewComponent>
      </SafeAreaView>
      <Navigationbar navigation={navigation} />
    </View>
  );
};

export default Stat;