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

export const getUserLocationTemp = () => {
    return new Promise((resolve, reject) => {
        // resolve({ latitude: 9.02497, longitude: 38.74689 }) //Ethiopia Capital
        resolve({ latitude: -1.94995, longitude: 30.05885 }) //Rwanda Capital
    })
}