import {Pressable, Text, TouchableOpacity, View,} from "react-native";
import GlobalStyle from "../../../styles/GlobalStyle";
import {Backgroundstyle, Buttons, Primarycolor1, styles} from "../../../styles/Stylesheet";
import {React, useContext} from "react";
import {BoxLink} from "../../../styles/BoxLink";
import {AntDesign} from "@expo/vector-icons";
import {msg} from "@babel/core/lib/config/validation/option-assertions";
import { t, useLanguage} from "../../../Languages/LanguageHandler";
import {useNavigation} from "@react-navigation/native";
import { LoaderContext } from "../../../componets/LoaderContext";

export const VisitedUptainerStat = (value) => {
    const { currentLanguage } = useLanguage();
    const navigation = useNavigation();
    const { isLoading, setIsLoading } = useContext(LoaderContext);
    const data = value["value"];
    const location = data["uptainerName"];
    const address = data["uptainerStreet"];
    const handlePress = () => {
        navigation.navigate("StatsInfo");
    };

    return(
        <View style={GlobalStyle}>
            <View>
                <View>
                    <TouchableOpacity >
                        <View style={styles.boxlink}>
                            <View style={GlobalStyle.BodyWrapper}>
                                <TouchableOpacity onPress={() => {
                                    setIsLoading(true);
                                    navigation.navigate("UptainerDetails", {
                                    uptainerData: data,
                                    });
                                    }}>
                                <Text style={styles.menuItem_text}>{location} </Text>
                                <Text style={[styles.menuItem_text,{   fontFamily: "space-grotesk",fontSize: 15}]}>{address} </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.Icon_container}>
                                <AntDesign name="right" size={30} style={styles.menuItem_arrow} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={GlobalStyle}>
                    <Text style={[Buttons.main_button,{paddingTop: 9, height:40, width: "100%", color:"white"}]}>{data["itemsReused"]} {t('StatsPage.ItemsRecicled', currentLanguage)}</Text>
                </View>
                <View style={GlobalStyle}>
                    <Text style={[Backgroundstyle.informationScreens,{paddingTop: 9, height:40, marginTop:5, marginBottom:40, paddingLeft:10, width: "100%", color:Primarycolor1}]}>{data["savedCO2"]} kg {t('StatsPage.CO2Save', currentLanguage)}</Text>
                </View>
            </View>

            <View>

                    <BoxLink msg={t('StatsPage.Info', currentLanguage)} onPress={handlePress} style={GlobalStyle.BodyWrapper} />
            </View>
        </View>
    )
}
export default VisitedUptainerStat
