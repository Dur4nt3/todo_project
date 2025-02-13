import { add as increaseDate, getYear, getMonth, getDate } from "../../node_modules/date-fns/index.cjs";

// stores information about tasks and tasks groups
const taskCollection = {};
const taskGroups = {};

export { taskCollection, taskGroups };


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
    if (groupName === "" || groupName.length > 30) {
        return false;
    }
    return true;
}