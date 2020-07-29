const contentTarget = document.querySelector(".showAllCriminals")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "showAllCriminalsButton") {
        const showAllCriminalsButtonEvent = new CustomEvent("showAllCriminalsPressed")
        eventHub.dispatchEvent(showAllCriminalsButtonEvent)
        console.log(showAllCriminalsButtonEvent)
    }
})

export const showAllCriminalsButton = () => {
    contentTarget.innerHTML = `<button id="showAllCriminalsButton">Display All</button>`
}