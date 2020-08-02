const eventHub = document.querySelector(".container")
eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("alibis--")) {

        const [prefix, clickedCriminalId] = clickEvent.target.id.split("--")
        const alibiButtonEvent = new CustomEvent("alibiButtonClicked", {
            detail: {
                criminalObjId: clickedCriminalId
            }
        })
        eventHub.dispatchEvent(alibiButtonEvent)
        console.log(alibiButtonEvent)
    }
})

export const CriminalHTMLConverter = (criminalObj) => {
    return `
    <section class="criminal card">
        <div class="criminal__name">${criminalObj.name}</div>
        <div class="criminal__age">Age: ${criminalObj.age}</div>
        <div class="criminal__conviction">Crime: ${criminalObj.conviction}</div>
        <div class="criminal__termStart">Term Start:${new Date(criminalObj.incarceration.start).toLocaleString('en-US')}</div>
        <div class="criminal__termEnd">Term End:${new Date(criminalObj.incarceration.end).toLocaleString('en-US')}</div>
        <button id="alibis--${criminalObj.id}">Alibis</button>
    </section>
    `
}