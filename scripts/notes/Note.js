export const Note = noteObject => {
    return `<section class="note card">
                <div class="note__text">${noteObject.inputText}</div>
                <div class="note__date">${noteObject.date}</div>
            </section>
    `
}