import { getDistance } from "geolib";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN


export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude: latitude, longitude: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
          //default Toronto
          resolve({ latitude: 43.70011, longitude: -79.4163 });
        }
      );
    } else {
      const errorMsg = "Geolocation is not supported by this browser.";
      console.error(errorMsg);
      resolve({ latitude: 43.70011, longitude: -79.4163 });
    }
  });
};

// export const getUserLocationTemp = () => {
//     return new Promise((resolve, reject) => {
//         // resolve({ latitude: 9.02497, longitude: 38.74689 }) //Ethiopia Capital
//         resolve({ latitude: -1.94995, longitude: 30.05885 }) //Rwanda Capital
//     })
// }

export const getGeoCoords = async(address) => {
  console.log('address: ',address)
  console.log('mapbox token: ',MAPBOX_TOKEN)
  try {
    const res = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${address}&access_token=${MAPBOX_TOKEN}`)
    if (res) {
      const data = await res.json()
      console.log('geocoding res: ',data)
      data.features.forEach(element => {
        console.log('geometry: ',element.geometry)
        console.log('properties: ',element.properties)
        console.log('\n')
      });
      const closestAddress = data.features[0].properties.full_address.trim().replace(/,/g, '')
      console.log('closest address: ',closestAddress)
      if (address.toLowerCase() != closestAddress.toLowerCase()) {
        console.log('Could not find a matching address')
        return null
      }
      return data.features[0].geometry.coordinates
      
    }
  } catch (err) {
    console.error('Error in getGeoCoords: ',err)
    return null
  }
}

export const deliveryFee = (coords,facility) => {
  try {
    console.log('pickup coords: ',coords)
    console.log('facility coords: ',facility)
    const d = getDistance(coords, facility)
    console.log('distance in kilometres: ', d / 1000)

    const kilometres = d / 1000
    const fee = Number((0.25 * kilometres).toFixed(2))
    return { fee: fee, distance: Number(kilometres.toFixed(2))}
  } catch (err) {
    console.log('error calculaing delivery fee: ',err)
    return null
  }
}
