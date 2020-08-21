const contentTarget = document.querySelector(".facilityListControls");
const eventHub = document.querySelector(".container");

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "showFacilitiesButton") {
    const showFacilitiesEvent = new CustomEvent("showFacilitiesButtonClicked");
    eventHub.dispatchEvent(showFacilitiesEvent);
  }
});

export const FacilitiesButton = () => {
  const buttonHTML = `<button id="showWitnessesButton"> Show/Hide Facilities</button>`;
  contentTarget.innerHTML += buttonHTML;
};

//this scheme == witNessButton() combines render (blueprint to produce element AND DOM assignment) and List (pull in data from provider and call render "blueprint" to use it) functionalities
