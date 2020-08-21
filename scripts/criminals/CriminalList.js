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

let facilities = [];
let crimFac = [];
let criminals = [];
const filterSelections = {
  conviction: "0",
  officer: "0",
  ageRangeMin: "",
  ageRangeMax: "",
};

eventHub.addEventListener("ageRangeSelected", (ageRangeEvent) => {
  //assign min and max age range properties of filterSelections objects from ageRangeEvent details
  [
    filterSelections.ageRangeMin,
    filterSelections.ageRangeMax,
  ] = ageRangeEvent.detail.ageRange.split("-");

  filterFunction();

  render();
});

eventHub.addEventListener("crimeWasChosen", (convictionSelectEvent) => {
  filterSelections.conviction =
    convictionSelectEvent.detail.IDofTheCrimeThatWasChosen;

  filterFunction();

  render();
});

eventHub.addEventListener("officerChosen", (officerSelectEvent) => {
  const officerArray = useOfficers();
  const idValueFromOfficerSelector = parseInt(
    officerSelectEvent.detail.officerId
  );
  const matchingOfficerObj = officerArray.find((officerObj) => {
    return officerObj.id === idValueFromOfficerSelector;
  });

  filterSelections.officer = matchingOfficerObj.name;

  filterFunction();

  render();
});

eventHub.addEventListener("hideCriminalsPressed", () => {
  if (contentTarget.className != "witnessesDisplayed") {
    contentTarget.innerHTML = "";
    contentTarget.className = "noCriminalsDisplayed";
  }
});

eventHub.addEventListener("showAllCriminalsPressed", () => {
  if (contentTarget.className != "allCriminalsDisplayed") {
    criminals = useCriminals();
    render();
    contentTarget.className = "allCriminalsDisplayed";
  }
});

const filterFunction = () => {
  //set component state array of criminals to entire array from app state
  criminals = useCriminals();
  // invoke function to produce array of convictions and assign result to a variable
  const allConvictions = useConvictions();

  //if convictions property of the filterSelections objects doesn't equal a sttring of 0...
  if (filterSelections.conviction !== "0") {
    // search array of convictions for the conviction object whose id property matches the value of the convictions property (as an integer) of the filterSelction object
    const matchingConvictionObj = allConvictions.find((c) => {
      return parseInt(filterSelections.conviction) === c.id;
    });

    //set component state criminals array to equal the result of filtering through the entire colleciton of those objects and and returning only the ones for which
    //the value of the conviction property matches the value of the name property of the specified conviction object found above
    criminals = criminals.filter((currentCriminalObj) => {
      return matchingConvictionObj.name === currentCriminalObj.conviction;
    });
  }

  //if the value of the officer property of the filterSelection object isn't "0"...
  if (filterSelections.officer !== "0") {
    //set component state criminals array to equal the result of filtering through that current collection and returning only the results
    // whose arrestingOfficer property value is equal to the officer property value of the filterSelections object
    criminals = criminals.filter((c) => {
      if (c.arrestingOfficer === filterSelections.officer) {
        return true;
      }
      return false;
    });
  }

  if (filterSelections.ageRangeMin && filterSelections.ageRangeMax) {
    criminals = criminals.filter((criminalObj) => {
      return (
        criminalObj.age > filterSelections.ageRangeMin &&
        criminalObj.age < filterSelections.ageRangeMax
      );
    });
  }
};

const render = () => {
  const fullCriminalHTML = criminals
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
      criminals = useCriminals();
      facilities = useFacilities();
      crimFac = useCriminalFacilities();

      render(); // first time render is invoked, its with the (currentCriminalArray) value of the entire criminals entity, as produced by invoking useCriminals, which should always be equal to that full entity as long as we only 'get criminals' once...
    });
};
