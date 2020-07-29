import { useNotes, getNotes } from "./NoteProvider.js"
import { Note } from "./Note.js";

const contentTarget = document.querySelector(".notesListContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("noteStateChanged", customEvent => {
    console.log(customEvent)
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
        contentTarget.innerHTML = render(notesArray) // in current setup w/ .map string being only thing returned, you gotta include this WHOLE line wherever you re-render your list based on an event; compare to render function in Criminal List,  
        console.log(notesArray)        
    })
    
    
}