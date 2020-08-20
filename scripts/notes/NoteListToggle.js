const eventHub = document.querySelector(".container");

eventHub.addEventListener("click", () => {
  if (event.target.id === "noteToggleButton") {
    const noteToggleEvent = new CustomEvent("noteListToggled");
    eventHub.dispatchEvent(noteToggleEvent);
  }
});

export const noteToggleButton = () => {
  return `<button id="noteToggleButton">Show/Hide Notes</button>`;
};
