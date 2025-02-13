import { formateToDeadlineValue } from "./task-utility-functions.js";
import { 
    initializeTaskCluster, createRepetitiveSubTask, findLatest,
    jumpToFirstOccurrence, jumpToNextOccurrence, findClosestOccurrence
} from "./repetitive-task-utilities.js";
import { add as increaseDate, differenceInHours, getDay, format as formatDate, sub as decreaseDate } from "../../node_modules/date-fns";
import * as taskScheduling from "./repetitive-task-scheduling.js";

// Generation algorithm for repetitive tasks with the repetition pattern "time"
function generateTimeRepetition(task, latestAppearance) {
    let schedulingLimit = taskScheduling.determineScheduling(taskScheduling.getCumulativeHours(
        task.repetitionPattern, task.repetitionValue));

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

        createRepetitiveSubTask(task, formattedDate);
    }
}

// Generation algorithm for repetitive tasks with the repetition pattern "day"
function generateDayRepetition(task, latestAppearance) {
    let schedulingLimit = taskScheduling.determineScheduling(taskScheduling.getCumulativeHours(
        task.repetitionPattern, task.repetitionValue));

    let newestLatest = latestAppearance;

    let formattedDate;

    let time = '';
    if (!task.allDay) {
        time = task.deadline.slice(-9);
    }


    while (differenceInHours(Date.parse(newestLatest), Date.parse(new Date())) < schedulingLimit) {
        newestLatest = increaseDate(newestLatest, { "days": 1 });

        if(task.repetitionValue.includes(getDay(newestLatest))) {
    
            formattedDate = formateToDeadlineValue(newestLatest, time);
    
            createRepetitiveSubTask(task, formattedDate);
        }
    }

}

function generateHybridWeeklyRepetition(task, latestAppearance) {
    let schedulingLimit = taskScheduling.determineScheduling(taskScheduling.getCumulativeHours(
        task.repetitionPattern, task.repetitionValue));

    let newestLatest = latestAppearance;

    let daysArray = task.repetitionValue[0];
    let currentDayIndex;

    let formattedDate;

    let time = '';
    if (!task.allDay) {
        time = task.deadline.slice(-9);
    }

    // Relevant to newly created repetitive tasks as they can be created on days not a part of the template
    if (!daysArray.includes(getDay(latestAppearance))) {
            newestLatest = findClosestOccurrence(daysArray, latestAppearance);

            formattedDate = formateToDeadlineValue(newestLatest, time);
            createRepetitiveSubTask(task, formattedDate);

            currentDayIndex = daysArray.indexOf(getDay(newestLatest));
    }
    else {
        currentDayIndex = daysArray.indexOf(getDay(latestAppearance));
    }


    while (differenceInHours(Date.parse(newestLatest), Date.parse(new Date())) < schedulingLimit) {
        if (currentDayIndex === daysArray.length - 1) {
            newestLatest = jumpToFirstOccurrence(daysArray[0], newestLatest);
            newestLatest = increaseDate(newestLatest, task.repetitionValue[1]);

            formattedDate = formateToDeadlineValue(newestLatest, time);
    
            createRepetitiveSubTask(task, formattedDate);
            currentDayIndex = 0;
        }
        else {
            newestLatest = jumpToNextOccurrence(daysArray[currentDayIndex+1], newestLatest);

            formattedDate = formateToDeadlineValue(newestLatest, time);
            createRepetitiveSubTask(task, formattedDate);
            currentDayIndex++;
        }
    }
}

function generateHybridMonthlyRepetition(task, latestAppearance) {

}


export function generateRepetition(task, initialization = false) {
    // Not a relevant process for sub tasks
    if (task.origin === false) {
        return;
    }

    // If this is the first time the generation function is run for a specific task => clone the origin
    // This is done because the origin is unlisted
    if (initialization) {
        initializeTaskCluster(task, task.group);
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
        
        case "hybrid-weekly":
            generateHybridWeeklyRepetition(task, latestAppearanceInCluster);
            break;

        case "hybrid-monthly":
            generateHybridMonthlyRepetition(task, latestAppearanceInCluster);
            break;
    }
}