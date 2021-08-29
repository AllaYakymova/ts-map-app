import axios from "axios";

const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const mapField = document.getElementById("map")! as HTMLDivElement;

const GOOGLE_API_KEY = "AIzaSyB9kP44dhetnlSE-yK-Bmxz0nxWgkWABs";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number, lng: number } } }[];
  status: 'OK' | 'ZERO RESULTS';
}

let map: google.maps.Map;

async function submitAddress(event: Event) {
  try {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    const response = await axios.get<GoogleGeocodingResponse>
    (`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`);

    if (response.data.status !== 'OK') {
      return new Error("Couldn't fetch location")
    } else {
      const coordinates = response.data.results[0].geometry.location;

      map = new google.maps.Map(mapField, {
        zoom: 10,
        center: coordinates,
      });

      new google.maps.Marker({
        position: coordinates,
        map: map,
      });

      addressInput.value = ''
    }

  } catch (e) {
    console.log(e)
  }
}

form.addEventListener('submit', submitAddress);
