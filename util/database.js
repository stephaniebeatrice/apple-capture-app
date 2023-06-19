import axios from "axios";

export async function storeData(place, email) {
  console.log(place);
  // console.log();
  // console.log();
  // console.log();
  axios.post(
    "https://geolocationapp-bb2b6-default-rtdb.firebaseio.com/geolocation.json",
    place
  );
  // try {
  //   const response = await fetch(
  //     "https://apple-farm-server.vercel.app/apples/create-apple",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: email,
  //         ID: place.id,
  //         YOP: place.yop,
  //         breed: place.breed,
  //         row: place.row,
  //         column: place.column,
  //         geoLocation: {
  //           lat: place.location.lat,
  //           lng: place.location.lng,
  //         },
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   const data = await response.json();

  //   console.log("response", data);
  // } catch (error) {
  //   console.log("NO DATA WAS SENT", error);
  // }
}

export async function fetchData(email) {
  const response = await axios.get(
    "https://geolocationapp-bb2b6-default-rtdb.firebaseio.com/geolocation.json"
  );
  const tryX = "kelvinmomanyi3@gmail.com";
  // try {
  //   const response2 = await axios.get(
  //     `https://apple-farm-server.vercel.app/apples/get-apples?email=${tryX}`
  //   );
  //   console.log(response2.data);
  // } catch (error) {
  //   console.log("NO DATA", error);
  // }
  // const geolocationData2 = [];
  // // for (const key in response2.data) {
  //   const geolocationObject1 = {
  //     id: key,
  //     address: response.data[key].address,
  //     // location: response.data[key].location,
  //     title: response.data[key].title,
  //     appleId: response.data[key].appleId,
  //     yop: response.data[key].yop,
  //     breed: response.data[key].breed,
  //     row: response.data[key].row,
  //     column: response.data[key].column,
  //   };
  //   geolocationData2.push(geolocationObject1);
  // }
  //----------------------------------------------------------
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
    // console.log("geoData", response.data[key].appleId);
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
