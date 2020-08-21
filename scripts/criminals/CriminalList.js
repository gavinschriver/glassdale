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
};

eventHub.addEventListener("ageRangeSelected", (ageRangeEvent) => {
  const [ageRangeMin, ageRangeMax] = ageRangeEvent.detail.ageRange.split("-");
  const ageSelectedCriminals = useCriminals().filter((criminalObj) => {
    return criminalObj.age > ageRangeMin && criminalObj.age < ageRangeMax;
  });
  render(ageSelectedCriminals);
});

eventHub.addEventListener("crimeWasChosen", (convictionSelectEvent) => {
  filterSelections.conviction =
    convictionSelectEvent.detail.IDofTheCrimeThatWasChosen;

  filterFunction();

  render();
});

eventHub.addEventListener("officerChosen", (officerSelectEvent) => {
  const idValueFromOfficerSelector = officerSelectEvent.detail.officerId;
  const matchingOfficerObj = useOfficers().find((officerObj) => {
    return parseInt(idValueFromOfficerSelector) === officerObj.id;
  });

  const convictionSelectedCriminals = useCriminals().filter((criminalObj) => {
    return matchingOfficerObj.name === criminalObj.arrestingOfficer;
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
    render(useCriminals());
    contentTarget.className = "allCriminalsDisplayed";
  }
});

const filterFunction = () => {
  criminals = useCriminals();
  const allConvictions = useConvictions();

  if (filterSelections.conviction !== "0") {
    const matchingConvictionObj = allConvictions.find((c) => {
      return parseInt(filterSelections.conviction) === c.id;
    });

    criminals = criminals.filter((currentCriminalObj) => {
      return matchingConvictionObj.name === currentCriminalObj.conviction;
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
