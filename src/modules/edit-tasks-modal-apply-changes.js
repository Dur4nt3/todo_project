import { prepareForPatternChange, getClusterSize, getClusterTasks } from "./repetitive-task-utilities.js";
import { generateRepetition } from "./repetition-generator.js";
import { datedGroupedToDated, repetitiveGroupedToDatedGrouped, repetitiveToDated } from "./convert-task-type.js";

function applyBasicChanges(originalTask, taskDataObj) {
    originalTask.title = taskDataObj.name;
    originalTask.description = taskDataObj.description;
    originalTask.priority = taskDataObj.priority;
}

function applyGroupedChanges(originalTask, taskDataObj) {
    applyBasicChanges(originalTask, taskDataObj);

    if (Array.isArray(taskDataObj.group) && taskDataObj.group[0] === "__unlisted__") {
        originalTask.removeListing();
    }
    else {
        originalTask.group = taskDataObj.group;
    }
}

function applyDatedChanges(originalTask, taskDataObj) {
    applyBasicChanges(originalTask, taskDataObj);

    originalTask.allDay = taskDataObj.allDay;
    originalTask.deadline = taskDataObj.timedDeadline;
}

function applyDatedGroupedChanges(originalTask, taskDataObj) {
    applyGroupedChanges(originalTask, taskDataObj);
    applyDatedChanges(originalTask, taskDataObj);
}

function applyRepetitiveChanges(originalTask, taskDataObj) {
// Date change => create dated/datedGrouped duplicate and remove task
// name/description/group/priority change => show confirmation modal
// pattern changes => prepare for changes with function => change the pattern of all remaining tasks within the cluster => generate
}

function applyRepetitiveGroupedChanges(originalTask, taskDataObj) {

}

export function editTasksApplyChanges(originalTask, taskDataObj, taskType) {
    switch (taskType) {
        case "basic":
            return applyBasicChanges(originalTask, taskDataObj);

        case "grouped":
            return applyGroupedChanges(originalTask, taskDataObj);

        case "dated":
            return applyDatedChanges(originalTask, taskDataObj);

        case "datedGrouped":
            return applyDatedGroupedChanges(originalTask, taskDataObj);

        case "repetitive":
            return applyRepetitiveChanges(originalTask, taskDataObj);

        case "repetitiveGrouped":
            return applyRepetitiveGroupedChanges(originalTask, taskDataObj);
        
        // This indicates that a modal error should be raised
        default:
            return false;
    }
}