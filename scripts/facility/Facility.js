export const Facility = (facility, matchingCriminalObjects) => {
  `
  <h2>${facility.facilityName}</h2>

  <ul>${matchingCriminalObjects.map((c) => `<li>${c.name}</li>`)}</ul>
  
  `;
};
