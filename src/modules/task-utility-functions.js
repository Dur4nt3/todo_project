import { add as increaseDate, getYear, getMonth, getDate, isSameDay } from "../../node_modules/date-fns";

// stores information about tasks and tasks groups
const taskCollection = {};
const taskGroups = {};

const groupsColorLabels = {}
const colorPool = ["#D90429", "#A11692", "#FF4F79", "#4D9DE0",
    "#E15554", "#E1BC29", "#3BB273", "#7768AE", "#CF5C36", "#DC136C",
    "#84B082", "#1B998B", "#2E294E", "#028090", "#DCED31", "#F42272",
    "#3423A6", "#8EA604", "#F5BB00", "#C73E1D", "#34623F", "#FE9920",
    "#DDDBF1", "#F18805", "#A1EF8B", "#772D8B", "#92D5E6", "#FF7F11",
    "#FF1B1C", "#6FFFE9", "#FF6978", "#F65BE3", "#8E0045", "#16DB65"];

export { taskCollection, taskGroups, groupsColorLabels };

const reservedGroups = ["__unlisted__"];

// General Utility Functions:
export function deepClone(...objects) {
    // Ensures "cloned" objects include getters and setters
    const clonedObj = objects.reduce((clone, obj) => {
        return Object.defineProperties(clone, Object.getOwnPropertyDescriptors(obj));
    }, {})

    return clonedObj;
}

export function generateID() {
    return Math.random().toString(16).slice(2);
}

export function updateTaskCollection(taskObj, taskType) {
    if (taskCollection[taskType] === undefined) {
        taskCollection[taskType] = [taskObj];
    }
    else {
        taskCollection[taskType].push(taskObj);
    }
}

export function generateGroupColorLabels(groupName) {
    if (Object.hasOwn(groupsColorLabels, groupName)) {
        return groupsColorLabels[groupName];
    }

    let randomColor = colorPool[Math.floor(Math.random() * colorPool.length)];
    groupsColorLabels[groupName] = randomColor;

    return randomColor;
}

export function determineTaskType(task) {
    if (task.deadline === undefined && task.group === undefined) {
        return "basic";
    }

    else if (task.deadline !== undefined && task.group === undefined && task.repetitionPattern === undefined) {
        return "dated";
    }

    else if (task.deadline === undefined && task.group !== undefined) {
        return "grouped";
    }

    else if (task.deadline !== undefined && task.group !== undefined && task.repetitionPattern === undefined) {
        return "datedGrouped";
    }
    else if (task.deadline !== undefined && task.group === undefined && task.repetitionPattern !== undefined) {
        return "repetitive";
    }
    else if (task.deadline !== undefined && task.group !== undefined && task.repetitionPattern !== undefined) {
        return "repetitiveGrouped";
    }
}

// Returns a task given an ID
export function findByID(id) {
    for (let taskType in taskCollection) {
        for (let taskIndex in taskCollection[taskType]) {
            let task = taskCollection[taskType][taskIndex];

            if (task.id === id) {
                return task;
            }
        }
    }
}

// Task-Specific Utility Functions (Dated Tasks):

// Validates deadline both regular and overridden
export function validateDeadline(newDeadline) {
    // Date cannot be more than 5 years into the future or 5 years back
    if ((increaseDate(new Date(), {years: 5}) < Date.parse(newDeadline))
        ||
        increaseDate(Date.parse(newDeadline), {years: 5}) < (new Date())) {
        return false;
    }

    // Allows users to set a deadline before the present day (doesn't override 5 year limit)
    if (Array.isArray(newDeadline)) {
        return newDeadline[0];
    }

    if (Date.parse(newDeadline) < (new Date().getTime())) {
        return false
    }
    return newDeadline;
}

// Remove the "Thh:mm:ss" portion from a deadline to ensure no time is specified
export function formatAllDayDeadline(date) {
    

    // Date is formatted correctly if the below is true
    if (!(date.includes("T"))) {
        return date;
    }
    // Remove the timed portion mentioned above
    let formattedDate = date.slice(0, 10);

    return formattedDate;
}

// Format the deadline to ensure consistency in deadline property format across all task objects
export function formateToDeadlineValue(date, time) {
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

// Get all tasks scheduled for today
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

// Get all past-due tasks (uncompleted tasks that are at least one calender day behind the current date)
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


// Task-Specific Utility Functions (Grouped Tasks):
export function updateGroups(groupName, obj, oldGroup = null) {

    // If changing the group of a task, ensure to remove it from its previous group
    if (oldGroup !== null) {
        let objIndex = taskGroups[oldGroup].findIndex(task => task.id === obj.id);
        taskGroups[oldGroup].splice(objIndex,1);
        // Prevent bloating the object with empty groups by deleting groups without any tasks
        if (taskGroups[oldGroup].length === 0) {
            delete taskGroups[oldGroup];
            delete groupsColorLabels[oldGroup];
        }
    }

    if (taskGroups[groupName] === undefined) {
        taskGroups[groupName] = [obj];
    }
    else {
        taskGroups[groupName].push(obj);
    }
}

export function validateGroup(groupName) {
    
    if (Array.isArray(groupName) && groupName[0] === "__unlisted__") {
        return true;
    }

    else if (groupName === "" || groupName.length > 25 || reservedGroups.includes(groupName)) {
        return false;
    }
    return true;
}

// Checks whether there are task groups ("__unlisted__" not included)
export function getGroupCount() {
    const groupsArray = Object.keys(taskGroups);

    // There are no groups if:
    // tasksGroups has no properties or taskGroups only includes the "__unlisted__" property
    // The unlisted property is reserved for grouped tasks without a group
    if (groupsArray.length === 0 ||
    (groupsArray.length === 1 && Object.hasOwn(taskGroups, "__unlisted__"))) {
        return 0;
    }

    if (groupsArray.includes("__unlisted__")) {
        return groupsArray.length - 1;
    }
    return groupsArray.length;
}