const contentTarget = document.querySelector(".hideCriminals")
const eventHub = document.querySelector(".container")

export const hideCriminalsButton = () => {
    contentTarget.innerHTML = `<button class="criminalButton">Hide All</button>`
}