import { getWitnesses, useWitnesses} from "./witnessProvider.js"
import { witness } from "./witnessHTML.js"

const contentTarget = document.querySelector(".witnessContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showWitnessesClicked", () => {
    const allWitnessesArray = useWitnesses()
    render(allWitnessesArray)
}) 

const render = currentWitnessesArray => {
    const witnessHTML = `<section>
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

// const hideWitnessList = () => {
//     contentTarget.innerHTML = ""
// }

// let witnessToggle = WitnessList
