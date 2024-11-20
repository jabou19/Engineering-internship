import {
  Dimensions,
  Image,
  Pressable, ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Buttons, Primarycolor1 } from "../styles/Stylesheet";
import { t, useLanguage } from "../Languages/LanguageHandler";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DraftCard = ({
  props,
  navigation,
  onPress,
  onCancelPress,
  onDraftPress,
}) => {
  const { currentLanguage, setLanguage } = useLanguage();
  console.log("propsss", props);
  //below we used the props params to display
  return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity
              style={styles.draftCard}
              activeOpacity={0.8}
              onPress={onDraftPress}
          >
            <TouchableOpacity style={styles.cancelIconContainer}>
              <Ionicons
                  onPress={onCancelPress}
                  name="close-outline"
                  size={30}
                  color="white"
                  style={styles.cancelIcon}
              />
            </TouchableOpacity>

            <Image
                source={{ uri: props.imageUrl }}
                style={[styles.draftImage, { height: "auto"}]}
            />
            <View style={styles.draftContent}>
              <Text style={styles.product}>{props.product?.productName}</Text>
              <Text style={styles.category}>{props.category?.categoryName}</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.brandModelContainer}>
                  <Text style={styles.brand} numberOfLines={2} ellipsizeMode="tail">
                    {props.brand?.brandName}
                    {props.model?.modelName ? "," : ""}
                  </Text>
                  {props.model?.modelName && (
                      <Text
                          style={[styles.brand, { marginLeft: 2 }]}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                      >
                        {props.model?.modelName}
                      </Text>
                  )}
                </View>
              </View>
              <Text
                  style={[
                    styles.description,
                    { fontStyle: "normal", marginBottom: 10, fontWeight: "700" },
                  ]}
              >
                {props.itemcondition}
              </Text>
              <Text style={styles.description}>{props.itemDescription}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <View style={[styles.spacer, { width: windowWidth / 2.3 }]} />
          <Pressable onPress={onPress} style={[Buttons.main_button, styles.button, { width: windowWidth / 1.2 }]}>
            <Text style={Buttons.main_buttonText}>
              {t("UpdroppForm.scanButton", currentLanguage)}
            </Text>
          </Pressable>
          <View style={[styles.spacer, { width: windowWidth / 2.3 }]} />
        </View>
      </View>
  );
};

export default DraftCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  draftCard: {
    width: windowWidth / 1.2,
    marginVertical: 10,
    marginHorizontal: '5%',
    borderWidth: 3,
    borderColor: Primarycolor1,
    flexDirection: "row",
    overflow: 'hidden',
  },

  draftContent: {
    padding: 20,
    width: windowWidth / 2.4,
  },
  draftImage: {
    width: windowWidth / 2.4,
  },
  product: {
    fontWeight: "700",
    fontSize: 20,
    color: Primarycolor1,
    marginBottom: 10,
  },
  category: {
    fontWeight: "500",
    fontSize: 16,
    color: Primarycolor1,
    marginBottom: 10,
  },
  brand: {
    fontWeight: "500",
    fontSize: 17,
    color: Primarycolor1,
    marginBottom: 10,

  },
  brandModelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: windowWidth / 2.4,
  },
  description: {
    fontSize: 14,
    color: Primarycolor1,
    fontStyle: "italic",
    marginBottom: 10,
  },
  cancelIconContainer: {
    position: "absolute",
    zIndex: 999,
    right: 0,
    backgroundColor: Primarycolor1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    alignSelf: "center",
  },
  spacer: {
    flex: 1,
  },
});