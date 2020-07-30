import {showAllCriminalsButton } from "./showAllCriminalsButton.js"
import { hideCriminalsButton } from "./hideCriminalListButton.js"


const contentTarget = document.querySelector(".siteHeader")

export const criminalListControls = () => {
     const allCriminalControls = 
        showAllCriminalsButton() + hideCriminalsButton()

     contentTarget.innerHTML = allCriminalControls
}