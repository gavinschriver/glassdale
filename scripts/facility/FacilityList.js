import { useCriminals, getCriminals } from "../criminals/CriminalProvider.js";
import { useFacilities, getFacilities } from "./FacilityProvider.js";
import {
  useCriminalFacilities,
  getCriminalFacilities,
} from "./CriminalFacilityProvider.js";
import { Facility } from "./Facility.js";

const contentTarget = document.querySelector("#contentList");
const eventHub = document.querySelector(".container");

eventHub.addEventListener("showFacilitiesButtonClicked", () => {
  if (contentTarget.className !== "facilitiesDisplayed") {
    render();
    contentTarget.className = "facilitiesDisplayed";
  } else if (contentTarget.className === "facilitiesDisplayed") {
    contentTarget.innerHTML = "";
    contentTarget.classList.remove("facilitiesDisplayed");
  }
});

let facilities = useFacilities();
let crimFacs = useCriminalFacilities();
let criminals = useCriminals();

const render = () => {
  const facilityListHTML = facilities
    .map((facility) => {
      const matchingCrimFacs = crimFacs.filter(
        (crimFacObj) => facility.id === crimFacObj.facilityId
      );
      const matchingCriminalObjects = matchingCrimFacs.map((cf) => {
        const matchingCriminal = criminals.find(
          (co) => cf.criminalId === co.id
        );
        return matchingCriminal;
      });

      const facilityHTML = Facility(facility, matchingCriminalObjects);
      console.log(matchingCriminalObjects);
      return facilityHTML;
    })
    .join(" ");

  contentTarget.innerHTML = `${facilityListHTML}`;
};

export const FacilityList = () => {
  getFacilities()
    .then(getCriminals)
    .then(getCriminalFacilities)
    .then(() => {
      facilities = useFacilities();
      crimFacs = useCriminalFacilities();
      criminals = useCriminals();
    });
};
