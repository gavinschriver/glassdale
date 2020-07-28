import { CriminalList } from "./criminals/CriminalList.js";
import { ConvictionSelect} from "./convictions/ConvictionSelect.js"

//for logging purposes...
import { getCriminals, useCriminals} from "./criminals/CriminalProvider.js";
import { getConvictions, useConvictions} from "./convictions/ConvictionProvider.js";
import { getOfficers, useOfficers } from "./officers/OfficerProvider.js";

CriminalList()
ConvictionSelect()



//log out incoming data as logs:

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