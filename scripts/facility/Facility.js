export const Facility = (facilityObj, matchingCriminalArray) => {
  return `
  <h2>${facilityObj.facilityName}</h2>

  <ul>${matchingCriminalArray.map((c) => `<li>${c.name}</li>`).join("")}</ul>
  
  `;
};
