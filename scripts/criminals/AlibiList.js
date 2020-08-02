import { useCriminals } from "./CriminalProvider.js"


let alibiContentTarget 
const eventHub = document.querySelector(".container")


eventHub.addEventListener("alibiButtonClicked", alibiClickEvent => {
    alibiContentTarget = document.querySelector(`#alibi_list${parseInt(alibiClickEvent.detail.criminalId)}`)
    const criminalClickID = alibiClickEvent.detail.criminalId // so here, criminalClickID will be a string w/ number in it
    alibiButtonToggle(criminalClickID)
    if (alibiButtonToggle === AlibiList) {
        alibiButtonToggle = hideAlibis
    } else if (alibiButtonToggle === hideAlibis) {
        alibiButtonToggle = AlibiList
    }
})

const renderAlibis = (criminalsArray, criminalClickID) => {

    const criminalMatch = criminalsArray.find(criminalObj => {
        return (criminalObj.id === parseInt(criminalClickID))
    })
    const alibiData = 
                        `
                        List of known associates for ${criminalMatch.name}:
                        ${
                          criminalMatch.known_associates.map(associate => {
                              return `Associate Name: ${associate.name} Associate Alibi: ${associate.alibi}`
                          }).join("")
                        }`
    alibiContentTarget.innerHTML += alibiData
}

export const AlibiList = criminalClickID => {
    const criminals = useCriminals()
    renderAlibis(criminals, criminalClickID)
}

const hideAlibis = () => {
    alibiContentTarget.innerHTML = ""
}

let alibiButtonToggle = AlibiList












