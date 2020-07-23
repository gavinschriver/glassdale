import { getCriminals, useCriminals } from "./CriminalProvider.js";
import { CriminalHTMLConverter } from "./CriminalHTMLRepresenter.js";

const contentTarget = document.querySelector(".criminalsContainer")

export const CriminalList = () => {
    
    getCriminals()
        .then(() => {
            const criminalArray = useCriminals()
            let criminalHTMLRepresentations = ""
            criminalArray.forEach(criminalObj => {
                criminalHTMLRepresentations += CriminalHTMLConverter(criminalObj)
            })

        contentTarget.innerHTML = criminalHTMLRepresentations

        }

    )
}