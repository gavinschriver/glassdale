import { CriminalList} from "./criminals/CriminalList.js";
import "./notes/NoteList.js";
import { ConvictionSelect} from "./convictions/ConvictionSelect.js";
import { OfficerSelect } from "./officers/OfficerSelect.js";
import { NoteForm } from "./notes/NoteForm.js";
import { hideCriminalsButton } from "./criminals/hideCriminalListButton.js";
import { showAllCriminalsButton } from "./criminals/showAllCriminalsButton.js";
import { criminalListControls } from "./criminals/criminalListControls.js";
import "./criminals/AlibiList.js"
import { WitnessList } from "./witnesses/witnessList.js";

CriminalList()
ConvictionSelect()
OfficerSelect()
NoteForm()
hideCriminalsButton()
showAllCriminalsButton()
criminalListControls()
WitnessList()

// getWitnesses()
//     .then ( () => {
//        useWitnesses()
//     })
//     .then ( () => {
//         console.log(witness(useWitnesses()[0]))
//         }
//     )