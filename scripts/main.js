import { CriminalList } from "./criminals/CriminalList.js";
import { getCriminals, useCriminals} from "./criminals/CriminalProvider.js";

CriminalList()

getCriminals().then(() => {
    let displayCriminals = useCriminals()
    console.table(displayCriminals)
})