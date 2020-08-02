export const CriminalHTMLConverter = (criminalObj) => {
    return `
    <section class="criminal card">
        <div class="criminal__name">${criminalObj.name}</div>
        <div class="criminal__age">Age: ${criminalObj.age}</div>
        <div class="criminal__conviction">Crime: ${criminalObj.conviction}</div>
        <div class="criminal__termStart">Term Start:${new Date(criminalObj.incarceration.start).toLocaleString('en-US')}</div>
        <div class="criminal__termEnd">Term End:${new Date(criminalObj.incarceration.end).toLocaleString('en-US')}</div>
        <button id="alibis---${criminalObj.id}">Alibis</button>
    </section>
    `
}