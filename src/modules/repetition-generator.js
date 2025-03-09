import { formateToDeadlineValue } from "./task-utility-functions.js";
import * as repTaskUtil from "./repetitive-task-utilities.js";
import { add as increaseDate, differenceInHours, format as formatDate, endOfMonth } from "../../node_modules/date-fns";
import * as taskScheduling from "./repetitive-task-scheduling.js";

// This module is used to generate repetitive tasks based on an origin task

// Generation algorithm for repetitive tasks with the repetition pattern "time"
function generateTimeRepetition(task, latestAppearance, schedulingLimit) {
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
    while (differenceInHours(Date.parse(newestLatest), Date.parse(new Date())) < schedulingLimit) {
        newestLatest = increaseDate(newestLatest, task.repetitionValue);

        if (alterTime) {
            time = formatDate(newestLatest, "'T'HH:mm:ss");
        }

        formattedDate = formateToDeadlineValue(newestLatest, time);

        repTaskUtil.createRepetitiveSubTask(task, formattedDate);
    }
}

// Generation algorithm for repetitive tasks with the repetition pattern "day"
function generateDayRepetition(task, latestAppearance, schedulingLimit) {
    let newestLatest = latestAppearance;

    let daysArray = task.repetitionValue;
    let currentDayIndex;

    let inconsistent;

    let formattedDate;

    let time = '';
    if (!task.allDay) {
        time = task.deadline.slice(-9);
    }

    // Relevant when the day of the latest appearance isn't in the pattern's value 
    // The above happens when changing patterns and/or creating new task clusters
    ({ inconsistent, currentDayIndex, newestLatest } = repTaskUtil.handleDayPatternInconsistencies(
        latestAppearance, daysArray
    ));

    if (inconsistent) {
        formattedDate = formateToDeadlineValue(newestLatest, time);
        repTaskUtil.createRepetitiveSubTask(task, formattedDate);
    }

    while (differenceInHours(Date.parse(newestLatest), Date.parse(new Date())) < schedulingLimit) {
        if (currentDayIndex === daysArray.length - 1) {
            newestLatest = repTaskUtil.jumpToFirstOccurrence(daysArray[0], newestLatest);
            newestLatest = increaseDate(newestLatest, { "weeks": 1 });

            formattedDate = formateToDeadlineValue(newestLatest, time);
    
            repTaskUtil.createRepetitiveSubTask(task, formattedDate);
            currentDayIndex = 0;
        }
        else {
            newestLatest = repTaskUtil.jumpToNextOccurrence(daysArray[currentDayIndex+1], newestLatest);

            formattedDate = formateToDeadlineValue(newestLatest, time);
            repTaskUtil.createRepetitiveSubTask(task, formattedDate);
            currentDayIndex++;
        }
    }
}

function generateHybridWeeklyRepetition(task, latestAppearance, schedulingLimit) {
    let newestLatest = latestAppearance;

    let daysArray = task.repetitionValue[0];
    let currentDayIndex;

    let inconsistent;

    let formattedDate;

    let time = '';
    if (!task.allDay) {
        time = task.deadline.slice(-9);
    }

    // Relevant when the day of the latest appearance isn't in the pattern's value 
    // The above happens when changing patterns and/or creating new task clusters
    ({ inconsistent, currentDayIndex, newestLatest } = repTaskUtil.handleDayPatternInconsistencies(
        latestAppearance, daysArray
    ));

    if (inconsistent) {
        formattedDate = formateToDeadlineValue(newestLatest, time);
        repTaskUtil.createRepetitiveSubTask(task, formattedDate);
    }


    while (differenceInHours(Date.parse(newestLatest), Date.parse(new Date())) < schedulingLimit) {
        if (currentDayIndex === daysArray.length - 1) {
            newestLatest = repTaskUtil.jumpToFirstOccurrence(daysArray[0], newestLatest);
            newestLatest = increaseDate(newestLatest, task.repetitionValue[1]);

            formattedDate = formateToDeadlineValue(newestLatest, time);
    
            repTaskUtil.createRepetitiveSubTask(task, formattedDate);
            currentDayIndex = 0;
        }
        else {
            newestLatest = repTaskUtil.jumpToNextOccurrence(daysArray[currentDayIndex+1], newestLatest);

            formattedDate = formateToDeadlineValue(newestLatest, time);
            repTaskUtil.createRepetitiveSubTask(task, formattedDate);
            currentDayIndex++;
        }
    }
}

function generateHybridMonthlyRepetition(task, latestAppearance, schedulingLimit) {
    let newestLatest = latestAppearance;

    let formattedDate;

    let time = '';
    if (!task.allDay) {
        time = task.deadline.slice(-9);
    }

    let specificOccurrence = false;
    if (task.repetitionValue.length === 3) {
        specificOccurrence = true;
    }

    while (differenceInHours(Date.parse(newestLatest), Date.parse(new Date())) < schedulingLimit) {
        newestLatest = increaseDate(newestLatest, task.repetitionValue[task.repetitionValue.length - 1]);

        if (specificOccurrence) {
            if (Number.isInteger(task.repetitionValue[0])) {
                newestLatest = repTaskUtil.findAnOccurrence(
                    task.repetitionValue[1], task.repetitionValue[0],newestLatest
                );

                formattedDate = formateToDeadlineValue(newestLatest, time);
                repTaskUtil.createRepetitiveSubTask(task, formattedDate);
            }
            else {
                newestLatest = repTaskUtil.findLastOccurrence(task.repetitionValue[1], newestLatest);

                formattedDate = formateToDeadlineValue(newestLatest, time);
                repTaskUtil.createRepetitiveSubTask(task, formattedDate);
            }
        }
        else {
            newestLatest = endOfMonth(newestLatest);
            formattedDate = formateToDeadlineValue(newestLatest, time);
            repTaskUtil.createRepetitiveSubTask(task, formattedDate);
        }
    }
}


export function generateRepetition(task, initialization = false) {
    // Not a relevant process for sub tasks
    if (task.origin === false) {
        return;
    }

    // If this is the first time the generation function is run for a specific task => clone the origin
    // This is done because the origin is unlisted
    if (initialization) {
        repTaskUtil.createRepetitiveSubTask(task, task.deadline);
    }

    // Using "task.group" allows narrowing the search to one specific task type
    const latestAppearanceInCluster = repTaskUtil.findLatest(task.clusterID, task.group);

    // How long ahead to schedule
    const schedulingLimit = taskScheduling.determineScheduling(taskScheduling.getCumulativeHours(
        task.repetitionPattern, task.repetitionValue));

    switch (task.repetitionPattern) {
        case "time":
            generateTimeRepetition(task, latestAppearanceInCluster, schedulingLimit);
            break;

        case "day":
            generateDayRepetition(task, latestAppearanceInCluster, schedulingLimit);
            break;
        
        case "hybrid-weekly":
            generateHybridWeeklyRepetition(task, latestAppearanceInCluster, schedulingLimit);
            break;

        case "hybrid-monthly":
            generateHybridMonthlyRepetition(task, latestAppearanceInCluster, schedulingLimit);
            break;
    }
}