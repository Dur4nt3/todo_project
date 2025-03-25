import { getMonth, getDate, getDay, getYear, getHours, getMinutes } from "../../node_modules/date-fns";

// This module includes various utilities that aren't categorized under a specific category

// Get specific time of the task (only relevant for not all-day tasks)
export function getTaskTime(task) {
    if (task.allDay) {
        return "";
    }

    return task.deadline.slice(-9).slice(1).slice(0,5);
}

// Get the formatted day of the week of a specific task via its deadline
export function getTaskDay(deadline) {
    const dayOfTheWeek = getDay(deadline);

    switch (dayOfTheWeek) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturday";
    }
}

export function getTaskMonth(deadline) {
    const deadlineMonth = getMonth(deadline);

    switch (deadlineMonth) {
        case 0:
            return "January";

        case 1:
            return "February";

        case 2:
            return "March";

        case 3:
            return "April";

        case 4:
            return "May";

        case 5:
            return "June";

        case 6:
            return "July";
        
        case 7:
            return "August";

        case 8:
            return "September";

        case 9:
            return "October";

        case 10:
            return "November";

        case 11:
            return "December";
    }
}

export function getTaskDateTextFormat(deadline) {
    const taskDate = getDate(deadline);
    const taskMonth = getTaskMonth(deadline);
    const taskDay = getTaskDay(deadline);
    const taskYear = ", " + getYear(deadline);
    return taskDay + ", " + taskMonth + " " + taskDate + taskYear;
}

export function getTaskDateRegular(deadline) {
    const taskDate = getDate(deadline);
    const taskMonth = getMonth(deadline) + 1;
    const taskYear = getYear(deadline);

    return taskDate + "." + taskMonth + "." + taskYear;
}

export function getTaskDateObject(deadline) {
    let taskDate = getDate(deadline);
    let taskMonth = getMonth(deadline) + 1;
    let taskYear = getYear(deadline);

    if (taskDate < 10) {
        taskDate = "0" + String(taskDate);
    }
    if (taskMonth < 10) {
        taskMonth = "0" + String(taskMonth);
    }

    let hours = "", minutes = "";
    if (deadline.includes("T")) {
        hours = getHours(deadline);
        minutes = getMinutes(deadline);

        if (hours < 10) {
            hours = "0" + String(hours);
        }
        if (minutes < 10) {
            minutes = "0" + String(minutes);
        }
    }

    return { day: taskDate, month: taskMonth, year: taskYear, hours, minutes };
}

export function getDayStart(date) {
    const currentDay = getDate(date);
    const currentMonth = getMonth(date);
    const currentYear = getYear(date);

    return new Date(currentYear, currentMonth, currentDay, 0);
}

export function getDayEnd(date) {
    const currentDay = getDate(date);
    const currentMonth = getMonth(date);
    const currentYear = getYear(date);

    return new Date(currentYear, currentMonth, currentDay+1, 0, 0, -1);
}

export function formatTime(timedDeadline) {
    return timedDeadline.slice(-9).slice(1).slice(0,5);
}

export function formatTaskType(taskType) {
    switch (taskType) {
        case "basic":
            return "Basic";

        case "grouped":
            return "Grouped";

        case "dated":
            return "Dated";

        case "datedGrouped":
            return "Dated & Grouped";

        case "repetitive":
            return "Repetitive";

        case "repetitiveGrouped":
            return "repetitive & Grouped";
    }
}

export function formatRepetitionPattern(repetitionPattern) {
    switch (repetitionPattern) {
        case "time":
            return "Time";

        case "day":
            return "Day";

        case "hybrid-weekly":
            return "Hybrid - Weekly";

        case "hybrid-monthly":
            return "Hybrid - Monthly";
    }
}

export function capitalizeFirstLetter(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

export function stringToHex(string) {
    let hex;
    let result = "id_";
    for (let i = 0; i < string.length; i++) {
        hex = string.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

export function hexToString(hex) {
    let pureHex = hex.slice(3);
    let hexes = pureHex.match(/.{1,4}/g) || [];
    let back = "";
    for(let j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}