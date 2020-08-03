import { getWitnesses, useWitnesses} from "./witnessProvider.js"
import { witness } from "./witnessHTML.js"

const contentTarget = document.querySelector(".witnessContainer")

const render = currentWitnessesArray => {
    const witnessHTML = `
                        ${
                            currentWitnessesArray.map(witnessObj => {
                                return witness(witnessObj)
                            }).join("")
                        }
                        `
    contentTarget.innerHTML = witnessHTML
}

export const WitnessList = () => {
    getWitnesses()
        .then( () => {
            const allWitnessesArray = useWitnesses()
            render(allWitnessesArray)
        })
}

