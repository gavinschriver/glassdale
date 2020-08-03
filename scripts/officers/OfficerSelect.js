import { useOfficers, getOfficers } from "./OfficerProvider.js";

const eventHub = document.querySelector(".container")
const targetArea = document.querySelector(".filters__officer")

eventHub.addEventListener("change", eventObj => {
    if(eventObj.target.id === "officerSelect") {

        const officerCustomEvent = new CustomEvent("officerChosen", {
            detail: {
                officerId: eventObj.target.value
            }
        })

        eventHub.dispatchEvent(officerCustomEvent)

    }
})


const selectBarHTML = officersCollection => {
    
    return `
    <select class="dropdown" id="officerSelect">
        <option value="0">Please choose an officer</option>
        ${
            officersCollection.map(
                officerObj => {
                return `<option value="${officerObj.id}">${officerObj.name}</option>` 
            }).join("")
        }
        </select>
    `
}


export const OfficerSelect = () => {
    return getOfficers()
        .then( () => {
            const officers = useOfficers();
            return selectBarHTML(officers)
        
    })
}

























// const selectBarHTML = officersCollection => {
    
//     targetArea.innerHTML = `
//     <select class="dropdown" id="officerSelect">
//         <option value="0">Please choose an officer</option>
//         ${
//             officersCollection.map(
//                 officerObj => {
//                 return `<option value="${officerObj.id}">${officerObj.name}</option>` 
//             }).join("")
//         }
//         </select>
//     `
// }

// export const OfficerSelect = () => {
//     getOfficers().then(() => {
        
//         const officers = useOfficers();

//         selectBarHTML(officers)

//     })
// }
