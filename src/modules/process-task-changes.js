import { taskCollection, taskGroups, changeGroupName, listedGroups, appendToListed, groupsColorLabels } from "./task-utility-functions.js";
import { validateGroupChanges } from "./misc-input-validation.js";

// Updates all occurrences of the old group name to the new name
function updateNewGroupName(newName, oldName) {
    // Update the groupColorLabels object
    const currentColorLabel = groupsColorLabels[oldName];
    groupsColorLabels[newName] = currentColorLabel;
    delete groupsColorLabels[oldName];

    // Update the listedGroups object
    const listingIndex = listedGroups.indexOf(oldName);
    if (listingIndex !== -1) {
        listedGroups[listingIndex] = newName;
    }

    // Update the relevant tasks' group name
    // After updating the last task in the old group, the old group will automatically delete itself and be completely replaced by the new
    for (let taskType in taskCollection) {
        let nonGroupedTypes = ["basic", "dated", "repetitive"];

        // For tasks that aren't grouped
        if (nonGroupedTypes.includes(taskType)) {
            continue;
        }

        for (let i in taskCollection[taskType]) {
            let task = taskCollection[taskType][i];
            
            if (task.group === oldName) {
                task.group = newName;
            }
        }
    }

    // Update the taskGroups object
    // This is a fallback 
    // by the time we reach this line of code, the old group was already deleted and replaced by the new one (a result of the above loop)
    changeGroupName(newName, oldName);
}

export function processGroupChanges(groupChangeLog) {
    if (!validateGroupChanges(groupChangeLog)) {
        return false;
    }

    for (let i in groupChangeLog.newNames) {
        let newName = groupChangeLog.newNames[i];
        let oldName = groupChangeLog.currentNames[i];

        // If the name was changed, ensure to update all records of the group to the correct name
        if (newName !== oldName) {
            updateNewGroupName(newName, oldName);
        }

        // Update the color label
        groupsColorLabels[newName] = groupChangeLog.newColors[i];

        // Update the listing
        let newListing = groupChangeLog.newListings[i];
        let listingIndex = listedGroups.indexOf(newName);
        // If the new listing is blank and the selected group name was previously listed => remove it from the listing array
        if (newListing === "" && listingIndex !== -1) {
            listedGroups[listingIndex] = undefined;
        }
        // If the new listing isn't blank => update the listing array
        else if (newListing !== "") {
            appendToListed(newName, newListing);
        }
    }

    return true;
}