import { saveNote } from "./NoteProvider.js"
import { noteToggleButton} from "./NoteListToggle.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        console.log(clickEvent.target.className)
        const newNote = {
            inputText: document.querySelector("#note-text").value,
            date: document.querySelector("#note-date").value
        }
        saveNote(newNote)
    }
})

eventHub.addEventListener("keypress", keyPressEvent => {
    if (keyPressEvent.charCode === 13) {
        
        const newNote = {
            inputText: document.querySelector("#note-text").value,
            date: document.querySelector("#note-date").value
        }
        
        saveNote(newNote)
    }
})

const render = () => {
    contentTarget.innerHTML = `
    <h1>Enter Note:</h1>
    <fieldset class="noteEntryField">
    <textarea id="note-text" placeholder="WASSAP"></textarea>
    <input type="date" id="note-date" value="2020-07-28">
    <button class="noteButton" id="saveNote">Save Note</button>
    ${noteToggleButton()}
    </fieldset>
    `
}

export const NoteForm = () => {
    render()
}

