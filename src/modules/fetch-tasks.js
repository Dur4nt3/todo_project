import { taskCollection } from "./task-utility-functions.js";
import { getYear, getMonth, getDate, isSameDay, add as increaseDate, differenceInDays } from "../../node_modules/date-fns";
import { getDayStart, getDayEnd } from "./misc-utilities.js";

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