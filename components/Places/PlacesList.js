import { FlatList, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/Colors";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places, deleted }) {
  const navigation = useNavigation();
  function selectPlaceHandler(id) {
    navigation.navigate("PlaceDetails", {
      id: id,
    });
  }
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }
  function handleDelete(id) {
    deleted(id);
  }

  return (
    <FlatList
      style={styles.list}
      showsVerticalScrollIndicator={false}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
