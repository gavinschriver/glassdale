import {showAllCriminalsButton } from "./showAllCriminalsButton.js"
import { hideCriminalsButton } from "./hideCriminalListButton.js"
import { OfficerSelect} from "../officers/OfficerSelect.js"

const contentTarget = document.querySelector(".siteHeader")



export const criminalListControls = () => {
     const allCriminalControls = 
        showAllCriminalsButton() + 
        hideCriminalsButton() +
        OfficerSelect().then(()=> {
        })

     contentTarget.innerHTML = allCriminalControls
}