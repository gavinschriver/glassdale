import { getWitnesses, useWitnesses} from "./witnessProvider.js"
import { witness } from "./witnessHTML.js"

const contentTarget = document.querySelector(".witnessContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showWitnessesClicked", () => {
    witnessToggle()
    if (witnessToggle === WitnessList) {
        witnessToggle = hideWitnessList
    } else if (witnessToggle === hideWitnessList) {
        witnessToggle = WitnessList
    }
    // const allWitnessesArray = useWitnesses()
    // render(allWitnessesArray)
}) 

const render = currentWitnessesArray => {
    const witnessHTML = `<section id="currentWitnessList" class="hidden">
                        ${
                            currentWitnessesArray.map(witnessObj => {
                                return witness(witnessObj)
                            }).join("")
                        }
                        </section>`
    contentTarget.innerHTML = witnessHTML
}

export const WitnessList = () => {
    getWitnesses()
        .then( () => {
            const allWitnessesArray = useWitnesses()
            render(allWitnessesArray)
        })
}

const hideWitnessList = () => {
    contentTarget.innerHTML = ""
}

let witnessToggle = WitnessList
