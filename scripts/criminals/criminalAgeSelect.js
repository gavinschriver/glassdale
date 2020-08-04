const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".criminalListControls")

export const criminalAgeSelect = () => {
    return `<div class="radiobox" id="ageSelectBox">
    <input type="radio" id="ageGroup1" value="0-25" name="response">
    <label for="ageGroup1">Ages: 0-25</label>

    <input type="radio" id="ageGroup2" value="25-50" name="response">
    <label for="ageGroup2">Ages: 25-50</label>

    <input type="radio" id="ageGroup3" value="50+" name="response">
    <label for="ageGroup3">Ages: 50+</label>
  </div>`
}

eventHub.addEventListener("change", (changeEvent) => {
    if (changeEvent.target.id.startsWith("age")) {
      const selectedAgeRange = changeEvent.target.value;
  
      const ageRangeSelectEvent = new CustomEvent("ageRangeSelected", {
        detail: {
          ageRange: selectedAgeRange
        }
      });
  
      eventHub.dispatchEvent(ageRangeSelectEvent);
      // alert(selectedAgeRange);
    }
  });
