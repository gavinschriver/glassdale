const eventHub = document.querySelector(".container")

eventHub.addEventListener("deleteNoteButtonClicked", deleteNoteEvent => {
    const [prefix, idString] = deleteNoteEvent.detail.deleteId.split("--")
    const parsedDeleteNoteId = parseInt(idString)
    deleteNote(parsedDeleteNoteId)
})


let notes = []

const dispatchStateChangeEvent = () => {
    const noteStateChangedEvent = new CustomEvent ("noteStateChanged")
    eventHub.dispatchEvent(noteStateChangedEvent)
    
}

export const useNotes = () => {
    return notes.slice()
}


export const getNotes = () => {
    return fetch('http://localhost:8088/notes') 
        .then(response => response.json())
        .then(parsedNotes => {
            notes = parsedNotes
        }
    )
}

export const saveNote = note => {
    return fetch('http://localhost:8088/notes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
    .then(getNotes)
    .then(dispatchStateChangeEvent)
}

///


export const saveUpdatedNote = updatedNote => {
    return fetch(`http://localhost:8088/notes/${parseInt(updatedNote.id)}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedNote)
    })
    .then(getNotes)
    .then(dispatchStateChangeEvent)
}

const deleteNote = IDofNoteToDelete => {
    return fetch(`http://localhost:8088/notes/${IDofNoteToDelete}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(getNotes)
    .then(dispatchStateChangeEvent)
}