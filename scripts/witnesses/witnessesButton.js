const contentTarget = document.querySelector(".witnessListControlls")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "showWitnessesButton") {
        const showWitnessesEvent = new CustomEvent("showWitnessesButtonClicked")
        eventHub.dispatchEvent(showWitnessesEvent)
    }
})

export const witnessButton = () => {
    const buttonHTML = `<button id="showWitnessesButton"> Show Witnesses</button>` 
    contentTarget.innerHTML += buttonHTML
}

//this scheme == witNessButton() combines render (blueprint to produce element AND DOM assignment) and List (pull in data from provider and call render "blueprint" to use it) functionalities