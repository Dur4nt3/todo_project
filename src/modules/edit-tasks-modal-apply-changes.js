import { taskCollection } from "./task-utility-functions.js";
import { prepareForPatternChange, getClusterSize, findOrigin, getClusterTasks } from "./repetitive-task-utilities.js";
import { generateRepetition } from "./repetition-generator.js";
import { informationChangeModalInteractivity, deadlineChangeModalInteractivity } from "./repetitive-tasks-confirmation-modals-interactivity.js";
import { updateBasicTasks, updateDatedGroupedTasks, updateDatedTasks, updateGroupedTasks, updateRepetitiveGroupedTasks, updateRepetitiveTasks } from "./update-local-storage.js";

function applyBasicChanges(originalTask, taskDataObj, utility = true) {
    originalTask.title = taskDataObj.name;
    originalTask.description = taskDataObj.description;
    originalTask.priority = taskDataObj.priority;

    if (utility === false) {
        updateBasicTasks(taskCollection["basic"]);
    }

    return true;
}

function applyGroupedChanges(originalTask, taskDataObj, utility = true) {
    applyBasicChanges(originalTask, taskDataObj);

    if (Array.isArray(taskDataObj.group) && taskDataObj.group[0] === "__unlisted__") {
        originalTask.removeListing();
    }
    else {
        originalTask.group = taskDataObj.group;
    }

    if (utility === false) {
        updateGroupedTasks(taskCollection["grouped"]);
    }

    return true;
}

function applyDatedChanges(originalTask, taskDataObj, utility = true) {
    applyBasicChanges(originalTask, taskDataObj);

    originalTask.allDay = taskDataObj.allDay;
    originalTask.deadline = taskDataObj.timedDeadline;

    if (utility === false) {
        updateDatedTasks(taskCollection["dated"]);
    }

    return true;
}

function applyDatedGroupedChanges(originalTask, taskDataObj, utility = true) {
    applyGroupedChanges(originalTask, taskDataObj);
    applyDatedChanges(originalTask, taskDataObj);

    if (utility === false) {
        updateDatedGroupedTasks(taskCollection["datedGrouped"]);
    }

    return true;
}

function getRequestedChanges(originalTask, taskDataObj) {
    let changes = [];
    if (originalTask.title !== taskDataObj.name) {
        changes.push("title");
    }

    if (originalTask.description !== taskDataObj.description) {
        changes.push("description");
    }

    if (originalTask.priority !== taskDataObj.priority) {
        changes.push("priority");
    }
    
    if (originalTask.group !== taskDataObj.group) {
        changes.push("group");
    }

    return changes;
}

// Compares repetition values - returns true if they're equal, false otherwise
function compareRepetitionValue(task1, task2) {
    if (task1.repetitionPattern !== task2.repetitionPattern) {
        return false;
    }

    if (JSON.stringify(task1.repetitionValue) === JSON.stringify(task2.repetitionValue)) {
        return true;
    }

    return false;
}

function applyRepetitiveChanges(originalTask, taskDataObj, utility = true) {
    const parentModal = document.querySelector(".modal");
    const changes = getRequestedChanges(originalTask, taskDataObj);
    const origin = findOrigin(originalTask);

    // If details that prompt a modal appearance were entered this will ensure that the modal container won't be removed
    // Returning true exits both modal, with this variable this is prevented
    // This variable gives the power of removing and exiting to the modal that will appear
    let wait = false;

    // If a user decides to perform a change to the deadline, all other changes are unimportant as the target task will no longer be a part of the cluster
    // Therefore, this takes precedence over all other changes
    if (originalTask.deadline !== taskDataObj.timedDeadline) {
        wait = true;
        deadlineChangeModalInteractivity(parentModal, taskDataObj, originalTask.id);
    }


    if ((originalTask.repetitionPattern !== taskDataObj.repetitionPattern || !(compareRepetitionValue(originalTask, taskDataObj))) && wait === false) {
        prepareForPatternChange(origin);
        const clusterSize = getClusterSize(origin);
        const clusterTasks = getClusterTasks(origin);

        for (let i in clusterTasks) {
            clusterTasks[i].repetitionPattern = taskDataObj.repetitionPattern;
            clusterTasks[i].repetitionValue = taskDataObj.repetitionValue;
        }

        if (clusterSize === 1) {
            generateRepetition(origin, true);
        }
        else {
            generateRepetition(origin, false);
        }
    }

    if (changes.length !== 0 && wait === false) {
        wait = true;
        informationChangeModalInteractivity(parentModal, taskDataObj, changes, originalTask);
    }

    if (wait === false) {
        if (utility === false) {
            if (originalTask.group === undefined) {
                updateRepetitiveTasks(taskCollection["repetitive"]);
            }
            else {
                updateRepetitiveGroupedTasks(taskCollection["repetitiveGrouped"]);
            }
        }

        return true;
    }
}

export function editTasksApplyChanges(originalTask, taskDataObj, taskType) {
    switch (taskType) {
        case "basic":
            return applyBasicChanges(originalTask, taskDataObj, false);

        case "grouped":
            return applyGroupedChanges(originalTask, taskDataObj, false);

        case "dated":
            return applyDatedChanges(originalTask, taskDataObj, false);

        case "datedGrouped":
            return applyDatedGroupedChanges(originalTask, taskDataObj, false);

        case "repetitive":
            return applyRepetitiveChanges(originalTask, taskDataObj, false);

        case "repetitiveGrouped":
            return applyRepetitiveChanges(originalTask, taskDataObj, false);
        
        // This indicates that a modal error should be raised
        default:
            return false;
    }
}