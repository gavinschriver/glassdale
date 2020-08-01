import {showAllCriminalsButton } from "./showAllCriminalsButton.js"
import { hideCriminalsButton } from "./hideCriminalListButton.js"
import { OfficerSelect} from "../officers/OfficerSelect.js"

const contentTarget = document.querySelector(".criminalListControls")



export const criminalListControls = () => {
     let criminalButtons = showAllCriminalsButton() + hideCriminalsButton()

      OfficerSelect()
          .then(officerDropDown => {

           criminalButtons += officerDropDown


           contentTarget.innerHTML =  
            `<h2>Find Criminals:</h2>` +
            criminalButtons

        })

}