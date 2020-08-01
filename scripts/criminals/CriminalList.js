import { getCriminals, useCriminals } from "./CriminalProvider.js"; //in this Module, we need to GET the criminals AND use them 
import { CriminalHTMLConverter } from "./CriminalHTMLRepresenter.js";
import { useConvictions } from "../convictions/ConvictionProvider.js";
import { useOfficers } from "../officers/OfficerProvider.js";

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".criminalsContainer")



eventHub.addEventListener("crimeWasChosen", convictionSelectEvent => {
    console.log(convictionSelectEvent)
    const crimeFromSelector = convictionSelectEvent.detail.IDofTheCrimeThatWasChosen 

    const crimeArray = useConvictions() 
    const matchingCrime = crimeArray.find(currentCrimeObj => { 
        return parseInt(crimeFromSelector) === currentCrimeObj.id   
    })                                                              

    const criminalsArray = useCriminals() 

    const matchingCriminals = criminalsArray.filter(currentCriminalObj => { 
        return matchingCrime.name === currentCriminalObj.conviction
    })

    render(matchingCriminals) 

}) 

eventHub.addEventListener("officerChosen", officerSelectEvent => {
    const officerFromSelector = officerSelectEvent.detail.officerId

    const officersArray = useOfficers() //not necessary if we use the officer NAME prop from the objects as the value in the dropdown
    const matchingOfficer = officersArray.find(officerObj => {
        return parseInt(officerFromSelector) === officerObj.id      
    })

    const criminalsArray = useCriminals()
    const matchingCriminals = criminalsArray.filter(criminalObj => {
        return matchingOfficer.name === criminalObj.arrestingOfficer
    })

    render(matchingCriminals)

})

eventHub.addEventListener("hideCriminalsPressed", hideCriminalsEvent => {
    contentTarget.innerHTML = ""
})

eventHub.addEventListener("showAllCriminalsPressed", showAllCriminalsEvent => {
    const criminalsArray = useCriminals()
    render(criminalsArray)  
})


// const render = specificArrayOfCriminals => {
//     let currentCriminalsAsHTML = ""

//     specificArrayOfCriminals.forEach(criminalToBeRepresented => {                   
//         currentCriminalsAsHTML += CriminalHTMLConverter(criminalToBeRepresented)
//     })

//     contentTarget.innerHTML = currentCriminalsAsHTML

// }

const render = specificArrayOfCriminals => {
    const fullCriminalHTML = 
           specificArrayOfCriminals.map(criminalToBeRepresented => {
               return CriminalHTMLConverter(criminalToBeRepresented)
           }).join("") 

    contentTarget.innerHTML = `${fullCriminalHTML}`

}


export const CriminalList = () => {
    
    getCriminals()
    .then( () => {
        const criminalArray = useCriminals()
        render(criminalArray)       
    })
    
    
}