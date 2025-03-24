import { validateGroup, validateDeadline } from "./task-utility-functions.js";
import { whiteSpacesAndDashesOnly } from "./text-input-validation.js";
import { isValidFormatted } from "./date-input-validation.js";
import { add } from "../../node_modules/date-fns";
import { isNumberInRange } from "./number-input-validation.js";

// This module validates task details to ensure a valid task can be created
// This module is used in conjunction with other to ensure the task is indeed valid
// Return values are either true or an array of errors

function validateTaskName(name) {
    if (!(whiteSpacesAndDashesOnly(name))) {
        return false;
    }

    if (name.length === 0 || name.length > 30) {
        return false;
    }

    return true;
}

function validateTaskDeadline(deadline, allDay, timedDeadline) {
    let deadlineIssues = [];

    if (!validateDeadline([deadline]) || !(isValidFormatted(deadline))) {
        deadlineIssues.push("deadline");
    }

    // The format for the timed deadline is invalid
    if (!(isValidFormatted(timedDeadline))) {
        deadlineIssues.push("time");
    }

    // A time wasn't specified
    else if (allDay === false && (deadline === timedDeadline)) {
        deadlineIssues.push("time");
    }

    // The time specified is invalid (doesn't uphold 5 years past and present limitation)
    else if (allDay === false && !(validateDeadline([timedDeadline]))) {
        deadlineIssues.push("time");
    }

    return deadlineIssues;
}

function validateBasicTaskDetails(taskDataObj) {
    let errors = []
    // Only the name needs to validated as an invalid priority default to 1 and descriptions can be any text
    if (!(validateTaskName(taskDataObj.name))) {
        errors.push("name");
        return errors;
    }

    return true;
}

function validateGroupedTaskDetails(taskDataObj) {
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

function validateDatedTaskDetails(taskDataObj) {
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

function validateDatedGroupedTaskDetails(taskDataObj) {
    const groupCheckOutput = validateGroupedTaskDetails(taskDataObj);
    const dateCheckOutput = validateDatedTaskDetails(taskDataObj);

    let errors = [];

    if (!(groupCheckOutput === true)) {
        errors = groupCheckOutput.slice();
    }
    if (!(dateCheckOutput === true)) {
        for (let i in dateCheckOutput) {
            if (!(errors.includes(dateCheckOutput[i]))) {
                errors.push(dateCheckOutput[i]);
            }
        }
    }

    if (errors.length === 0) {
        return true;
    }
    
    return errors;
}

function validateTimePatternDetails(taskDataObj) {
    if (taskDataObj.repetitionValue === undefined) {
        return ["timePattern"];
    }

    if (Object.keys(taskDataObj.repetitionValue) !== undefined) {
        if (Object.keys(taskDataObj.repetitionValue)[0] === "hours" && taskDataObj.allDay === true) {
            return ["hourlyAndAllDay"];
        }
    }

    if (add(new Date(), taskDataObj.repetitionValue) > add(new Date(), {years: 5})) {
        return ["timePattern"];
    }

    return true;
}

function validateDayPatternDetails(taskDataObj) {
    if (taskDataObj.repetitionValue === undefined) {
        return ["general"];
    }

    if (taskDataObj.repetitionValue.length === 0) {
        return ["dayPattern"];
    }

    for (let i in taskDataObj.repetitionValue) {
        if (!(isNumberInRange(taskDataObj.repetitionValue[i], 0, 6))) {
            return ["general"];
        }
    }

    const duplicateValues = {};
    let invalidSelection = false;
    taskDataObj.repetitionValue.forEach(day => duplicateValues[day] ? invalidSelection = true : duplicateValues[day] = true);

    if (invalidSelection) {
        return ["general"];
    }

    return true;
}

function validateHybridWeeklyPatternDetails(taskDataObj) {
    const day = { repetitionValue: taskDataObj.repetitionValue[0] };
    const time = { repetitionValue: taskDataObj.repetitionValue[1] };

    const dayCheckOutput = validateDayPatternDetails(day);
    const timeCheckOutput = validateTimePatternDetails(time);

    let errors = [];

    if (!(dayCheckOutput === true)) {
        errors = dayCheckOutput.slice();
    }
    
    if (!(timeCheckOutput === true)) {
        errors.push(timeCheckOutput[0]);
    }

    if (errors.length === 0) {
        return true;
    }

    return errors;
}

function validateHybridMonthlyPatternDetails(taskDataObj) {
    if (taskDataObj.repetitionValue === undefined) {
        return ["general"];
    }

    if (taskDataObj.repetitionValue.length === 0) {
        return ["hybridMonthlySelection"]
    }

    let errors = [];

    // End of Month option was selected
    if (taskDataObj.repetitionValue[0] === "e") {
        const time = { repetitionValue: taskDataObj.repetitionValue[1] };
        const timeCheckOutput = validateTimePatternDetails(time);

        if (!(timeCheckOutput === true)) {
            errors = timeCheckOutput.slice();
        }
    }

    // Specific Occurrence option was selected
    else if (taskDataObj.repetitionValue.length === 3) {
        if (!(isNumberInRange(taskDataObj.repetitionValue[0], 1, 4)) && taskDataObj.repetitionValue[0] !== "f") {
            return ["general"];
        }
        else if (!(isNumberInRange(taskDataObj.repetitionValue[1], 0, 6))) {
            return ["general"];
        }
    
        const time = { repetitionValue: taskDataObj.repetitionValue[2] };
        const timeCheckOutput = validateTimePatternDetails(time);

        if (!(timeCheckOutput === true)) {
            errors = timeCheckOutput.slice();
        }
    }

    else {
        return ["general"];
    }

    if (errors.length === 0) {
        return true;
    }

    return errors;

}

function validateRepetitiveTaskDetails(taskDataObj) {
    const patternList = ["time", "day", "hybrid-weekly", "hybrid-monthly"];
    
    // User tampered with the select input if this is true
    if (!(patternList.includes(taskDataObj.repetitionPattern))) {
        return ["general"];
    }

    let errors  = [];
    let output;

    // No need for a "default" as this line won't be reached if the repetition pattern isn't one of the below
    switch (taskDataObj.repetitionPattern) {
        case "time": 
            output = validateTimePatternDetails(taskDataObj);
            break;
        
        case "day": 
            output = validateDayPatternDetails(taskDataObj);
            break;
        
        case "hybrid-weekly": 
            output = validateHybridWeeklyPatternDetails(taskDataObj);
            break;
        
        case "hybrid-monthly": 
            output = validateHybridMonthlyPatternDetails(taskDataObj);
            break;
    }

    if (!(output === true)) {
        errors = output;
    }

    const dateCheckOutput = validateDatedTaskDetails(taskDataObj);

    if (!(dateCheckOutput === true)) {
        for (let i in dateCheckOutput) {
            if (!(errors.includes(dateCheckOutput[i]))) {
                errors.push(dateCheckOutput[i]);
            }
        }
    }

    if (errors.length === 0) {
        return true;
    }
    
    return errors;
}

function validateRepetitiveGroupedTaskDetails(taskDataObj) {
    const groupCheckOutput = validateGroupedTaskDetails(taskDataObj);
    const repetitiveCheckOutput = validateRepetitiveTaskDetails(taskDataObj);

    let errors = [];

    if (!(groupCheckOutput === true)) {
        errors = groupCheckOutput.slice();
    }
    if (!(repetitiveCheckOutput === true)) {
        for (let i in repetitiveCheckOutput) {
            if (!(errors.includes(repetitiveCheckOutput[i]))) {
                errors.push(repetitiveCheckOutput[i]);
            }
        }
    }

    if (errors.length === 0) {
        return true;
    }
    
    return errors;
}

export function validateTaskDetails(taskType, taskDataObj) {
    switch (taskType) {
        case "basic":
            return validateBasicTaskDetails(taskDataObj);

        case "grouped":
            return validateGroupedTaskDetails(taskDataObj);

        case "dated":
            return validateDatedTaskDetails(taskDataObj);

        case "datedGrouped":
            return validateDatedGroupedTaskDetails(taskDataObj);

        case "repetitive":
            return validateRepetitiveTaskDetails(taskDataObj);

        case "repetitiveGrouped":
            return validateRepetitiveGroupedTaskDetails(taskDataObj);
        
        // This indicates that a modal error should be raised
        default:
            return ["general"];
    }
}