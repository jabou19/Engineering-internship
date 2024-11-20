
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {StyleSheet, View, Alert, TouchableOpacity, Text, ScrollView, ActivityIndicator, Modal} from 'react-native';
import SearchBox from '../../../componets/SearchBox'
import CustomCallout from './CustomCallout';
import GlobalStyle from "../../../styles/GlobalStyle";
import {
    dropdownStyles,
    Primarycolor1,
    Primarycolor2,
    Primarycolor3,
    Primarycolor4,
    styles
} from "../../../styles/Stylesheet";
import * as Location from 'expo-location';
import {t, useLanguage} from "../../../Languages/LanguageHandler";
import { calculateDistance } from '../../../utils/uptainersUtils';
import SearchedLocation from './SearchedLocation';



const stationData = [
    {
        uptainerName: "Det Bæredygtige Forsamlingshus",
        uptainerQR: "https://www.google.com",
        uptainerStreet: "Stockflethsvej 2",
        uptainerZip: "2000",
        uptainerCity: "Frederiksberg",
        uptainerImage: "UPT1.jpg",
        uptainerDescription: "I nærheden af Det Bæredygtige Forsamlingshus",
        uptainerLat: "55.686256",
        uptainerLong: "12.519641697795900",
    },
    {
        uptainerName: "KU Lighthouse",
        uptainerQR: "https://www.google.com",
        uptainerStreet: "Tagensvej 16A",
        uptainerZip: "2200",
        uptainerCity: "Nørrebro",
        uptainerImage: "UPT2.jpg",
        uptainerDescription: "I nærheden af KU Lighthouse",
        uptainerLat: "55.697947",
        uptainerLong: "12.560119055467000",
    },
    {
        uptainerName: "COOP 365",
        uptainerQR: "https://www.google.com",
        uptainerStreet: "Vigerslev Allé 124",
        uptainerZip: "2500",
        uptainerCity: "Valby",
        uptainerImage: "UPT3.jpg",
        uptainerDescription: "I nærheden af COOP 365",
        uptainerLat: "55.661317",
        uptainerLong: "12.50583269168790",
    },
  ];

const StationsMap = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredLocations, setFilteredLocations] = useState(stationData);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const mapRef = useRef();
    const isLoaderShow = false;
    const { currentLanguage } = useLanguage();
    const markersRef = useRef({});



    useEffect(() => {
        const getUserLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission to access location was denied');
                    setLoading(false);
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                setUserLocation(location.coords);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching location:', error);
                Alert.alert('Error fetching location. Please try again.');
                setLoading(false);
            }
        };

        getUserLocation();
    }, []);

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(loadingTimer);
    }, []);

    if (loading) {
        return (

                <View style={styles.MainContainer}>
                    <ActivityIndicator size='large' color='black' />
                </View>
        );
    }

    const userLatitude = userLocation?.latitude || 0;
    const userLongitude = userLocation?.longitude || 0;

    const region = {
        latitude: 55.6761,
        longitude: 12.5683,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const sortLocationsByDistance = () => {
        const sortedLocations = [...filteredLocations].sort((a, b) => {
            const distanceA = calculateDistance(
                { latitude: userLatitude, longitude: userLongitude },
                { latitude: parseFloat(a.uptainerLat), longitude: parseFloat(a.uptainerLong) }
            );
            const distanceB = calculateDistance(
                { latitude: userLatitude, longitude: userLongitude },
                { latitude: parseFloat(b.uptainerLat), longitude: parseFloat(b.uptainerLong) }
            )
            return parseFloat(distanceA) - parseFloat(distanceB);
        });

        return sortedLocations;
    };

    const openStationPage = (location) => {
        navigation.navigate('StationDetails', { stationDetail: location });
        console.log('onPress', location);
    };

    const handleSearch = (text) => {
        setSearchText(text);

        if (text === '') {
            setFilteredLocations(stationData);
            return;
        }

        const filtered = stationData.filter(
            (location) =>
                location.uptainerName.toLowerCase().includes(text.toLowerCase()) ||
                location.uptainerStreet.toLowerCase().includes(text.toLowerCase()) ||
                location.uptainerCity.toLowerCase().includes(text.toLowerCase()) ||
                location.uptainerZip.includes(text)
        );

        setFilteredLocations(filtered);

        if (filtered.length === 0) {
            setFilteredLocations([]);
        }
    };

    const sortedLocations = sortLocationsByDistance();

    const selectStation = (location) => {
        mapRef.current.animateToRegion({
            latitude: parseFloat(location.uptainerLat),
            longitude: parseFloat(location.uptainerLong),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });

        setSearchText(location.uptainerName);
        setShowSearchResults(false);

        const selectedMarkerRef = markersRef.current[location.uptainerName];
        if (selectedMarkerRef) {
            selectedMarkerRef.showCallout();
        }
    };



    const lastIndex = sortedLocations.length - 1;

    const toggleSearchResults = () => {
        setShowSearchResults(true);
    };
    return (
        <View style={styles1.container}>
            <MapView
                ref={mapRef}
                style={styles1.map}
                initialRegion={region}
                showsUserLocation={true}
            >
                {filteredLocations.map((location) => (
                    <Marker
                        ref={(marker) => (markersRef.current[location.uptainerName] = marker)}
                        key={location.uptainerName}
                        coordinate={{
                            latitude: parseFloat(location.uptainerLat),
                            longitude: parseFloat(location.uptainerLong),
                        }}
                        image={require('../../../../assets/images/marker_bg.jpg')}
                    >
                        <Callout tooltip={false} onPress={() => openStationPage(location)}>
                            <CustomCallout currentLocation={location} />
                        </Callout>
                    </Marker>

                ))}
            </MapView>

            <View style={[GlobalStyle.BodyWrapper, styles1.searchBox]} onTouchStart={toggleSearchResults}>
                <SearchBox
                    onChangeText={handleSearch}
                    value={searchText}
                    placeholderText={'SearchField.mapPlaceholder'}
                />
            </View>

            {/* List of sorted locations */}
            {showSearchResults && (
            <ScrollView style={[GlobalStyle.BodyWrapper, dropdownStyles.dropdownContainer2]}>
                {filteredLocations.length > 0 ? 
                
                (userLatitude === 0 && userLongitude === 0) ? (
                    filteredLocations.map((location, index) =>(
                        <SearchedLocation
                        location={location}
                        onPress={() => {
                            selectStation(location);
                        }}
                        index={index}
                        styling={[
                            dropdownStyles.dropdownListItem2,
                            index === lastIndex ? styles1.lastItem : null,
                        ]}
                        userLatitude={null}
                        userLongitude={null}
                    >
                    </SearchedLocation>
                    ))
                )
                :(
                    sortedLocations.map((location, index) => (
                    <SearchedLocation
                        location={location}
                        onPress={() => {
                            selectStation(location);
                        }}
                        index={index}
                        styling={[
                            dropdownStyles.dropdownListItem2,
                            index === lastIndex ? styles1.lastItem : null,
                        ]}
                        userLatitude={userLatitude}
                        userLongitude={userLongitude}
                    >
                    </SearchedLocation>

                ))
                ) : (
                <View style={{ borderColor: Primarycolor1,
                    width: '100%',
                    borderWidth:3, backgroundColor:"white"}}>
                    <Text style={{marginBottom:50, maxHeight:50, marginTop:15, textAlign:"center", color:Primarycolor4}}>{t("StationsScreen.NoUptainers", currentLanguage)}</Text>
                </View>
                )}
            </ScrollView>
            )}
        </View>
    );

};

const styles1 = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    searchBox: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 50,
        width: '100%',
    },
    stationInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    stationName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
        color: Primarycolor1,
    },
    addressInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    stationAddress: {
        fontSize: 12,
        color:Primarycolor1,
        width:"75%"
    },

    distance: {
        width:"25%",
        fontSize: 12,
        color: Primarycolor1,
        alignItems:"center"
    },
    lastItem: {
        borderBottomWidth: 3,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default StationsMap;


