import { getCriminals, useCriminals } from "./CriminalProvider.js"; //in this Module, we need to GET the criminals AND use them
import { CriminalHTMLConverter } from "./CriminalHTMLRepresenter.js";
import { useConvictions } from "../convictions/ConvictionProvider.js";
import { useOfficers } from "../officers/OfficerProvider.js";
import { getFacilities, useFacilities } from "../facility/FacilityProvider.js";
import {
  getCriminalFacilities,
  useCriminalFacilities,
} from "../facility/CriminalFacilityProvider.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector("#contentList");

//should make it so that anywhere "criminalArray" appears as a var name, either locally or in ref to this component-state var, we're talking about the whole enchilada
let criminalArray = [];
let facilities = [];
let crimFac = [];

eventHub.addEventListener("ageRangeSelected", (ageRangeEvent) => {
  const [ageRangeMin, ageRangeMax] = ageRangeEvent.detail.ageRange.split("-");
  //   const criminalsArray = useCriminals();
  const ageSelectedCriminals = criminalArray.filter((criminalObj) => {
    return criminalObj.age > ageRangeMin && criminalObj.age < ageRangeMax;
  });
  render(ageSelectedCriminals);
});

eventHub.addEventListener("crimeWasChosen", (convictionSelectEvent) => {
  const crimeFromSelector =
    convictionSelectEvent.detail.IDofTheCrimeThatWasChosen; //crimeFromSelector is an int that matches the PK id of the conviction object selected in the dropdown

  const criminalArray = useConvictions(); // declare a var called crimeArray and assign to refer to the value value of invoking the function referenced by the var name useConvictions; shoullddd bring in the WHOLE array of convictions to filter thru
  const matchingCrime = criminalArray.find((currentCrimeObj) => {
    //matching crime is assigned to val of the OBJECT in the freshyFresy crimeArray for which that currentCrimeObj's id prop value is equal to the parseint version of that string called "crime from selcetor"
    return parseInt(crimeFromSelector) === currentCrimeObj.id;
  });

  const criminalsArray = useCriminals(); //criminalsArray should be freshy fresh array of ALL criminals from API state// its only otherwise invoked on call to CriminalList

  const convictionSelectedCriminals = criminalsArray.filter(
    (currentCriminalObj) => matchingCrime.name === currentCriminalObj.conviction
  );

  render(convictionSelectedCriminals);
});

eventHub.addEventListener("officerChosen", (officerSelectEvent) => {
  const officerFromSelector = officerSelectEvent.detail.officerId;

  const officersArray = useOfficers(); //not necessary if we use the officer NAME prop from the objects as the value in the dropdown
  const matchingOfficer = officersArray.find((officerObj) => {
    return parseInt(officerFromSelector) === officerObj.id;
  });

  const criminalsArray = useCriminals();
  const convictionSelectedCriminals = criminalsArray.filter((criminalObj) => {
    return matchingOfficer.name === criminalObj.arrestingOfficer;
  });

  render(convictionSelectedCriminals);
});

eventHub.addEventListener("hideCriminalsPressed", () => {
  if (contentTarget.className != "witnessesDisplayed") {
    contentTarget.innerHTML = "";
    contentTarget.className = "noCriminalsDisplayed";
  }
});

eventHub.addEventListener("showAllCriminalsPressed", () => {
  if (contentTarget.className != "allCriminalsDisplayed") {
    const criminalArray = useCriminals();
    render(criminalArray);
    contentTarget.className = "allCriminalsDisplayed";
  }
});

/// for WHOLE CRIM LIS //

const render = (currentCriminalArray) => {
  const fullCriminalHTML = currentCriminalArray
    .map((criminalToBeRepresented) => {
      const facilityRelationshipsForCriminal = crimFac.filter(
        (cr) => criminalToBeRepresented.id === cr.criminalId
      );

      const matchingFacilities = facilityRelationshipsForCriminal.map(
        (matchingRelationship) => {
          const matchingFacility = facilities.find(
            (facility) => facility.id === matchingRelationship.facilityId
          );
          return matchingFacility;
        }
      );

      return CriminalHTMLConverter(criminalToBeRepresented, matchingFacilities);
    })
    .join("");

  contentTarget.innerHTML = `${fullCriminalHTML}`;
};

export const CriminalList = () => {
  getCriminals()
    .then(getFacilities)
    .then(getCriminalFacilities)
    .then(() => {
      criminalArray = useCriminals();
      facilities = useFacilities();
      crimFac = useCriminalFacilities();

      render(criminalArray); // first time render is invoked, its with the (currentCriminalArray) value of the entire criminals entity, as produced by invoking useCriminals, which should always be equal to that full entity as long as we only 'get criminals' once...
    });
};
