let criminalFacilities = [];

export const useCriminalFacilities = () => criminalFacilities.slice();

export const getCriminalFacilities = () => {
  return fetch("http://criminals.glassdale.us/criminalFacilities")
    .then((res) => res.json())
    .then((dataAsJson) => (facilities = dataAsJson));
};
