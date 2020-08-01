const contentTarget = document.querySelector(".criminalListControls")

let criminalButtons = ""

export const criminalListControls = () => {
     criminalButtons = showAllCriminalsButton() + hideCriminalsButton()
    
     ConvictionSelect()
          .then(convictionDropDown => {

            criminalButtons += convictionDropDown
          }).then( () => {

      OfficerSelect()
          .then(officerDropDown => {

           criminalButtons += officerDropDown


           contentTarget.innerHTML =  
            `<h2>Find Criminals:</h2>` +
            criminalButtons

        })

}
