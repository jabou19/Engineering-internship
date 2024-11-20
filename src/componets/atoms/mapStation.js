/**
 * MapView component
 * where all map components are, they're intertwined so it's not easily separetable.
 * ChooseStation gets and sets all markers, sorts em and calculates distance
 * in the render par there are 3 parts
 * 1st part: mapview where all markers are shown
 * 2nd part: List of all markers sorted by distance from you
 * 3rd part: button that submits the item
 * **/

import React, { useEffect, useState } from "react";
import { FlatList, ToastAndroid, View } from "react-native";
import * as Location from "expo-location";

import { Button, ListItem } from "react-native-elements";

// Directions API, that we'll test later on
// can't be used as of now, as you'd need to pay to use this API,
// if this package, a Google API key and the code in mapview then it should just work

// import MapViewDirections from 'react-native-maps-directions';

import { styles, elementsStyles } from "../../../src/styles/Stylesheet";
import {
  getCountryEst,
  getSpecificItem,
  database,
} from "../../../src/utils/Database";
import MapView, { Marker } from "react-native-maps";

//
// const GOOGLE_MAPS_APIKEY = '...';

export const ChooseStation = ({ navigation, route }) => {
  const [dist, setDist] = useState([{ distance: "?", name: "", id: 9 }]);
  const [selected, setSelected] = useState(0);
  const [registeritem, setRegisterItem] = useState(null);
  const [location, setLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 200.01,
    longitudeDelta: 200.01,
  });
  const [MARKER_DATA, set_MARKER_DATA] = useState([]);
  const { id, name } = route.params;

  useEffect(() => {
    var templocation = null;
    var data = null;

    function domath(data, location) {
      var tempdata = [];
      console.log("start domath");
      for (let i = 0; i < data.length; i++) {
        let dlon = data[i].long - location.coords.longitude;
        let dlat = data[i].lat - location.coords.latitude;
        //		console.log(dlat +' '+dlon)

        let a =
          Math.pow(Math.sin(dlat / 2), 2) +
          Math.cos(location.coords.latitude) *
            Math.cos(data[i].lat) *
            Math.pow(Math.sin(dlon / 2), 2);
        //		console.log(a);

        let c = 2 * Math.asin(Math.sqrt(a));
        //		console.log(c);

        // Radius of earth in kilometers. Use 3956
        // for miles
        let r = 6371;
        tempdata.push({
          distance: c * r,
          name: data[i].name,
          city: data[i].city,
          id: data[i].id,
          lat: data[i].lat,
          long: data[i].long,
        });
      }

      // calculate the result
      //			console.log(c*r);
      let sorteddata = tempdata.sort((a, b) => {
        return a.distance - b.distance;
      });

      setSelected(sorteddata[0].id);
      setDist(sorteddata);
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 1.01,
        longitudeDelta: 1.01,
      });
      getSpecificItem(name, setRegisterItem, id);
    }
    function domMathNoPermission() {
      //setSelected(data[0].id)
      setSelected(null);
      data.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      setDist(data);
      set_MARKER_DATA(data);
      setLocation({
        latitude: 56.242319,
        longitude: 10.559465,
        latitudeDelta: 3.5,
        longitudeDelta: 3.5,
      });
      getSpecificItem(name, setRegisterItem, id);
    }

    function setCurrLocation(prop) {
      templocation = prop;
    }
    function setData(prop) {
      data = prop;
    }

    console.log("start current useeffect");
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        database.getData(setData, "EStations");
        const timer = setTimeout(() => domMathNoPermission(), 200);
        return () => clearTimeout(timer);
      } else {
        console.log("status good");
        //				let loc = await Location.getLastKnownPositionAsync({});
        let loc = await Location.getCurrentPositionAsync({});
        setCurrLocation(loc);
        database.getData(set_MARKER_DATA, "EStations");
        getCountryEst("DK", setData);
        const timer = setTimeout(() => domath(data, templocation), 200);
        return () => clearTimeout(timer);
      }
    })();
  }, [id, name]);

  function renderItem({ item }) {
    /*
		return (
			<TouchableOpacity
				style={selected == item.id ? styles.currEstStyle : styles.listEstStyle}
				onPress={() => {
						if (selected != item.id) {
							setSelected(item.id)
							setLocation({latitude: item.lat, longitude: item.long, latitudeDelta: 1.01, longitudeDelta: 1.01})
						} else {
							setSelected(null)	
						}
//					selected != item.id ? setSelected(item.id) : setSelected(null)
				}}>
				<Text>{Math.ceil(item.distance)||'NaN'} m</Text>
				<Text style = {{fontSize: 24}}>{item.name}</Text>
				<Text>{item.city}</Text>
			</TouchableOpacity >
		)
*/

    return (
      <>
        <View style={{ height: 15 }} />
        <ListItem
          containerStyle={
            selected == item.id
              ? {
                  ...elementsStyles.stationListStyle,
                  ...elementsStyles.buttonStyles,
                  ...elementsStyles.cornerStyle,
                }
              : {
                  ...elementsStyles.stationListStyle,
                  ...elementsStyles.greyColor,
                  ...elementsStyles.cornerStyle,
                }
          }
          onPress={() => {
            if (selected != item.id) {
              setSelected(item.id);
              setLocation({
                latitude: item.lat,
                longitude: item.long,
                latitudeDelta: 1.01,
                longitudeDelta: 1.01,
              });
            } else {
              setSelected(null);
            }
            //					selected != item.id ? setSelected(item.id) : setSelected(null)
          }}
        >
          <ListItem.Content>
            <ListItem.Subtitle>
              {Math.ceil(item.distance) || "NaN"} m
            </ListItem.Subtitle>
            <ListItem.Title style={elementsStyles.midFont}>
              {item.name}
            </ListItem.Title>
            <ListItem.Subtitle>By: {item.city}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </>
    );
  }

  return (
    <>
      <MapView
        style={styles.mapStyle}
        provider={MapView.PROVIDER_GOOGLE}
        region={location}
        showsUserLocation={true}
      >
        {MARKER_DATA.map((marker) => (
          <Marker
            key={marker.id + "&" + selected}
            title={marker.name}
            pinColor={marker.id == selected ? "green" : "red"}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.long,
            }}
            onPress={() => {
              if (selected != marker.id) {
                setSelected(marker.id);
                setLocation({
                  latitude: marker.lat,
                  longitude: marker.long,
                  latitudeDelta: 1.01,
                  longitudeDelta: 1.01,
                });
              } else {
                setSelected(null);
              }
            }}
          />
        ))}

        {/*	
				<MapViewDirections
					origin={getLocation}
					destination={location}
					strokeWidth = {3}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeColor="hotpink"
					mode="WALKING"
				/>
*/}
      </MapView>

      {dist && (
        <FlatList
          data={dist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <Button
        title={"Choose"}
        containerStyle={elementsStyles.chooseStyle}
        buttonStyle={{
          ...elementsStyles.cornerStyle,
          ...elementsStyles.yellowColor,
        }}
        titleStyle={elementsStyles.bigFont}
        onPress={() => {
          // eslint-disable-next-line react/prop-types
          // Item (id , aval , estId , catId , proId , bndId , modId )
          if (selected == null) {
            ToastAndroid.showWithGravity(
              "Venligst vælt en station",
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
            return;
          }
          database.insertData(
            {
              id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
              aval: 1,
              estId: selected,
              catId: registeritem[0].catId,
              proId: registeritem[0].proId,
              bndId:
                typeof registeritem[0].bndId !== "undefined"
                  ? registeritem[0].bndId
                  : null,
              modId:
                typeof registeritem[0].modId !== "undefined"
                  ? registeritem[0].modId
                  : null,
            },
            "Items"
          );
          setTimeout(
            () => navigation.navigate("Thanks", { estId: selected }),
            2000
          );
          // If button is pressed: Redirect to "registrering item"
        }}
      />
    </>
  );
};
//			<TouchableOpacity
//				style={styles.chooseStyle}
//				onPress={() => {
//					// eslint-disable-next-line react/prop-types
//					// Item (id , aval , estId , catId , proId , bndId , modId )
//					if (selected == null) {
//						ToastAndroid.showWithGravity("Venligst vælt en station", ToastAndroid.LONG, ToastAndroid.CENTER);
//						return
//					}
//					database.insertData({id: Math.floor(Math.random() * (10000 - 1 + 1) + 1), aval: 1, estId: selected, catId: registeritem[0].catId, proId: registeritem[0].proId, bndId: typeof registeritem[0].bndId !== 'undefined' ? registeritem[0].bndId : null, modId: typeof registeritem[0].modId !== 'undefined' ? registeritem[0].modId : null},'Items')
//					setTimeout(() => navigation.navigate('Thanks',{estId: selected,}),2000)
//					// If button is pressed: Redirect to "registrering item"
//			}}>
//				<Text style={{fontSize: 35}}>choose</Text>
//			</TouchableOpacity>
