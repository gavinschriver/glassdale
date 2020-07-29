import { saveNote } from "./NoteProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        const newNote = {
            inputText: document.querySelector("#note-text").innerHTML,
            date: document.querySelector("#note-date").value
        }

        saveNote(newNote)
    }
})

const render = () => {
    contentTarget.innerHTML = `
    <input type="text" id="note-text"></input>
    <input type="date" id="note-date" value="2020-07-28">
    <button id="saveNote">Save Note</button>
    `
}

export const NoteForm = () => {
    render()
}

