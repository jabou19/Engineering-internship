import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Primarycolor1 } from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { styles } from "../../styles/Stylesheet";

const windowWidth = Dimensions.get("window").width;

const ArticleSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userScrolling, setUserScrolling] = useState(false);
  const flatListRef = useRef(null);
  const { currentLanguage } = useLanguage();


  const handleArticleClick = (article) => {
    //todo in the future, add the navigation to specific article.
    //Example: navigation.navigate("ArticleDetail", { article });
  };

  //todo replace static data with actual one
  const staticArticles = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet, consec.",
      image: require("../../../assets/images/cph.jpg"),
    },
    {
      id: 2,
      title: "Title2",
      image: require("../../../assets/images/updropp.png"),
    },
    {
      id: 3,
      title: "Title3",
      image: require("../../../assets/images/cph.jpg"),
    },
  ];

  const handlePageChange = (index) => {
    setActiveIndex(index);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!userScrolling) {
        let newIndex = activeIndex + 1;
        if (newIndex >= staticArticles.length) {
          newIndex = 0;
        }
        handlePageChange(newIndex);
      }
    }, 3500);

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex, userScrolling]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleArticleClick(item)}>
      <View style={Slidestyles.slide}>
        <Image source={item.image} style={Slidestyles.image} />
        <View style={Slidestyles.overlay} />
        <Text style={Slidestyles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
      <View style={Slidestyles.container}>

        <FlatList
          ref={flatListRef}
          data={staticArticles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={() => {
            setUserScrolling(true);
          }}
          onScrollEndDrag={() => {
            setUserScrolling(false);
          }}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.floor(
              event.nativeEvent.contentOffset.x / windowWidth
            );
            handlePageChange(newIndex);
          }}
        />
        <View style={Slidestyles.indicatorContainer}>
          {staticArticles.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                Slidestyles.indicator,
                index === activeIndex && Slidestyles.activeIndicator,
              ]}
              onPress={() => handlePageChange(index)}
            />
          ))}
        </View>
      </View>
  );
};

const Slidestyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: windowWidth,
    height: 120,
    position: "relative",
    marginTop: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 128, 0, 0.2)",
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    position: "absolute",
    textAlign: "left",
    justifyContent: "center",
    maxWidth: 230,
    top: 25,
    bottom: 20,
    left: 20,
  },
  indicatorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    bottom: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 3,
    borderWidth: 2.0,
    borderColor: Primarycolor1,
  },
  activeIndicator: {
    backgroundColor: "#ffffff",
  },
});

export default ArticleSlider;
