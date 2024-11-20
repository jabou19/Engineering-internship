import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import GlobalStyle from "../../styles/GlobalStyle";
import {styles} from "../../styles/Stylesheet";
import StatusBarComponent from "../../componets/atoms/StatusBarComponent";
import ScrollViewComponent from "../../componets/atoms/ScrollViewComponent";
import ArticleSlider from "./ArticleSlider";
import BackButton from "../../componets/BackButton";
import {useNavigation} from "@react-navigation/native";
import {Buttons, HeaderText, Primarycolor1} from "../../styles/Stylesheet";
import Navigationbar from "../../componets/Navigationbar";
import {t, useLanguage} from "../../Languages/LanguageHandler";

const ArticlePage = ({ route }) => {
  const { title, content } = route.params;
  const screenWidth = Dimensions.get("window").width;
  const [imgHeight, setImgHeight] = useState(0);
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage();
  const handlePress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    // Calculate image height based on aspect ratio
    const source = require("../../../assets/images/cph.jpg");
    const { width, height } = Image.resolveAssetSource(source);
    const aspectRatio = height / width;
    setImgHeight(screenWidth * aspectRatio);
  }, []);

  return (
      <StatusBarComponent>
        <ScrollViewComponent>
          <View style={styles1.container}>
            <View style={styles1.backButtonContainer}>
              <BackButton onPress={handlePress}/>
            </View>
            <View>
              <Image
                  source={require("../../../assets/images/cph.jpg")}
                  style={{ width: screenWidth, right:23, height: imgHeight, marginLeft:"1%", marginRight:"1%", }}
                  resizeMode="contain"
              />
            </View>
            <Text style={styles1.writtenPlaceholder}>{t('ArticleScreen.Written',currentLanguage)}</Text>
            <Text style={HeaderText.Header}>{title}</Text>
            {/*{content.map((paragraph, index) => (*/}
            {/*    <Text key={index} style={styles.content}>*/}
            {/*      {"  " + paragraph}*/}
            {/*    </Text>*/}
            {/*))}*/}
            <Text style={styles.article_text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam aspernatur commodi cumque cupiditate eaque earum eum expedita laudantium libero magnam minima, mollitia necessitatibus obcaecati perferendis, quis reiciendis suscipit temporibus.</Text>
          <Text style={styles1.writtenPlaceholder1}>{t('ArticleScreen.Subheadline',currentLanguage)}</Text>
            <Text style={styles.article_text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam aut doloribus ducimus esse exercitationem fuga hic illo inventore ipsa ipsum iusto molestiae nihil, non odio praesentium similique ullam voluptas!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid deserunt dolores dolorum incidunt laboriosam natus odio officia quia quisquam sit. Atque fuga magni nam neque quae. Error eum illo sint.</Text>
            <Text style={[styles.menuItem_text, { marginTop: 15 }]}>
              {t("ArticleSlider.header", currentLanguage)}
            </Text>
            <ArticleSlider/>
        </View>

        </ScrollViewComponent>
        <Navigationbar/>
      </StatusBarComponent>
  );
};

const styles1 = StyleSheet.create({
  container: {
    marginHorizontal: 20, // Adjust the margin as needed
  },
  backButtonContainer: {
    position: "absolute",
    top: 20, // Adjust this value to position the back button vertically
   // left: 10, // Adjust this value to position the back button horizontally
    zIndex: 2, // Ensure the back button appears above other content
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },
  content: {
    marginTop: 10,
    fontSize: 16,
  },
  writtenPlaceholder1:{
    fontWeight:"bold",
    marginTop:10,
    marginBottom: 10,
    color: Primarycolor1,
    fontSize: 16,
    fontFamily: "space-grotesk-Medium",
  },

  writtenPlaceholder:{
    marginTop:10,
    marginBottom: 10,
    color: Primarycolor1,
    fontSize: 15,
    fontFamily: "space-grotesk-Medium",
  }
});

export default ArticlePage;
