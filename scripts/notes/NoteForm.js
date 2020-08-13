import { saveNote, saveUpdatedNote } from "./NoteProvider.js"
import { noteToggleButton} from "./NoteListToggle.js"
import { useNotes} from "./NoteProvider.js"
import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")


eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        const newNote = {
            inputText: document.querySelector("#note-text").value,
            date: document.querySelector("#note-date").value,
            criminalId: parseInt(document.querySelector("#note-criminal").value)
        }
        console.log(newNote)
        saveNote(newNote)

    } else if (clickEvent.target.id === "updateNoteButton") {
        const updatedNote = {
            id: document.querySelector(".updatedNoteId").id,
            inputText: document.querySelector("#updated-note-text").value,
            date: document.querySelector("#note-date").value,
            criminalId: parseInt(document.querySelector(".updated-note-criminal").id)
        }
        saveUpdatedNote(updatedNote)
    }
})



eventHub.addEventListener("editNoteButtonClicked", editNoteEvent => {
    const selectedNoteObjId = parseInt(editNoteEvent.detail.DOMidOfNoteToEdit)
    const currentNotes = useNotes()
    const matchingNote = currentNotes.find(noteObj => {
        return (noteObj.id === selectedNoteObjId)
    })
    
    contentTarget.innerHTML += 
    `<dialog id="noteEditForm">
    <form method="dialog" class="updated-note-criminal" id="${matchingNote.criminalId}">
    <div class="updated-note-prompt" id="">Check it out</div>
    <textarea id="updated-note-text" placeholder="">${matchingNote.inputText}</textarea>
    <button id="updateNoteButton">Save Updated Note</button>
    <div class="updatedNoteId" id="${matchingNote.id}"></div>
    </form>
    </dialog>`
    
    document.querySelector("#noteEditForm").showModal()

})



const render = (criminalArray) => {
    contentTarget.innerHTML = `
    <h1>Enter Note:</h1>
    <fieldset class="noteEntryField">
    <textarea id="note-text" placeholder="WASSAP"></textarea>
    <input type="date" id="note-date" value="2020-07-28" class="noteEntryField__criminal">
    <select type="dropdown" id="note-criminal">
        <option class="noteEntryField__criminal" value="0">Choose a baddy:</option>
            ${
                criminalArray.map(criminalObj => {
                    return `<option value="${criminalObj.id}">${criminalObj.name}</option>`
                }).join("")
            }
    </select>
    <button class="noteButton" id="saveNote">Save Note</button>
    ${noteToggleButton()}
    </fieldset>
    `
}

export const NoteForm = () => {
    getCriminals()
        .then(() => {
        const currentCriminalArray = useCriminals()
        render(currentCriminalArray) })
}


