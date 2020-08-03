export const witness = witnessObject => {
    return `
        <section class="witness__card">
            <div witness__name>${witnessObject.name}</div>
            <div witnesss_statements>${witnessObject.statements}</div>
        </section>
        `
}