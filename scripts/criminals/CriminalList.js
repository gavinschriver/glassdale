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

eventHub.addEventListener("ageRangeSelected", (ageRangeEvent) => {
  const [ageRangeMin, ageRangeMax] = ageRangeEvent.detail.ageRange.split("-");
  const criminalsArray = useCriminals();
  const matchingCriminalsArray = criminalsArray.filter((criminalObj) => {
    return criminalObj.age > ageRangeMin && criminalObj.age < ageRangeMax;
  });

  render(matchingCriminalsArray);
});

eventHub.addEventListener("crimeWasChosen", (convictionSelectEvent) => {
  const crimeFromSelector =
    convictionSelectEvent.detail.IDofTheCrimeThatWasChosen;

  const crimeArray = useConvictions();
  const matchingCrime = crimeArray.find((currentCrimeObj) => {
    return parseInt(crimeFromSelector) === currentCrimeObj.id;
  });

  const criminalsArray = useCriminals();

  const matchingCriminals = criminalsArray.filter((currentCriminalObj) => {
    return matchingCrime.name === currentCriminalObj.conviction;
  });

  render(matchingCriminals);
});

eventHub.addEventListener("officerChosen", (officerSelectEvent) => {
  const officerFromSelector = officerSelectEvent.detail.officerId;

  const officersArray = useOfficers(); //not necessary if we use the officer NAME prop from the objects as the value in the dropdown
  const matchingOfficer = officersArray.find((officerObj) => {
    return parseInt(officerFromSelector) === officerObj.id;
  });

  const criminalsArray = useCriminals();
  const matchingCriminals = criminalsArray.filter((criminalObj) => {
    return matchingOfficer.name === criminalObj.arrestingOfficer;
  });

  render(matchingCriminals);
});

eventHub.addEventListener("hideCriminalsPressed", () => {
  if (contentTarget.className != "witnessesDisplayed") {
    contentTarget.innerHTML = "";
    contentTarget.className = "noCriminalsDisplayed";
  }
});

eventHub.addEventListener("showAllCriminalsPressed", () => {
  if (contentTarget.className != "allCriminalsDisplayed") {
    const criminalsArray = useCriminals();
    render(criminalsArray);
    contentTarget.className = "allCriminalsDisplayed";
  }
});

/// for WHOLE CRIM LIS //

const render = (specificArrayOfCriminals) => {
  const fullCriminalHTML = specificArrayOfCriminals
    .map((criminalToBeRepresented) => {
      return CriminalHTMLConverter(criminalToBeRepresented);
    })
    .join("");

  contentTarget.innerHTML = `${fullCriminalHTML}`;
};

export const CriminalList = () => {
  getCriminals()
    .then(getFacilities)
    .then(getCriminalFacilities)
    .then(() => {
      const criminalArray = useCriminals();
      render(criminalArray);
    });
};
