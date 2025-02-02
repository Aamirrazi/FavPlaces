import * as SQLite from "expo-sqlite";
import { Place } from "../models/Place";

export async function init() {
  const database = await SQLite.openDatabaseAsync("places.db");
  try {
    await database.execAsync(
      `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
          )`
    );
    // console.log("initialised");
  } catch (error) {
    console.log(error);
  }
}
export async function insertPlace(place) {
  const database = await SQLite.openDatabaseAsync("places.db");
  try {
    const result = await database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng
    );
    // console.log("suceessfully loaded");
    // console.log(result);
  } catch (error) {
    console.log(error);
  }
}
export async function fetchPlaces() {
  const database = await SQLite.openDatabaseAsync("places.db");
  try {
    const result = await database.getAllAsync(`SELECT * FROM places`);
    const places = [];
    for (let i = 0; i < result.length; i++) {
      places.push(
        new Place(
          result[i].title,
          result[i].imageUri,
          {
            address: result[i].address,
            lat: result[i].lat,
            lng: result[i].lng,
          },
          result[i].id
        )
      );
    }
    return places;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPlaceById(id) {
  const database = await SQLite.openDatabaseAsync("places.db");
  try {
    const result = await database.getAllAsync(
      `SELECT * FROM places WHERE id = ?`,
      id
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
