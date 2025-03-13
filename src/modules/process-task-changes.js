import { taskCollection, taskGroups, changeGroupName } from "./task-utility-functions.js";

export function processGroupChanges(groupChangeLog) {



}

/*
    Changes to perform:

    Validate the object - if validation returns false => raise error in modal => exit function
    Change color labels
    Get both old and new group names for a selected group
    Names => change group name => fetch all tasks with the given group name => change their group name to the new one
    Listing Positions => update group names => update positioning
    Color Label Object => update group names
*/