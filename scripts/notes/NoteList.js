import { useNotes, getNotes } from "./NoteProvider.js";
import { Note } from "./Note.js";
import { useCriminals, getCriminals } from "../criminals/CriminalProvider.js";

const contentTarget = document.querySelector(".notesListContainer");
const eventHub = document.querySelector(".container");

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.className === "note__editButton") {
    const editNoteButtonEvent = new CustomEvent("editNoteButtonClicked", {
      detail: {
        DOMidOfNoteToEdit: clickEvent.target.id,
      },
    });

    eventHub.dispatchEvent(editNoteButtonEvent);
  } else if (clickEvent.target.className === "note__deleteButton") {
    const deleteNoteButtonEvent = new CustomEvent("deleteNoteButtonClicked", {
      detail: {
        deleteId: clickEvent.target.id,
      },
    });

    eventHub.dispatchEvent(deleteNoteButtonEvent);
    console.log(deleteNoteButtonEvent);
  }
});

eventHub.addEventListener("noteStateChanged", () => {
  if (noteToggle === hideNoteList) NoteList();
});

eventHub.addEventListener("noteListToggled", () => {
  noteToggle();
  if (noteToggle === NoteList) {
    noteToggle = hideNoteList;
  } else if (noteToggle === hideNoteList) {
    noteToggle = NoteList;
  }
});

const render = (notes, criminals) => {
  const noteListCollection = notes
    .map((noteObj) => {
      const relatedCriminalObj = criminals.find(
        (criminalObj) => criminalObj.id === noteObj.criminalId
      );
      return Note(noteObj, relatedCriminalObj);
    })
    .reverse()
    .join("");

  contentTarget.innerHTML = `<h2>Field Notes:</h2>
    ${noteListCollection}
    `;
};

export const NoteList = () => {
  getNotes()
    .then(getCriminals)
    .then(() => {
      const notesArray = useNotes();
      const criminalsArray = useCriminals();
      render(notesArray, criminalsArray);
    });
};

const hideNoteList = () => {
  contentTarget.innerHTML = "";
};

let noteToggle = NoteList;
