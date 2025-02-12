import { taskCollection, findOriginUngrouped, findOriginGrouped } from "./utility-functions.js";
import { add as increaseDate, differenceInHours, getYear, getMonth, getDate, getDay, format as formatDate } from "../../node_modules/date-fns";
import { createRepetitiveTask } from "../index.js";

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

    for (taskIndex in taskCollection.repetitiveGrouped) {
        if (taskCollection.repetitiveGrouped[taskIndex].clusterID === clusterID) {
            if (Date.parse(taskCollection.repetitiveGrouped[taskIndex].deadline) > Date.parse(latestDate)) {
                latestDate = taskCollection.repetitiveGrouped[taskIndex].deadline;
            }
        }
    }

    return latestDate;
}

// Execute the correct "findLatest" type of function based on the task type
function findLatest(clusterID, group) {
    let latestDate;

    if (group === undefined) {
        latestDate = findLatestInRepetitive(clusterID);
    }
    else {
        latestDate = findLatestInRepetitiveGrouped(clusterID);
    }

    return latestDate;
}

// Used to determine how long ahead to schedule tasks (for tasks with "time" repetition pattern)
function getCumulativeHoursTimePattern(patternValue) {
    let cumulativeHours = 0;

    for (let timePeriod in patternValue) {
        switch (timePeriod) {
            case "years":
                cumulativeHours+= (365*patternValue[timePeriod]*24);
                break;

            case "months":
                cumulativeHours+= (30*patternValue[timePeriod]*24);
                break;

            case "weeks":
                cumulativeHours+= (7*patternValue[timePeriod]*24);
                break;

            case "days":
                cumulativeHours+= (patternValue[timePeriod]*24);
                break;

            case "hours":
                cumulativeHours+= (patternValue[timePeriod]*1);
                break;
        }
    }
    return cumulativeHours;
}

// Used to determine how long ahead to schedule tasks (for tasks with "day" repetition pattern)
function getCumulativeHoursDayPattern(patternValue) {
    return (7 / patternValue.length * 24);
}

// Used to determine how long ahead to schedule tasks (for tasks with "hybrid" repetition pattern)
function getCumulativeHoursHybridPattern(patternValue) {
    return (getCumulativeHoursTimePattern(patternValue[1]) /
    getCumulativeHoursDayPattern(patternValue[0]));
}

// Execute the correct "getCumulativeHours" type of function based on the repetition pattern
function getCumulativeHours(patternType, patternValue) {
    let cumulativeHours = 0;

    switch (patternType) {
        case "time":
            cumulativeHours = getCumulativeHoursTimePattern(patternValue);
            break;

        case "day":
            cumulativeHours = getCumulativeHoursDayPattern(patternValue);
            break;

        case "hybrid":
            cumulativeHours = getCumulativeHoursHybridPattern(patternValue);
            break;
    }

    return cumulativeHours;
}

// Scheduling brackets depending on how frequent the task repeat itself
function determineScheduling(cumulativeHours) {
    // Less than 12 hours => 1 week ahead
    if (cumulativeHours <= 12) {
        return 7*24;
    }
    // Between 12 and 24 hours => 1 month ahead
    else if (12 < cumulativeHours && cumulativeHours <= 24) {
        return 30*24;
    }
    // Between 1 day and 1 week => 3 months ahead
    else if (24 < cumulativeHours && cumulativeHours <= 168) {
        return 90*24;
    }
    // Between 1 week and 2 weeks => 6 months ahead
    else if (168 < cumulativeHours && cumulativeHours <= 336) {
        return 180*24;
    }
    // Between 2 weeks and 1 month => 1 year ahead
    else if (336 < cumulativeHours && cumulativeHours <= 720) {
        return 365*24;
    }
    // Between 1 month and 3 months => 2 years ahead
    else if (720 < cumulativeHours && cumulativeHours <= 2160) {
        return 730*24;
    }
    // More than 3 months => 5 years ahead
    else if (cumulativeHours > 2160) {
        return 1825*24;
    }
}

// Format the deadline to ensure consistency in deadline property format across all task objects
function formateToDeadlineValue(date, time) {
    let formattedDate;

    let year = getYear(date).toString();
    let month = (getMonth(date) + 1).toString();
    let day = getDate(date).toString();

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }

    formattedDate = year+"-"+month+"-"+day;

    if (time) {
        formattedDate += time;
    }

    return formattedDate;
}

// Generation algorithm for repetitive tasks with the repetition pattern "time"
function generateTimeRepetition(task, latestAppearance) {
    let schedulingLimit = determineScheduling(getCumulativeHours(
        task.repetitionPattern, task.repetitionValue));

    let currentTime = new Date();
    let newestLatest = latestAppearance;

    let formattedDate;

    let time = '';
    let alterTime;

    // Determine how to format a sub tasks' deadline
    if (!task.allDay && task.repetitionValue["hours"] === undefined) {
        time = task.deadline.slice(-9);
        alterTime = false;
    }
    else if (!task.allDay && task.repetitionValue["hours"] !== undefined) {
        alterTime = true;
    }

    // Run until you hit the scheduling limit depicted in the function "determineScheduling"
    while (differenceInHours(Date.parse(newestLatest), Date.parse(currentTime)) < schedulingLimit) {
        newestLatest = increaseDate(newestLatest, task.repetitionValue);

        if (alterTime) {
            time = formatDate(newestLatest, "'T'HH:mm:ss");
        }

        formattedDate = formateToDeadlineValue(newestLatest, time);

        createRepetitiveTask(task.title, task.description, formattedDate, task.allDay,
            task.repetitionPattern, task.repetitionValue, false, task.priority, task.clusterID
        );
    }
}

// Generation algorithm for repetitive tasks with the repetition pattern "day"
function generateDayRepetition(task, latestAppearance) {
    let schedulingLimit = determineScheduling(getCumulativeHours(
        task.repetitionPattern, task.repetitionValue));

    let currentTime = new Date();
    let newestLatest = latestAppearance;

    let formattedDate;

    let time = '';
    let alterTime;

    // Determine how to format a sub tasks' deadline
    if (!task.allDay && task.repetitionValue["hours"] === undefined) {
        time = task.deadline.slice(-9);
        alterTime = false;
    }
    else if (!task.allDay && task.repetitionValue["hours"] !== undefined) {
        alterTime = true;
    }

    while (differenceInHours(Date.parse(newestLatest), Date.parse(currentTime)) < schedulingLimit) {
        newestLatest = increaseDate(newestLatest, { "days": 1 });

        if(task.repetitionValue.includes(getDay(newestLatest))) {
            if (alterTime) {
                time = formatDate(newestLatest, "'T'HH:mm:ss");
            }
    
            formattedDate = formateToDeadlineValue(newestLatest, time);
    
            createRepetitiveTask(task.title, task.description, formattedDate, task.allDay,
                task.repetitionPattern, task.repetitionValue, false, task.priority, task.clusterID
            );
        }
    }

}


export function generateRepetition(task) {
    // Not a relevant process for sub tasks
    if (task.origin === false) {
        return;
    }

    // Using "task.group" allows narrowing the search to one specific task type
    const latestAppearanceInCluster = findLatest(task.clusterID, task.group);

    switch (task.repetitionPattern) {
        case "time":
            generateTimeRepetition(task, latestAppearanceInCluster);
            break;

        case "day":
            generateDayRepetition(task, latestAppearanceInCluster);
            break;
        
        case "hybrid":
            generateHybridRepetition(task, latestAppearanceInCluster);
            break;
    }
}