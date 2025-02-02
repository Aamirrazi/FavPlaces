import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/Colors";
import { useEffect, useState } from "react";
import { fetchPlaceById } from "../util/database";

function PlaceDetails({ navigation, route }) {
  function showOnMap(lat, lng) {
    navigation.navigate("Map", {
      lat: lat,
      lng: lng,
    });
  }
  const selectedId = route.params.id;
  const [placeData, setPlaceData] = useState();
  useEffect(() => {
    async function loadData() {
      const Data = await fetchPlaceById(selectedId);
      setPlaceData(Data);
      navigation.setOptions({
        title: Data[0].title,
      });
      // console.log(placeData[0].imageUri);
    }
    loadData();
  }, [selectedId]);
  if (!placeData) {
    return (
      <View style={styles.fallback}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: placeData[0].imageUri }} />
      <View style={styles.details}>
        <View style={styles.addressContainer}>
          {/* <Text style={styles.address}>{placeData[0].title}</Text> */}
          <Text style={styles.address}>{placeData[0].address}</Text>
        </View>
        <OutlinedButton
          icon="map"
          onPress={showOnMap.bind(this, placeData[0].lat, placeData[0].lng)}
        >
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;
const styles = StyleSheet.create({
  image: {
    marginVertical: 15,
    height: "35%",
    minHeight: 300,
    width: "100%",
    borderRadius: 6,
  },
  details: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
