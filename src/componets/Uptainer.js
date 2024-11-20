import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { styles, Primarycolor1 } from "../styles/Stylesheet";
import { React, useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  getItemsInUptainer,
  getProductById,
  getBrandById,
} from "../utils/Repo";
import { LoaderContext } from "../componets/LoaderContext";
import { calculateDistance } from "../utils/uptainersUtils";

const Uptainer = ({ uptainerData, userLocation }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    const fetchItemList = async () => {
      const storage = getStorage();
      try {
        const items = await getItemsInUptainer(uptainerData.uptainerId);

        const updatedData = await Promise.all(
          items.map(async (item) => {
            if (!item.itemTaken) {
              const pathReference = ref(storage, item.itemImage);
              const product = await getProductById(item.itemproduct);
              const brand = await getBrandById(item.itemBrand);

              try {
                const url = await getDownloadURL(pathReference);
                return {
                  ...item,
                  imageUrl: url,
                  productName: product.productName,
                  brandName: brand.brandName,
                };
              } catch (error) {
                console.log("Error while downloading image => ", error);
                return {
                  ...item,
                  imageUrl: "https://via.placeholder.com/200x200",
                };
              }
            } else {
              return null;
            }
          })
        );

        const doubleData = [...updatedData];
        setData(doubleData);

        const filteredData = updatedData.filter((item) => item !== null);
        setData(filteredData);
      } catch (error) {
        console.log("Error while fetching items => ", error);
      }
    };

    fetchItemList();
  }, []);

  const pairedData = [];
  for (let i = 0; i < data.length; i += 2) {
    pairedData.push([data[i], data[i + 1]]);
  }

  return (
    <View style={{ marginVertical: 10 }}>
      <TouchableOpacity
        onPress={() => {
          setIsLoading(true);
          navigation.navigate("UptainerDetails", {
            uptainerData: uptainerData,
          });
        }}
      >
        <Text style={styles.menuItem_text}>{uptainerData.uptainerName}</Text>
        <View style={styling.details}>
          <Text style={{ fontSize: 18, color: Primarycolor1 }}>
            {uptainerData.uptainerStreet}
          </Text>
          {userLocation && (
          <Text style={styling.distance}>
            {calculateDistance({ latitude: userLocation.latitude, longitude: userLocation.longitude },
            { latitude: parseFloat(uptainerData.uptainerLatitude), longitude: parseFloat(uptainerData.uptainerLongitude)})} km</Text>
          )}
        </View>
      </TouchableOpacity>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={pairedData}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginBottom: 5, marginTop: 5 }}
        renderItem={({ item }) => (
          <View>
            {/* First Row */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailView", {
                  data: item[0]?.itemId,
                  itemDescription: item[0]?.itemDescription,
                  brandName: item[0]?.brandName,
                  productName: item[0]?.productName,
                  imageUrl: item[0]?.imageUrl,
                  uptainer: uptainerData,
                })
              }
            >
              <View style={styling.item}>
                <Image
                  source={{ uri: item[0]?.imageUrl }}
                  style={styling.image}
                />
              </View>
            </TouchableOpacity>
            {/* Second Row */}
            {item[1] && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DetailView", {
                    data: item[1]?.itemId,
                    itemDescription: item[1]?.itemDescription,
                    brandName: item[1]?.brandName,
                    productName: item[1]?.productName,
                    imageUrl: item[1]?.imageUrl,
                    uptainer: uptainerData,
                  })
                }
              >
                <View style={styling.item}>
                  <Image
                    source={{ uri: item[1]?.imageUrl }}
                    style={styling.image}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styling = StyleSheet.create({
  item: {
    width: 110, // Set the width of each item
    height: 110,
    margin: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  distance: {
    fontSize: 12,
    color: Primarycolor1, 
    marginTop: 5
  }
});

export default Uptainer;
