import { witnessButton } from "./witnessesButton.js";

const contentTarget = document.querySelector('.witnessListControlls')

export const witnessListControls = () => {
    contentTarget.innerHTML += `<h2>Display Witnesses:</h2>`
}
