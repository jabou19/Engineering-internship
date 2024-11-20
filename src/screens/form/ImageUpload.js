import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import { Primarycolor1, styles as stylesGlobal } from "../../styles/Stylesheet";
import CustomInput from "../../componets/atoms/CustomInput";
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from "@react-navigation/core";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ImageUpload = ({ onImageSelect,data}) => {
  const [image, setImage] = useState(data || null);
  const [hasPermission, setHasPermission] = useState(null);
  const imagePickerBottomSheetRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);
  const { currentLanguage } = useLanguage(); // Move the hook inside the functional component
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      //   aspect: [4, 3],
      quality: 1,
    });
    if (onImageSelect) {
      onImageSelect(result.assets[0]);
    }
    if (!result.canceled) {
      if (result.assets[0]?.type != "video") {
        setImage(result.assets[0].uri);
        imagePickerBottomSheetRef.current.close();
      }
    }
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      //   aspect: [4, 3],
      quality: 1,
    });
    if (onImageSelect) {
      onImageSelect(result.assets[0]);
    }
    if (!result.canceled) {
      if (result.assets[0]?.type != "video") {
        setImage(result.assets[0].uri);
        imagePickerBottomSheetRef.current.close();
      }
    }
  };
  return (
    <CustomInput optionalMarginBottom>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={[stylesGlobal.formLabel, { marginLeft: 0 }]}>
      {t("ImageUpload.chooseImage", currentLanguage)}
    </Text>
    <Text style={[stylesGlobal.optionalText,{marginLeft: 5, marginBottom: 5 }]}>
    ({t("AccountSettingsScreen.Optional", currentLanguage)})
    </Text>
    </View>
      <View>
        {!image ? (
          <TouchableOpacity
            onPress={() => {
              imagePickerBottomSheetRef.current.open();
            }}
            style={UploadImageStyle.UploadImageContainer}
          >
            <View style={UploadImageStyle.UploadDescription}>
              <Ionicons name="images-outline" size={30} color="#8EA59E"/>

              <Text style={[UploadImageStyle.uploadText, {color: "#8EA59E"}]}>
                {t("UpdroppForm.uploadText", currentLanguage)}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View>
            <Ionicons
              onPress={() => {
                setImage(null);
              }}
              name="close-outline"
              size={30}
              color="white"
              style={UploadImageStyle.cancelIcon}
            />
            <Image source={{ uri: image }} style={UploadImageStyle.imageSize} />
          </View>
        )}
      </View>

      <RBSheet
        ref={imagePickerBottomSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={windowHeight / 3.1}
        render
        customStyles={{
          wrapper: {
            backgroundColor: "#000000b3",
          },
          draggableIcon: {
            backgroundColor: "#ccc",
          },
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: "white",
          },
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <Text style={UploadImageStyle.galleryBottomText}>
            {t("UpdroppForm.chooseAction", currentLanguage)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignContent: "center",
            alignItems: "center",
            // alignSelf: "center",
            padding: 20,
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={openCamera}
          >
            <Ionicons
              style={UploadImageStyle.icon}
              name="camera-outline"
              color="black"
              size={40}
            />
            <Text style={UploadImageStyle.actionText}>
              {t("UpdroppForm.camera", currentLanguage)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={pickImage}
          >
            <Ionicons
              style={UploadImageStyle.icon}
              name="images-outline"
              color={Primarycolor1}
              size={40}
            />
            <Text style={UploadImageStyle.actionText}>
              {t("UpdroppForm.gallery", currentLanguage)}
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </CustomInput>
  );
};

export default ImageUpload;

const UploadImageStyle = StyleSheet.create({
  UploadImageContainer: {
    padding: windowHeight / 12,
    // backgroundColor: "red",
    borderWidth: 3,
    borderColor: Primarycolor1,
    height: windowHeight / 4.5,
  },
  UploadDescription: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  imageSize: {
    padding: 50,
    // backgroundColor: "red",
    borderWidth: 3,
    borderColor: Primarycolor1,
    height: windowHeight / 4.5,
  },
  cancelIcon: {
    position: "absolute",
    zIndex: 999,
    // top: 20,
    opacity: 0.7,
    backgroundColor: Primarycolor1,
  },
  uploadText: {
    marginLeft: 10,
    color: Primarycolor1,
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "space-grotesk"
  },
  galleryBottomText: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
    marginLeft: 17,
    marginTop: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
});
