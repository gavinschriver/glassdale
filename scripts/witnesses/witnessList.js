import { getWitnesses, useWitnesses } from "./witnessProvider.js";
import { witness } from "./witnessHTML.js";

const contentTarget = document.querySelector("#contentList");
const eventHub = document.querySelector(".container");

eventHub.addEventListener("showWitnessesButtonClicked", () => {
  if (contentTarget.className != "witnessesDisplayed") {
    const allWitnessesArray = useWitnesses();
    render(allWitnessesArray);
    contentTarget.className = "witnessesDisplayed";
  } else if (contentTarget.className === "witnessesDisplayed") {
    hideWitnessList();
    contentTarget.classList.remove("witnessesDisplayed");
  }
});

const render = (currentWitnessesArray) => {
  const witnessHTML = `<section>
                        ${currentWitnessesArray
                          .map((witnessObj) => {
                            return witness(witnessObj);
                          })
                          .join("")}
                        </section>`;
  contentTarget.innerHTML = witnessHTML;
};

export const WitnessList = () => {
  getWitnesses().then(() => {
    // const allWitnessesArray = useWitnesses()
    // render(allWitnessesArray)
  });
};

const hideWitnessList = () => {
  contentTarget.innerHTML = "";
};
