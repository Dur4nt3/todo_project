import { taskCollection, taskGroups } from "./task-utility-functions.js";

export function validateGroupChanges(groupChangeLog) {

}

/* 

Validations to perform:

Names => no new name is invalid (conflicting or above 30 characters)
Positioning => no duplicate values, no values above 4 and below 1, no non-numerical values apart from "" (blank string)
Color labels => no validation needed => even "bad" values can be accepted (invalid color default to white)

*/