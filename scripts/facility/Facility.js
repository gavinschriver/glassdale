export const Facility = (facilityObj, matchingCriminalArray) => {
  return `
  <div class="facility_card">
  <h2>${facilityObj.facilityName}</h2>

  <ul>${matchingCriminalArray.map((c) => `<li>${c.name}</li>`).join("")}</ul>
  
  </div>
  `;
};
