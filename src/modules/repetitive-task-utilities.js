import { createRepetitiveTask, createRepetitiveGroupedTask } from "./create-task-objects.js";
import { taskCollection } from "./task-utility-functions.js";
import { add as increaseDate, sub as decreaseDate, getDay, startOfMonth, endOfMonth, differenceInCalendarDays } from "../../node_modules/date-fns";
import { removeFromTaskCollection } from "./task-removal.js";

// This module includes various utilities used in repetitive task related logic

// Used to find the origin task of an ungrouped repetitive task cluster
function findOriginUngrouped(clusterID) {
    for (let index in taskCollection.repetitive) {
        let task = taskCollection.repetitive[index];
        if (task.clusterID === clusterID && task.origin === true) {
            return task;
        }
    }
}

// Used to find the origin task of a grouped repetitive task cluster
function findOriginGrouped(clusterID) {
    for (let index in taskCollection.repetitiveGrouped) {
        let task = taskCollection.repetitiveGrouped[index];
        if (task.clusterID === clusterID && task.origin === true) {
            return task;
        }
    }
}

export function findOrigin(task) {
    if (task.group === undefined) {
        return findOriginUngrouped(task.clusterID);
    }
    else {
        return findOriginGrouped(task.clusterID);
    }
}

// Finds the latest task in the cluster (for ungrouped repetitive tasks)
function findLatestInRepetitive(clusterID) {
    let latestDate = findOriginUngrouped(clusterID).deadline;

    for (let taskIndex in taskCollection.repetitive) {
        if (taskCollection.repetitive[taskIndex].clusterID === clusterID) {
            if (Date.parse(taskCollection.repetitive[taskIndex].deadline) > Date.parse(latestDate)) {
                latestDate = taskCollection.repetitive[taskIndex].deadline;
            }
        }
    }

    return latestDate;
}

// Finds the latest task in the cluster (for grouped repetitive tasks)
function findLatestInRepetitiveGrouped(clusterID) {
    let latestDate = findOriginGrouped(clusterID).deadline;

    for (let taskIndex in taskCollection.repetitiveGrouped) {
        if (taskCollection.repetitiveGrouped[taskIndex].clusterID === clusterID) {
            if (Date.parse(taskCollection.repetitiveGrouped[taskIndex].deadline) > Date.parse(latestDate)) {
                latestDate = taskCollection.repetitiveGrouped[taskIndex].deadline;
            }
        }
    }

    return latestDate;
}

// Execute the correct "findLatest" type of function based on the task type
export function findLatest(clusterID, group) {
    let latestDate;

    if (group === undefined) {
        latestDate = findLatestInRepetitive(clusterID);
    }
    else {
        latestDate = findLatestInRepetitiveGrouped(clusterID);
    }

    return latestDate;
}


// Utility for creating ungrouped/grouped repetitive sub-tasks via the origin and a new deadline
export function createRepetitiveSubTask(repetitiveTask, newDeadline) {
    // For grouped tasks
    if (repetitiveTask.group !== undefined) {
        createRepetitiveGroupedTask(repetitiveTask.title, repetitiveTask.description, repetitiveTask.group,
            newDeadline, repetitiveTask.allDay, repetitiveTask.repetitionPattern, 
            repetitiveTask.repetitionValue, false, repetitiveTask.priority, repetitiveTask.clusterID
            );
    }
    // For ungrouped tasks
    else {
        createRepetitiveTask(repetitiveTask.title, repetitiveTask.description, newDeadline,
            repetitiveTask.allDay, repetitiveTask.repetitionPattern, repetitiveTask.repetitionValue, false,
            repetitiveTask.priority, repetitiveTask.clusterID
            );
    }
}

// Handles inconsistencies between the latest appearance's day and the days specified in the pattern value
// Relevant when the day of the latest appearance isn't in the pattern's value 
// The above happens when changing patterns and/or creating new task clusters
export function handleDayPatternInconsistencies(latestAppearance, daysArray) {
    let newestLatest, currentDayIndex, inconsistent;
    if (!daysArray.includes(getDay(latestAppearance))) {
            newestLatest = findClosestOccurrence(daysArray, latestAppearance);
            currentDayIndex = daysArray.indexOf(getDay(newestLatest));
            inconsistent = true;
        }
    else {
            currentDayIndex = daysArray.indexOf(getDay(latestAppearance));
            newestLatest = latestAppearance;
            inconsistent = false;
        }

        return { inconsistent, currentDayIndex, newestLatest };
}



// Go back from the current date until the day of the week matches the first element in the hybrid-weekly pattern
export function jumpToFirstOccurrence(firstOccurrence, currentDate) {
    let targetDate = currentDate;

    while (getDay(targetDate) !== firstOccurrence) {
        targetDate = decreaseDate(targetDate, { "days": 1 });
    }

    return targetDate;
}

// Move forward from the current date until the day of the week matches the next element in the hybrid-weekly pattern
export function jumpToNextOccurrence(nextOccurrence, currentDate) {
    let targetDate = currentDate;

    while (getDay(targetDate) !== nextOccurrence) {
        targetDate = increaseDate(targetDate, { "days": 1 });
    }
    return targetDate;
}

// Move forward from the current date until the day of the week matches the an element in the hybrid-weekly
export function findClosestOccurrence(days, currentDate) {
    let targetDate = currentDate;

    while (!days.includes(getDay(targetDate))) {
        targetDate = increaseDate(targetDate, { "days": 1 });
    }

    return targetDate;
}

// Find the first occurrence of the specified day in the specified month and year
// The month and the year are pulled from the given date
export function findFirstOccurrenceOfMonth(day, date) {
    let targetDate = startOfMonth(date);

    while (getDay(targetDate) !== day) {
        targetDate = increaseDate(targetDate, { "days": 1 });
    }

    return targetDate;
}

// Find the 1st/2nd/3rd/4th occurrence of a specified day in the specified month and year
export function findAnOccurrence(day, occurrence, date) {
    let targetDate = findFirstOccurrenceOfMonth(day, date);

    targetDate = increaseDate(targetDate, { "weeks": (occurrence-1) });

    return targetDate;
}

// Find the last occurrence of a specified day in the specified month and year
// This function might return the same result as 'findAnOccurrence' depending on the selected day and month
export function findLastOccurrence(day, date) {
    let targetDate = endOfMonth(date);

    while(getDay(targetDate) !== day) {
        targetDate = decreaseDate(targetDate, { "days": 1 });
    }

    return targetDate;
}

// Prepares a task cluster for pattern changes (values, types)
// This effectively remove all future tasks
export function prepareForPatternChange(taskObj) {
    let origin;
    let grouped;
    if (taskObj.group === undefined) {
        origin = findOriginUngrouped(taskObj.clusterID);
        grouped = false;
    }
    else {
        origin = findOriginGrouped(taskObj.clusterID);
        grouped = true;
    }

    const tasksToDeleteIDs = [];
    const currentDate = new Date();

    if (grouped) {
        for (let i in taskCollection.repetitiveGrouped) {
            let task = taskCollection.repetitiveGrouped[i];

            if (task.clusterID !== taskObj.clusterID || task.origin === true || (task.deadline === origin.deadline && task.origin === false)) {
                continue;
            }

            if (Date.parse(task.deadline) > Date.parse(currentDate) && differenceInCalendarDays(Date.parse(task.deadline), currentDate) >= 1) {
                tasksToDeleteIDs.push(task.id);
                continue;
            }
        }

        for (let i in tasksToDeleteIDs) {
            removeFromTaskCollection(tasksToDeleteIDs[i], "repetitiveGrouped");
        }
    }
    else {
        for (let i in taskCollection.repetitive) {
            let task = taskCollection.repetitive[i];

            if (task.clusterID !== taskObj.clusterID || task.origin === true || (task.deadline === origin.deadline && task.origin === false)) {
                continue;
            }

            if (Date.parse(task.deadline) > Date.parse(currentDate) && differenceInCalendarDays(Date.parse(task.deadline), currentDate) >= 1) {
                tasksToDeleteIDs.push(task.id);
                continue;
            }
        }
        
        for (let i in tasksToDeleteIDs) {
            removeFromTaskCollection(tasksToDeleteIDs[i], "repetitive");
        }
    }

    return;
}

// Relevant when trying to determine whether an initialization is needed or not
// If the only task in the cluster is the origin (i.e., length === 1) an initialization is required
export function getClusterSize(taskObj) {
    let count = 0;

    // Fallback if taskObj is invalid
    if (taskObj.clusterID === undefined) {
        return count;
    }


    if (taskObj.group === undefined) {
        for (let i in taskCollection.repetitive) {
            let task = taskCollection.repetitive[i];

            if (task.clusterID === taskObj.clusterID) {
                count++;
            } 
        }
    }
    else {
        for (let i in taskCollection.repetitiveGrouped) {
            let task = taskCollection.repetitiveGrouped[i];

            if (task.clusterID === taskObj.clusterID) {
                count++;
            }
        }
    }

    return count;
}

// Returns an array with all tasks within the cluster
export function getClusterTasks(taskObj) {
    let tasksArray = [];

    // Fallback if taskObj is invalid
    if (taskObj.clusterID === undefined) {
        return count;
    }


    if (taskObj.group === undefined) {
        for (let i in taskCollection.repetitive) {
            let task = taskCollection.repetitive[i];

            if (task.clusterID === taskObj.clusterID) {
                tasksArray.push(task);
            }
        }
    }
    else {
        for (let i in taskCollection.repetitiveGrouped) {
            let task = taskCollection.repetitiveGrouped[i];
            
            if (task.clusterID === taskObj.clusterID) {
                tasksArray.push(task);
            }
        }
    }

    return tasksArray;
}