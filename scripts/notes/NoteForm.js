import { saveNote } from "./NoteProvider.js"
import { noteToggleButton} from "./NoteListToggle.js"
import { useNotes, getNotes } from "./NoteProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")


eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        const newNote = {
            inputText: document.querySelector("#note-text").value,
            date: document.querySelector("#note-date").value
        }
        saveNote(newNote)

    } else if (clickEvent.target.id === "updateNoteButton") {
        console.log(document.querySelector("#updated-note-text").value)
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

eventHub.addEventListener("editNoteButtonClicked", editNoteEvent => {
    const selectedNoteId = parseInt(editNoteEvent.detail.id)
    const currentNotes = useNotes()
    const matchingNote = currentNotes.find(noteObj => {
        return (noteObj.id === selectedNoteId)
    })
    
    contentTarget.innerHTML += 
    `<dialog id="noteEditForm">
    <form method="dialog">
    <div>Check it out</div>
    <textarea id="updated-note-text" placeholder="${matchingNote.inputText}""></textarea>
    <button id="updateNoteButton">Save Updated Note</button>
    </form>
    </dialog>`

    document.querySelector("#noteEditForm").showModal()

    console.log(matchingNote.inputText)
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
