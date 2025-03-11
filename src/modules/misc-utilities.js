import { getMonth, getDate, getDay, getYear } from "../../node_modules/date-fns";

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