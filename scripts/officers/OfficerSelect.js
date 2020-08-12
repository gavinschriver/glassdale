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

//the value of invoking officerSelect is the VALUE of 
//everything after that RETURN statement HAPPENING; which is essentially a state of BEING (not like, a number or string)
//the trutn value is an object that REPRESENTS something having happened or NOT

























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
