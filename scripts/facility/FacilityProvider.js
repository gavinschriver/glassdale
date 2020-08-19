let facilities = [];

export const useFacilities = () => facilities.slice();

export const getFacilities = () => {
  return fetch("http://criminals.glassdale.us/facilities")
    .then((res) => res.json())
    .then((dataAsJson) => (facilities = dataAsJson));
};
