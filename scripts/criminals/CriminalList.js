import { getCriminals, useCriminals } from "./CriminalProvider.js";
import { CriminalHTMLConverter } from "./CriminalHTMLRepresenter.js";
import { useConvictions } from "../convictions/ConvictionProvider.js";

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".criminalsContainer")

eventHub.addEventListener("crimeWasChosen", convictionSelectEvent => {
        
    const crimeFromSelector = convictionSelectEvent.detail.IDofTheCrimeThatWasChosen //IDofTheCrimeThatWasChosen is the "integer" coming back from your targeted <option> element

    const crimeArray = useConvictions() //produce the crime array from the convictions provider 
    const matchingCrime = crimeArray.find(currentCrimeObj => { //look thru crimes array and return the first value who's ID matches the "integer" defined above, from the target 
        return parseInt(crimeFromSelector) === currentCrimeObj.id   //THIS WHOLE THING = match "id" in TARGETED ELEMENT to value of id in criminal object, so essentially "looking up" the name of the selection crime by its ID
    })                                                              //output of this is ONLY 1 VALUE, the first object that matches

    const criminalsArray = useCriminals() //produce criminal array 

    const matchingCriminals = criminalsArray.filter(currentCriminalObj => { //look thru all objects in criminalsArray and, into a new array, pushes only those who's conviction property matches the crime name we looked up above
        return matchingCrime.name === currentCriminalObj.conviction
    })

    render(matchingCriminals) //pass the array of all the criminal objects in our new, "matched-to-a-single-crime-name-from-selector" array into a function that actually poops out HTML


}) //end listener callback 


const render = specificArrayOfCriminals => {
    let currentCriminalsAsHTML = ""

    //add the result of your per-criminal-object-into-html converter to the  big ol hmtl string declared above for each obj in whichever specific array youre passing in (e.g. all the criminals, or just the sorted ones from above etc)
    specificArrayOfCriminals.forEach(criminalToBeRepresented => {                   
        currentCriminalsAsHTML += CriminalHTMLConverter(criminalToBeRepresented)
    })

    //add the big old html list to the DOM 
    contentTarget.innerHTML = currentCriminalsAsHTML

}


//have to call use criminals AGAIN, SEPARATELY here becaus eof goddamn function scope christ; 
//when called, this function will return the value of invoking getCriminals, to first pull the data, and then invoking the render function on your starting, big ol original array of criminals (like, all that shit above only happens ON AN EVENT) 
export const CriminalList = () => {
    
    getCriminals()
        .then( () => {
            const criminalArray = useCriminals()
            render(criminalArray)         
    })

}