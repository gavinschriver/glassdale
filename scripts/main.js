import { CriminalList } from "./criminals/CriminalList.js";
import { ConvictionSelect} from "./convictions/ConvictionSelect.js"

//for logging purposes...
import { getCriminals, useCriminals} from "./criminals/CriminalProvider.js";
import { getConvictions, useConvictions} from "./convictions/ConvictionProvider.js";

CriminalList()
ConvictionSelect()



//log out incoming data as tables:

getCriminals().then(() => {
    let displayCriminals = useCriminals()
    console.table(displayCriminals)
})

getConvictions().then(() => {
    let displayConvictions = useConvictions()
    console.table(displayConvictions)
})