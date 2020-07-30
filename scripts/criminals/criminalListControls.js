import {showAllCriminalsButton } from "./showAllCriminalsButton.js"

const contentTarget = document.querySelector(".siteHeader")

export const criminalListControls = () => {
     const allCriminalControls = showAllCriminalsButton()

     contentTarget.innerHTML = allCriminalControls
}