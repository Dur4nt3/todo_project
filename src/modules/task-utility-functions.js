import { add as increaseDate, getYear, getMonth, getDate } from "../../node_modules/date-fns";

// stores information about tasks and tasks groups
const taskCollection = {};
const taskGroups = {};

export { taskCollection, taskGroups };

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

// Task-Specific Utility Functions (Dated Tasks):

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

export function formatAllDayDeadline(date) {
    // Remove the "Thh:mm:ss" portion from a deadline to ensure no time is specified

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

// Task-Specific Utility Functions (Grouped Tasks):
export function updateGroups(groupName, obj, oldGroup = null) {

    // If changing the group of a task, ensure to remove it from its previous group
    if (oldGroup !== null) {
        let objIndex = taskGroups[oldGroup].findIndex(task => task.id === obj.id);
        taskGroups[oldGroup].splice(objIndex,1);
        // Prevent bloating the object with empty groups by deleting groups without any tasks
        if (taskGroups[oldGroup].length === 0) {
            delete taskGroups[oldGroup];
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

    else if (groupName === "" || groupName.length > 30 || reservedGroups.includes(groupName)) {
        return false;
    }
    return true;
}

// Checks whether there are task groups ("__unlisted__" not included)
export function checkTaskGroupsEmptiness() {
    // There are no groups if:
    // tasksGroups has no properties or taskGroups only includes the "__unlisted__" property
    // The unlisted property is reserved for grouped tasks without a group
    if (Object.keys(taskGroups).length === 0 ||
    (Object.keys(taskGroups).length === 1 && Object.hasOwn(taskGroups, "__unlisted__"))) {
        return true;
    }
    return false;
}