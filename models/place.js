export class Place {
  constructor(title, appleId, yop, breed, row, column, location, id) {
    this.title = title;
    this.appleId = appleId;
    this.yop = yop;
    this.breed = breed;
    this.row = row;
    this.column = column;

    // this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; // { lat: 0.141241, lng: 127.121 }
    this.id = id;
  }
}
