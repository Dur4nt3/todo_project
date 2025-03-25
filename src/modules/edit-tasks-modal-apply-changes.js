import { prepareForPatternChange } from "./repetitive-task-utilities.js";
import { generateRepetition } from "./repetition-generator.js";

function applyBasicChanges(taskDataObj) {

}

function applyGroupedChanges(taskDataObj) {

}

function applyDatedChanges(taskDataObj) {

}

function applyDatedGroupedChanges(taskDataObj) {

}

function applyRepetitiveChanges(taskDataObj) {
// Date change => remove from cluster
// name/description/group change => show confirmation modal
// pattern changes => prepare for changes with function
}

function applyRepetitiveGroupedChanges(taskDataObj) {

}

export function editTasksApplyChanges(taskDataObj, taskType) {
    switch (taskType) {
        case "basic":
            return applyBasicChanges(taskDataObj);

        case "grouped":
            return applyGroupedChanges(taskDataObj);

        case "dated":
            return applyDatedChanges(taskDataObj);

        case "datedGrouped":
            return applyDatedGroupedChanges(taskDataObj);

        case "repetitive":
            return applyRepetitiveChanges(taskDataObj);

        case "repetitiveGrouped":
            return applyRepetitiveGroupedChanges(taskDataObj);
        
        // This indicates that a modal error should be raised
        default:
            return false;
    }
}