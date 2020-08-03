export const witness = witnessObject => {
    return `
        <div witness__name>${witnessObject.name}</div>
        <div witnesss_statements>${witnessObject.statements}</div>
        `
}