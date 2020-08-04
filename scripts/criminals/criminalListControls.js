import { showAllCriminalsButton } from "./showAllCriminalsButton.js";
import { hideCriminalsButton } from "./hideCriminalListButton.js";
import { OfficerSelect } from "../officers/OfficerSelect.js";
import { ConvictionSelect } from "../convictions/ConvictionSelect.js";
import { criminalAgeSelect } from "./criminalAgeSelect.js";


const contentTarget = document.querySelector(".criminalListControls");



export const criminalListControls = () => {
  let criminalButtons = "";

  OfficerSelect()
    .then((officerDropDown) => {criminalButtons += officerDropDown})
    .then(() => {
        ConvictionSelect()
            .then((convictionsDropDown) => {
                criminalButtons += convictionsDropDown + showAllCriminalsButton() + hideCriminalsButton() + criminalAgeSelect();

                    contentTarget.innerHTML = `
                    <h2>Find Criminals:</h2>` + 
                    criminalButtons;
            });
    });
};
