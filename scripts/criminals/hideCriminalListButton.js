const contentTarget = document.querySelector(".hideCriminals")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "hideCriminalButton") {
        const hideCriminalsButtonEvent = new CustomEvent("hideCriminalsPressed")
        eventHub.dispatchEvent(hideCriminalsButtonEvent)
        console.log(hideCriminalsButtonEvent)
    }
})

export const hideCriminalsButton = () => {
    return `<button id="hideCriminalButton">Hide All</button>`
}
