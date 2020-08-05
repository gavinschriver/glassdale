import { useNotes, getNotes } from "./NoteProvider.js"
import { Note } from "./Note.js";

const contentTarget = document.querySelector(".notesListContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.className === "note__editButton" ) {
        const editNoteButtonEvent = new CustomEvent("editNoteButtonClicked",
        { 
            detail: {
                id: clickEvent.target.id
            }
        })

        eventHub.dispatchEvent(editNoteButtonEvent)

    } else if (clickEvent.target.className === "note__deleteButton") {
        const deleteNoteButtonEvent = new CustomEvent("deleteNoteButtonClicked",
        {
            detail: {
                deleteId: clickEvent.target.id
            }
        })

        eventHub.dispatchEvent(deleteNoteButtonEvent)
        console.log(deleteNoteButtonEvent)

    }
})


eventHub.addEventListener("noteStateChanged", () => {
    if (noteToggle === hideNoteList)
    NoteList() 
})



eventHub.addEventListener("noteListToggled", () => {
    noteToggle()
    if (noteToggle === NoteList) {
        noteToggle = hideNoteList
    } else if (noteToggle === hideNoteList) {
        noteToggle = NoteList
    }
})




const render = notes => {
    const noteListArray = notes.map(noteObj => {
        return Note(noteObj)
    }).reverse().join("")
    
    contentTarget.innerHTML = `<h2>Field Notes:</h2>
    ${noteListArray}
    `
}


export const NoteList = () => {
    
    getNotes()
    .then( () => {
        const notesArray = useNotes()
        render(notesArray) 
    })
    
    
}


const hideNoteList = () => {
    contentTarget.innerHTML = ""
}

let noteToggle = NoteList
