import { useNotes, getNotes } from "./NoteProvider.js"
import { Note } from "./Note.js";

const contentTarget = document.querySelector(".notesListContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("noteStateChanged", customEvent => {
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
        render(notesArray) // in current setup w/ .map string being only thing returned, you gotta include this WHOLE line wherever you re-render your list based on an event; compare to render function in Criminal List,  
    })
    
    
}