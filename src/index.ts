import axios from "axios";

const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = '';

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number, lng: number } } }[];
  status: 'OK' | 'ZERO RESULTS';
}

async function submitAddress(event: Event) {
  try {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    const response = await axios.get<GoogleGeocodingResponse>
    (`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`);

    if(response.data.status !== 'OK') {
      return new Error("Couldn't fetch location")
    } else {
      const coorditantes = response.data.results[0].geometry.location;
    }
  } catch (e) {
    console.log(e)
  }
}

form.addEventListener('submit', submitAddress);
