import {showAllCriminalsButton } from "./showAllCriminalsButton.js"
import { hideCriminalsButton } from "./hideCriminalListButton.js"
import { OfficerSelect} from "../officers/OfficerSelect.js"

const contentTarget = document.querySelector(".siteHeader")



export const criminalListControls = () => {
     let allCriminalControls = 
        showAllCriminalsButton() + 
        hideCriminalsButton() +

        OfficerSelect().then(officerDropDown => {
           allCriminalControls += officerDropDown
           contentTarget.innerHTML = allCriminalControls

        })

}