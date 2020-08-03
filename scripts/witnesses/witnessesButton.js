const contentTarget = document.querySelector(".witnessListControlls")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "showWitnessesButton") {
        const showWitnessesEvent = new CustomEvent("showWitnessesButtonClicked")
        eventHub.dispatchEvent(showWitnessesEvent)
        console.log(showWitnessesEvent)
    }
})

export const witnessButton = () => {
    const buttonHTML = `<button id="showWitnessesButton"> Show Witnesses</button>` 
    contentTarget.innerHTML += buttonHTML
}