import { useCriminals, getCriminals } from "../criminals/CriminalProvider.js";
import { useFacilities, getFacilities } from "./FacilityProvider.js";
import {
  useCriminalFacilities,
  getCriminalFacilities,
} from "./CriminalFacilityProvider.js";
import { Facility } from "./Facility.js";

const contentTarget = document.querySelector(".facilityContainer");

let facilities = useFacilities();
let crimFacs = useCriminalFacilities();
let criminals = useCriminals();

export const FacilityList = () => {
  getFacilities()
    .then(getCriminals)
    .then(getCriminalFacilities)
    .then(() => {
      facilities = useFacilities();
      crimFacs = useCriminalFacilities();
      criminals = useCriminals();
    });

  render();
};

const render = () => {
  const facilityListHTML = facilities
    .map((facility) => {
      const matchingCrimFacs = crimFacs.filter(
        (cf) => facility.id === cf.facilityId
      );

      const matchingCriminalObjects = matchingCrimFacs.map((cf) => {
        return criminals.find((co) => cf.criminalId === co.id);
      });

      const HTMLPerFacility = Facility(facility, matchingCriminalObjects);

      return HTMLPerFacility;
    })
    .join("");

  contentTarget.innerHTML = facilityListHTML;
};
