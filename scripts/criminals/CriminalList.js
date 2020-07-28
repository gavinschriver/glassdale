import { getCriminals, useCriminals } from "./CriminalProvider.js"; //in this Module, we need to GET the criminals AND use them 
import { CriminalHTMLConverter } from "./CriminalHTMLRepresenter.js";
import { useConvictions } from "../convictions/ConvictionProvider.js";
import { useOfficers } from "../officers/OfficerProvider.js";

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".criminalsContainer")


eventHub.addEventListener("crimeWasChosen", convictionSelectEvent => {

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

    const officersArray = useOfficers()
    const matchingOfficer = officersArray.find(officerObj => {
        return parseInt(officerFromSelector) === officerObj.id      
    })

    const criminalsArray = useCriminals()

    const matchingCriminals = criminalsArray.filter(criminalObj => {
        return matchingOfficer.name === criminalObj.arrestingOfficer
    })

    render(matchingCriminals)

})


const render = specificArrayOfCriminals => {
    let currentCriminalsAsHTML = ""

    specificArrayOfCriminals.forEach(criminalToBeRepresented => {                   
        currentCriminalsAsHTML += CriminalHTMLConverter(criminalToBeRepresented)
    })

    contentTarget.innerHTML = currentCriminalsAsHTML

}


export const CriminalList = () => {
    
    getCriminals()
    .then( () => {
        const criminalArray = useCriminals()
        render(criminalArray)         
    })
    
    
}