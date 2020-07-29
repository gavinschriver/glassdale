import { useNotes, getNotes } from "./NoteProvider.js"
import { Note } from "./Note.js";

const contentTarget = document.querySelector(".notesListContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("noteStateChanged", customEvent => {
    
})


const render = notes => {
    return `
            <h2>Field Notes:</h2>
            ${
                notes.map(note => 
                    Note(note)).join("")
            }
            `
}


export const NoteList = () => {
    
    getNotes()
    .then( () => {
        const notesArray = useNotes()
        contentTarget.innerHTML = render(notesArray) 
        console.log(notesArray)        
    })
    
    
}