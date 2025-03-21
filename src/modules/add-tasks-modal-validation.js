import { validateGroup, validateDeadline } from "./task-utility-functions.js";
import { whiteSpacesAndDashesOnly } from "./text-input-validation.js";

// This module validates task details to ensure a valid task can be created
// This module is used in conjunction with other to ensure the task is indeed valid

function validateTaskName(name) {
    if (!(whiteSpacesAndDashesOnly)) {
        return false;
    }

    if (name.length === 0 || name.length > 30) {
        return false;
    }

    return true;
}

function validateTaskDeadline(deadline, allDay, timedDeadline) {
    let deadlineIssues = [];

    if (!validateDeadline([deadline])) {
        deadlineIssues.push("deadline");
    }

    // A time wasn't specified
    if (allDay === false && (deadline === timedDeadline)) {
        deadlineIssues.push("time");
    }

    // The time specified is invalid
    else if (allDay === false && !(validateDeadline([timedDeadline]))) {
        deadlineIssues.push("time");
    }

    return deadlineIssues;
}

export function validateBasicTaskDetails(taskDataObj) {
    let errors = []
    // Only the name needs to validated as an invalid priority default to 1 and descriptions can be any text
    if (!(validateTaskName(taskDataObj.name))) {
        errors.push("name");
        return errors;
    }

    return true;
}

export function validateGroupedTaskDetails(taskDataObj) {
    const basicCheckOutput = validateBasicTaskDetails(taskDataObj);

    let errors = []
    // This means there was an error in the basic details provided
    if (!(basicCheckOutput === true)) {
        errors = basicCheckOutput.slice();
    }

    if (!(validateGroup(taskDataObj.group)) || !(whiteSpacesAndDashesOnly(taskDataObj.group))) {
        errors.push("group");
    }

    if (errors.length === 0) {
        return true;
    }
    
    return errors;
}

export function validateDatedTaskDetails(taskDataObj) {
    const basicCheckOutput = validateBasicTaskDetails(taskDataObj);

    let errors = []
    // This means there was an error in the basic details provided
    if (!(basicCheckOutput === true)) {
        errors = basicCheckOutput.slice();
    }

    let deadlineIssues = validateTaskDeadline(taskDataObj.deadline, taskDataObj.allDay, taskDataObj.timedDeadline);

    if (deadlineIssues.length !== 0) {
        for (let i in deadlineIssues) {
            errors.push(deadlineIssues[i]);
        }
    }

    if (errors.length === 0) {
        return true;
    }
    
    return errors;
}