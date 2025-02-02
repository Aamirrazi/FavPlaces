import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";
import { deleteItem, fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused]);
  async function deleted(id) {
    // await deleteItem(id);
  }

  return <PlacesList places={loadedPlaces} deleted={deleted} />;
}

export default AllPlaces;
