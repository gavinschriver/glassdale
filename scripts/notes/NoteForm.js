import { saveNote, saveUpdatedNote } from "./NoteProvider.js"
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
        const updatedNote = {
            id: document.querySelector(".updatedNoteId").id,
            inputText: document.querySelector("#updated-note-text").value,
            date: document.querySelector("#note-date").value
        }
        
        saveUpdatedNote(updatedNote)
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
    <form method="dialog" id="">
    <div class="updated-note-prompt" id="">Check it out</div>
    <textarea id="updated-note-text" placeholder="">${matchingNote.inputText}</textarea>
    <button id="updateNoteButton">Save Updated Note</button>
    <div class="updatedNoteId" id="${matchingNote.id}"></div>
    </form>
    </dialog>`
    
    document.querySelector("#noteEditForm").showModal()

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


// eventHub.addEventListener("keypress", keyPressEvent => {
//     if (keyPressEvent.charCode === 13) {
        
//         const newNote = {
//             inputText: document.querySelector("#note-text").value,
//             date: document.querySelector("#note-date").value
//         }
        
//         saveNote(newNote)
//     }
// })