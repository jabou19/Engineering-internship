/**
 * Render data
 * function that takes data and displays it,
 * the function Render is for test data
 * RegRender is for rendering data in the register item part
 * **/

import React from "react";
import { FlatList, View, SafeAreaView } from "react-native";
import { Text, ListItem } from "react-native-elements";

import { styles, elementsStyles } from "../../src/styles/Stylesheet";

//				Render of database
// eslint-disable-next-line react/prop-types
export const Render = ({ data }) => {
  // eslint-disable-next-line react/prop-types
  const Item = ({
    name,
    id,
    lat,
    long,
    catId,
    modId,
    bndId,
    estId,
    proId,
    country,
    city,
    aval,
    co2Footprint,
  }) => {
    //console.log(description + " "+ title);
    if (estId != null) {
      return (
        <View>
          <Text>
            Name: {name}, Id: {id}
          </Text>
          <Text>
            Availability: {aval}, EStations id: {estId}, Catagory id: {catId},
            Product id: {proId}
          </Text>
          <Text>
            Models id: {modId || 0}, Brand id: {bndId || 0}
          </Text>
          <Text />
        </View>
      );
    } else if (bndId != null) {
      return (
        <View>
          <Text>
            Name: {name}, Id: {id}
          </Text>
          <Text>Brand id: {bndId}</Text>
          <Text />
        </View>
      );
    } else if (proId != null) {
      return (
        <View>
          <Text>
            Name: {name}, Id: {id}
          </Text>
          <Text>Product id: {proId}</Text>
          <Text />
        </View>
      );
    } else if (catId != null) {
      return (
        <View>
          <Text>
            Name: {name}, Id: {id}
          </Text>
          <Text>Catagory id: {catId}</Text>
          <Text />
        </View>
      );
    } else if (lat != null || long != null) {
      return (
        <View>
          <Text>
            Name: {name}, Id: {id}
          </Text>
          <Text>
            Latitude: {lat}, Longitude: {long}
          </Text>
          <Text>
            Country: {country}, City: {city}
          </Text>
          <Text />
        </View>
      );
    } else {
      return (
        <View>
          <Text>
            Name: {name}, Id: {id}
          </Text>
          <Text />
        </View>
      );
    }
  };

  const renderItem = ({ item }) => (
    <Item
      name={item.name || null}
      id={item.id || null}
      lat={item.lat || null}
      long={item.long || null}
      catId={item.catId || null}
      modId={item.modId || null}
      bndId={item.bndId || null}
      estId={item.estId || null}
      proId={item.proId || null}
      country={item.country}
      city={item.city}
      co2Footprint={item.co2Footprint}
      aval={item.aval}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {data && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const renderSeparator = () => {
  return <View style={styles.seperatorStyle} />;
};

export const RegRender = ({ data, navigation, db, rid }) => {
  const tableList = ["Cat", "Pro", "Bnd", "Mod", "Stations"];
  const navplace = tableList[rid];

  /*
	const renderData = ( {item} ) => (
		<Item name = {item.name} id = {item.id}/>
	);

	const Item = ({name,id}) => {
		return (
			<TouchableOpacity 
				style={styles.renderRegister} 
				onPress= {() => {
					console.log(navplace)
					if (navplace == 'Stations') {
						navigation.navigate('Stations', {id: id, name: db}) 
					} else {
						navigation.navigate(navplace, {reg:id})
					}
				}
			}>
				<Text style={{fontSize: 18,marginLeft: "10%"}}>{name}</Text>
			</TouchableOpacity >
		)
	}
*/

  const renderItem = ({ item }) => (
    <ListItem
      containerStyle={elementsStyles.regRenderStyle}
      onPress={() => {
        console.log(navplace);
        if (navplace == "Stations") {
          navigation.navigate("Stations", { id: item.id, name: db });
        } else {
          navigation.navigate(navplace, { reg: item.id });
        }
      }}
    >
      <ListItem.Content>
        <ListItem.Title>{item.name} </ListItem.Title>
        {item.co2Footprint && <Text>CO2 Footprint {item.co2Footprint} kg</Text>}
      </ListItem.Content>
    </ListItem>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={renderSeparator}
      />
    </SafeAreaView>
  );
};
