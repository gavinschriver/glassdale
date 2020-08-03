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

eventHub.addEventListener("hideCriminalsPressed", () => {
    if(!document.body.contains(document.getElementById("currentWitnessList")) ) {
    contentTarget.innerHTML = ""
    } 
})

eventHub.addEventListener("showAllCriminalsPressed", () => {
    const criminalsArray = useCriminals()
    render(criminalsArray)  
})


 /// for WHOLE CRIM LIS //
 

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

/* CriminalList in this scheme exports to main, so that its call to getCriminals executes when the page loads; that makes the useCriminals function in the provider available, which can
then be imported here; then, an EL callback will grab that copy of ALL data, and produce whatever specific version of the array it needs (aka filter/search/whatever), before passing that
newly specified array into render put generate actual page output and put it on the DOM

SO TECHNICALLY, this probably would work if getCriminals just ran by itself in main?
*/