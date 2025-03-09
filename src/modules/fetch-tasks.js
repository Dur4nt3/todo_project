import { taskCollection, determineTaskType } from "./task-utility-functions.js";
import { getYear, getMonth, getDate, isSameDay, add as increaseDate } from "../../node_modules/date-fns";
import { getDayStart, getDayEnd } from "./misc-utilities.js";

// This module provides various methods to fetch tasks from the task collection

// Used to determine how many weeks ahead to generate tasks (1 by default, 4 is the maximum)
// Value can be changed by the user
let currentUpcomingRange = 1;

export function setUpcomingRange(value) {
    currentUpcomingRange = value;
}

export { currentUpcomingRange};

export function getPastDueTasks() {
    let pastDueTasks = [];

    const currentYear = getYear(new Date());
    const currentMonth = getMonth(new Date());
    const currentDate = getDate(new Date());

    for (let taskType in taskCollection) {
        // No need to cycle over non-dated tasks
        if (taskType === "basic" || taskType === "grouped") {
            continue;
        }

        for (let taskIndex in taskCollection[taskType]) {
            let task = taskCollection[taskType][taskIndex];

            if (task.origin === true) {
                continue;
            }

            let taskYear = getYear(task.deadline);
            let taskMonth = getMonth(task.deadline);
            let taskDate = getDate(task.deadline);

            if (task.completionStatus === true) {
                continue;
            }

            if (currentYear >= taskYear) {
                if (currentYear > taskYear) {
                    pastDueTasks.push(task);
                    continue;
                }
                else if (currentMonth > taskMonth) {
                    pastDueTasks.push(task);
                    continue;
                }
                else if (currentMonth < taskMonth) {
                    continue;
                }
                else if (currentDate > taskDate) {
                    pastDueTasks.push(task);
                    continue;
                }
            }
        }
    }

    return pastDueTasks;
}

export function getTodayTasks(includeCompleted = false) {
    let todayTasks = [];

    for (let taskType in taskCollection) {
        // No need to cycle over non-dated tasks
        if (taskType === "basic" || taskType === "grouped") {
            continue;
        }

        for (let taskIndex in taskCollection[taskType]) {
            let task = taskCollection[taskType][taskIndex];

            if (task.origin === true) {
                continue;
            }

            if (task.completionStatus === true && !includeCompleted) {
                continue;
            }

            if (isSameDay(new Date(), new Date(task.deadline))) {
                todayTasks.push(task);
            }
        }
    }

    return todayTasks;
}

export function getCompletedTasks() {
    let completedTasks = [];

    for (let taskType in taskCollection) {
        for (let taskIndex in taskCollection[taskType]) {
            let task = taskCollection[taskType][taskIndex];

            if (task.origin === true) {
                continue;
            }

            if (task.completionStatus === true) {
                completedTasks.push(task);
            }
        }
    }

    return completedTasks;
}

export function getAllTasks(includeCompleted = false) {
    let allTasks = [];

    for (let taskType in taskCollection) {
        for (let taskIndex in taskCollection[taskType]) {
            let task = taskCollection[taskType][taskIndex];

            if (task.origin === true) {
                continue;
            }

            if (task.completionStatus === true && !includeCompleted) {
                continue;
            }

            allTasks.push(task);
        }
    }

    return allTasks;
}

export function getUpcomingTasks(includeCompleted = false) {
    let upcomingTasks = [];

    const rangeStart = getDayStart(new Date());
    const rangeEnd = getDayEnd(increaseDate(new Date(), { "weeks": currentUpcomingRange }));

    for (let taskType in taskCollection) {
        // No need to cycle over non-dated tasks
        if (taskType === "basic" || taskType === "grouped") {
            continue;
        }

        for (let taskIndex in taskCollection[taskType]) {
            let task = taskCollection[taskType][taskIndex];

            if (task.origin === true) {
                continue;
            }
            
            if (task.completionStatus === true && !includeCompleted) {
                continue;
            }

            let taskDate = new Date (task.deadline);

            if (taskDate >= rangeStart && taskDate <= rangeEnd) {
                upcomingTasks.push(task);
            }
        }
    }

    return upcomingTasks;
}

export function getTasksByTitle(title) {
    let matchingTasks = [];

    for (let taskType in taskCollection) {
        for (let taskIndex in taskCollection[taskType]) {
            let task = taskCollection[taskType][taskIndex];

            if (task.origin === true) {
                continue;
            }
            
            if (task.title.includes(title)) {
                matchingTasks.push(task);
            }
        }
    }

    return matchingTasks;
}

export function getTasksAdvanced(advancedSearchObj) {
    let matchingTasks = [];

    let startDate;
    let endDate;
    // If either day/month/year isn't empty it means a date was specified
    if (advancedSearchObj.startDay !== "") {
        startDate = advancedSearchObj.startYear + "-" + advancedSearchObj.startMonth + "-" + advancedSearchObj.startDay + "T00:00:00";
    }
    if (advancedSearchObj.endDay !== "") {
        endDate = advancedSearchObj.endYear + "-" + advancedSearchObj.endMonth + "-" + advancedSearchObj.endDay + "T23:59:59";
    }

    for (let taskType in taskCollection) {
        for (let taskIndex in taskCollection[taskType]) {
            let task = taskCollection[taskType][taskIndex];

            if (advancedSearchObj.title !== "" && !(task.title.includes(advancedSearchObj.title))) {
                continue;
            }
            if (advancedSearchObj.group !== "") {
                if (task.group === undefined) {
                    continue;
                }

                if (!(task.group.includes(advancedSearchObj.group))) {
                    continue;
                }
            }
            if (advancedSearchObj.startDay !== "") {
                if (task.deadline === undefined) {
                    continue;
                }
                if (new Date(task.deadline) < new Date(startDate)) {
                    continue;
                }
            }
            if (advancedSearchObj.endDay !== "") {
                if (task.deadline === undefined) {
                    continue;
                }
                if (new Date(task.deadline) > new Date(endDate)) {
                    continue;
                }
            }
            if (advancedSearchObj.includeCompleted === false && task.completionStatus === true) {
                continue;
            }
            if (advancedSearchObj.includeRepetitive === false && (determineTaskType(task) === "repetitive" || determineTaskType(task) === "repetitiveGrouped")) {
                continue;
            }
            if (advancedSearchObj.hideNonOrigin === true && task.origin === false) {
                continue;
            }

            matchingTasks.push(task);
        }
    }

    return matchingTasks;
}


export function getTaskByGroup(group, includeCompleted = false) {
    let matchingTasks = [];

    for (let taskType in taskCollection) {
        for (let taskIndex in taskCollection[taskType]) {
            let task = taskCollection[taskType][taskIndex];

            if (task.origin === true) {
                continue;
            }

            if (task.completionStatus === true && includeCompleted === false) {
                continue;
            }
            
            if (task.group === group) {
                matchingTasks.push(task);
            }
        }
    }

    return matchingTasks;
}