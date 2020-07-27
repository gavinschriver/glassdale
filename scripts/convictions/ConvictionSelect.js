import { useConvictions, getConvictions} from "./ConvictionProvider.js"

const targetArea = document.querySelector(".filters__crime")

const render = convictionsCollection => {
    /* 
    Use interpolation here to invoke the map() method on
        the convictionsCollection to generate the option elements.
        Look back at the example provided above.
    */

targetArea.innerHTML = `
    <select class="dropdown" id="crimeSelect">
        <option value="0">Please select a crime...</option>
        ${
            convictionsCollection.map(
                convictionObj => {
                    return `<option>${convictionObj.name}</option>`
                }
            ).join("")
        }
    </select>
    `
}

export const ConvictionSelect = () => {
    getConvictions().then(() => { //invokes the getconvictions function to grab data and convert it into usable JSON format

    const convictions = useConvictions(); //invoking useConvictions() returns a copy of 

    render(convictions)
        // grab all convictions that have been imported into the application
    })
}

