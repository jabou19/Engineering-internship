import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navigationbar from '../componets/Navigationbar';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {getItemsInUptainer, getProductById, getBrandById, getAllUptainers, getUptainersByLocation} from '../utils/Repo';
import { styles } from '../styles/Stylesheet';
import GlobalStyle from '../styles/GlobalStyle';
import ScrollViewComponent from '../componets/atoms/ScrollViewComponent';
import { LoaderContext } from '../componets/LoaderContext';
import LoadingScreen from '../componets/LoadingScreen';
import Uptainer from "../componets/Uptainer";
import SortSpecificUptainer from "./map/stationDetail/SortSpecificUptainer";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UptainerDetails = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [uptainerImageUrl, setUptainerImageUrl] = useState('');
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [refreshing, setRefreshing] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [sortedUptainers, setSortedUptainers] = useState([]);
  let uptainer = route.params.uptainerData || route.params;
  const [uptainersList, setUptainerList] = useState([]);

  const fetchData = async () => {
    try {
      // Assuming uptainer.location holds the location information
      const uptainerList = await getUptainersByLocation(uptainer.location);
      setUptainerList(uptainerList);
      setRefreshing(false);
    } catch (error) {
      console.log('Error:', error);
    }
  };


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const fetchItemList = async () => {
      // Fetch items in the uptainer
      const storage = getStorage();
      try {
        setIsLoading(true);
        const items = await getItemsInUptainer(uptainer.id);

        const updatedData = await Promise.all(
            items.map(async (item) => {
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
                console.log('Error while downloading image => ', error);
                return {
                  ...item,
                  imageUrl: 'https://via.placeholder.com/200x200',
                };
              }
            })
        );

        setData(updatedData);
        setIsLoading(false);
        setRefreshing(false);
      } catch (error) {
        console.log('Error while fetching items => ', error);
      }
    };

    const fetchUptainerImage = async () => {
      const storage = getStorage();
      try {
        const uptainerPathReference = ref(storage, uptainer.uptainerImage);
        const imageUrl = await getDownloadURL(uptainerPathReference);
        setUptainerImageUrl(imageUrl);
      } catch (error) {
        console.log('Error while getting Uptainer Image URL => ', error);
        setUptainerImageUrl('https://via.placeholder.com/200x200');
      }
    };

    fetchItemList();
    fetchUptainerImage();
  }, [uptainer, setIsLoading]);

  const uptainerList = userLocation ? sortedUptainers : uptainersList;

  return (
      <View style={styles.container}>
        {isLoading && <LoadingScreen isLoaderShow={isLoading} />}
        <ScrollViewComponent
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 10 }}
            refreshing={refreshing}
            onRefresh={onRefresh}>
          <TouchableOpacity
              style={style.backButton}
              onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" color="white" size={20} />
          </TouchableOpacity>
          <View>
            <ImageBackground
                style={style.detailsImage}
                source={{
                  uri: uptainerImageUrl,
                }}>
              <TouchableOpacity
                  onPress={() => navigation.navigate('Map')}
                  style={style.productLocation}>
                <Text style={style.productAddress}>
                  {uptainer.name} / {uptainer.location}
                </Text>
                <Ionicons name="chevron-forward" color="white" size={30} />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View
              style={{
                flexDirection: 'row',
                marginTop: 50,
                width: windowWidth,
                flexWrap: 'wrap',
                padding: 10,
              }}>
            {data?.map((cur, i) => (
                <TouchableOpacity
                    key={i}
                    style={{
                      marginLeft: 6,
                      marginBottom: 20,
                      marginRight: 20,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() =>
                        navigation.navigate('DetailView', {
                          itemDescription: cur?.itemDescription,
                          imageUrl: cur?.imageUrl,
                          productName: cur?.productName,
                          brandName: cur?.brandName,
                          uptainer,
                        })
                    }>
                  <Image
                      style={style.moreProductsImage}
                      source={{
                        uri: cur?.imageUrl,
                      }}
                  />
                  <Text
                      style={[
                        styles.bodyText,
                        {
                          fontWeight: '600',
                          width: windowWidth / 2.7,
                          marginTop: 5,
                        },
                      ]}>
                    {cur?.productName}
                  </Text>
                </TouchableOpacity>
            ))}
          </View>

          <View>
            {uptainerList.map((uptainer) => (
                <SortSpecificUptainer
                    key={uptainer.uptainerId}
                    uptainerData={uptainer}
                />
            ))}
          </View>
        </ScrollViewComponent>
        <Navigationbar navigation={navigation} />
      </View>
  );
};

export default UptainerDetails;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    backgroundColor: '#1c4b3d',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailsImage: {
    width: windowWidth / 1.1,
    height: windowHeight / 3,
  },
  productLocation: {
    width: windowWidth / 1.7,
    backgroundColor: '#1c4b3d',
    height: 75,
    position: 'absolute',
    bottom: -30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productAddress: {
    width: '70%',
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    padding: 10,
  },
  moreProductsImage: {
    width: windowWidth / 2.7,
    height: windowHeight / 6.4,
  },
});
