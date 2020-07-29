import { CriminalList } from "./criminals/CriminalList.js";
import { ConvictionSelect} from "./convictions/ConvictionSelect.js"
import { OfficerSelect } from "./officers/OfficerSelect.js";
import { NoteForm } from "./notes/NoteForm.js";

CriminalList()
ConvictionSelect()
OfficerSelect()
NoteForm()





//kenny loggin', test purposes only

import { getCriminals, useCriminals} from "./criminals/CriminalProvider.js";
import { getConvictions, useConvictions} from "./convictions/ConvictionProvider.js";
import { getOfficers, useOfficers } from "./officers/OfficerProvider.js";
getCriminals().then(() => {
    let displayCriminals = useCriminals()
    console.log(displayCriminals)
})

getConvictions().then(() => {
    let displayConvictions = useConvictions()
    console.log(displayConvictions)
})

getOfficers().then( () => {
    let displayOfficers = useOfficers()
    console.log(displayOfficers)
})