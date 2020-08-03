import { useCriminals } from "./CriminalProvider.js"


let alibiContentTarget 
const eventHub = document.querySelector(".container")


eventHub.addEventListener("alibiButtonClicked", alibiClickEvent => {
    const criminalClickID = alibiClickEvent.detail.criminalId 
    alibiContentTarget = document.querySelector(`#alibi_list${parseInt(alibiClickEvent.detail.criminalId)}`)
    if (alibiContentTarget.className === "hidden") {
        AlibiList(criminalClickID)
        alibiContentTarget.className = "showing"
       } else if (alibiContentTarget.className === "showing") {
           hideAlibis()
           alibiContentTarget.className = "hidden"
       }
})

const renderAlibis = (criminalsArray, criminalClickID) => {

    const criminalMatch = criminalsArray.find(criminalObj => {
        return (criminalObj.id === parseInt(criminalClickID))
    })
    const alibiData = 
                        `
                        <section class="known_associates">List of known associates for ${criminalMatch.name}:<br><br>
                        ${
                          criminalMatch.known_associates.map(associate => {
                              return `<div class="associate_info">Associate Name: ${associate.name} <br> Associate Alibi: ${associate.alibi}</div>`
                          }).join("")
                        }<section>`
    alibiContentTarget.innerHTML = alibiData
}

export const AlibiList = criminalClickID => {
    const criminals = useCriminals()
    renderAlibis(criminals, criminalClickID)
}

const hideAlibis = () => {
    alibiContentTarget.innerHTML = ""
}













