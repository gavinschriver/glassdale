export const CriminalHTMLConverter = (criminalObj) => {
    return `
    <section class="criminal">
        <div class="criminal__name">Name: ${criminalObj.name}</div>
        <div class="criminal__age">Age: ${criminalObj.age}</div>
        <div class="criminal__conviction">Crime: ${criminalObj.conviction}</div>
        <div class="criminal__termStart">Term Start:${new Date(criminalObj.incarceration.start).toLocaleString('en-US')}</div>
        <div class="criminal__termEnd">Term End:${criminalObj.incarceration.end}</div>
    </section>
    `
}