import { taskCollection, taskGroups } from "./task-utility-functions.js";
import { getYear, getMonth, getDate, isSameDay } from "../../node_modules/date-fns";

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

export function getTodayTasks(filterOn = true) {
    let todayTasks = [];

    for (let taskType in taskCollection) {
        // No need to cycle over non-dated tasks
        if (taskType === "basic" || taskType === "grouped") {
            continue;
        }

        for (let taskIndex in taskCollection[taskType]) {
            let task = taskCollection[taskType][taskIndex];

            if (task.completionStatus === true && filterOn) {
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

export function getAllTasks(includeCompleted) {
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