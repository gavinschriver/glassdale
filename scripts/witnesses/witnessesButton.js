const contentTarget = document.querySelector(".witnessListControlls")

export const witnessButton = () => {
    const buttonHTML = `<button> Show Witnesses</button>` 
    contentTarget.innerHTML += buttonHTML
}