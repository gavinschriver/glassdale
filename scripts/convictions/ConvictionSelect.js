import { useConvictions, getConvictions} from "./ConvictionProvider.js"

const eventHub = document.querySelector(".container")
const targetArea = document.querySelector(".filters__crime")

eventHub.addEventListener("change", eventObj => {
    if (eventObj.target.id === "crimeSelect") { 

        const convinctionCustomEvent = new CustomEvent("crimeWasChosen", {
            detail: {
                IDofTheCrimeThatWasChosen: eventObj.target.value
            }       
        })

        eventHub.dispatchEvent(convinctionCustomEvent)

    }
})


const convictionsBarHTML = convictionsCollection => {

    return `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option> 
            ${
                convictionsCollection.map(
                    convictionObj => {
                        return `<option value="${ convictionObj.id}">${convictionObj.name}</option>`
                    }).join("")
            }
        </select>
        `
}

export const ConvictionSelect = () => {
    return getConvictions()
        .then( () => { 
            const convictions = useConvictions(); 
            return convictionsBarHTML(convictions)
    })
}

