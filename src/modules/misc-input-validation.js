import { taskGroups, reservedGroups } from "./task-utility-functions.js";
import { isNumberInRange } from "./number-input-validation.js";

function validateGroupName(newName) {
    if (newName.length > 30 || Object.hasOwn(taskGroups, newName) || reservedGroups.includes(newName)) {
        return false;
    }

    return true;
}

function validateGroupListing(newListing, groupChangeLog) {
    if (newListing !== "") {
        if (!(isNumberInRange(newListing, 0, 4))) {
            return false;
        }
    }

    let count = 0;
    for (let i in groupChangeLog.newListings) {
        if (groupChangeLog.newListings[i] === newListing && groupChangeLog.newListings[i] !== "") {
            count++;
        }
    }

    if (count >= 2) {
        return false;
    }

    return true;
}


export function validateGroupChanges(groupChangeLog) {

    // Validates all group names
    for (let i in groupChangeLog.newNames) {
        if (groupChangeLog.newNames[i] != groupChangeLog.currentNames[i]) {
            if (!(validateGroupName(groupChangeLog.newNames[i]))) {
                return false;
            }
        }
    }

    for (let i in groupChangeLog.newListings) {
        if (!validateGroupListing(groupChangeLog.newListings[i], groupChangeLog)) {
            return false;
        }
    }

    return true;
}