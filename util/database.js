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
  try {
    const response = await fetch(
      "https://apple-farm-server.vercel.app/apples/create-apple",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          ID: place.id,
          YOP: place.yop,
          breed: place.breed,
          row: place.row,
          column: place.column,
          geoLocation: {
            lat: place.location.lat,
            lng: place.location.lng,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log("response", data);
  } catch (error) {
    console.log("NO DATA WAS SENT", error);
  }
}

export async function fetchData(email) {
  const response = await axios.get(
    "https://geolocationapp-bb2b6-default-rtdb.firebaseio.com/geolocation.json"
  );
  const tryX = "kelvinmomanyi3@gmail.com";
  const geolocationData2 = [];
  try {
    const response2 = await axios.get(
      `https://apple-farm-server.vercel.app/apples/get-apples?email=${tryX}`
    );

    console.log(response2.data.apple[0]);

    for (const key in response2.data.apple) {
      const geolocationObject1 = {
        id: response2.data.apple[key].ID,
        address:
          response2.data.apple[key].address === undefined
            ? "no address was fetched"
            : response2.data.apple[key].address,
        location: response2.data.apple[key].geoLocation,
        yop: response2.data.apple[key].YOP,
        breed: response2.data.apple[key].breed,
        row: response2.data.apple[key].row,
        column: response2.data.apple[key].column,
      };

      geolocationData2.push(geolocationObject1);
    }

    console.log("THIS IS GEOLOCATION DATA 2", geolocationData2);
  } catch (error) {
    console.log("NO DATA", error);
  }

  //----------------------------------------------------------
  // const geolocationData = [];
  // for (const key in response.data) {
  //   const geolocationObject = {
  //     id: key,
  //     address: response.data[key].address,
  //     location: response.data[key].location,
  //     title: response.data[key].title,
  //     appleId: response.data[key].appleId,
  //     yop: response.data[key].yop,
  //     breed: response.data[key].breed,
  //     row: response.data[key].row,
  //     column: response.data[key].column,
  //   };
  //   geolocationData.push(geolocationObject);
  //   // console.log("geoData", response.data[key].appleId);
  // }
  return geolocationData2;
}

export async function fetchPlaceDetails(id) {
  const tryX = "kelvinmomanyi3@gmail.com";
  try {
    const response = await axios.get(
      `https://apple-farm-server.vercel.app/apples/get-apples?email=${tryX}`
    );
    const data = response.data;
    console.log("here thee", data.apple); // Log the array of apple objects

    const filteredData = data.apple.filter((item) => item.ID === id); // Filter the array based on the ID
    console.log("filtered data", filteredData); // Log the filtered array

    return filteredData[0]; // Return the filtered array
  } catch (error) {
    console.error("Error", error);
  }
}

export async function deleteItemById(id) {
  try {
    const response = await axios.delete(
      `https://apple-farm-server.vercel.app/apples/delete?ID=${id}`
    );
    console.log("Item deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}
