import { NoteForm } from "./notes/NoteForm.js";
import "./notes/NoteList.js";
import { criminalListControls } from "./criminals/criminalListControls.js";
import { CriminalList } from "./criminals/CriminalList.js";
import { WitnessList } from "./witnesses/witnessList.js";
import { witnessButton } from "./witnesses/witnessesButton.js";
import { witnessListControls } from "./witnesses/witnessListControls.js";
import "./criminals/AlibiList.js";
import "./witnesses/witnessList.js";
import { FacilityList } from "./facility/FacilityList.js";

CriminalList();
NoteForm();
criminalListControls();
WitnessList();
witnessListControls();
witnessButton();
FacilityList();
