import axios from "axios";

export function storeData(place) {
  axios.post(
    "https://geolocationapp-bb2b6-default-rtdb.firebaseio.com/geolocation.json",
    place
  );
}

export async function fetchData() {
  const response = await axios.get(
    "https://geolocationapp-bb2b6-default-rtdb.firebaseio.com/geolocation.json"
  );

  const geolocationData = [];
  for (const key in response.data) {
    const geolocationObject = {
      id: key,
      address: response.data[key].address,
      location: response.data[key].location,
      title: response.data[key].title,
      appleId: response.data[key].appleId,
      yop: response.data[key].yop,
      breed: response.data[key].breed,
      row: response.data[key].row,
      column: response.data[key].column,
    };
    geolocationData.push(geolocationObject);
    console.log("geoData", response.data[key].appleId);
  }
  return geolocationData;
}

export async function fetchPlaceDetails(id) {
  try {
    const response = await axios.get(
      `https://geolocationapp-bb2b6-default-rtdb.firebaseio.com/geolocation/${id}.json`
    );
    const item = response.data;
    // console.log("here thee", id);
    return item;
  } catch (error) {
    console.error("Error", error);
  }
  // console.log("items", item);
}
