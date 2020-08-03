const contentTarget = document.querySelector(".witnessListControlls")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "showWitnessesButton") {
        const witnessButtonEvent = new CustomEvent("showWitnessesClicked")
        eventHub.dispatchEvent(witnessButtonEvent)
        console.log(witnessButtonEvent)
    }
})

export const witnessButton = () => {
    const buttonHTML = `<button id="showWitnessesButton"> Show Witnesses</button>` 
    contentTarget.innerHTML += buttonHTML
}