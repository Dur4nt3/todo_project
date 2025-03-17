import { isValid, getDate } from "../../node_modules/date-fns";

// This module is used to validate date inputs

// Validator for three different inputs: day, month, year
export function isValidDate3Inputs(day, month, year) {
    if (day === "" && month === "" && year === "") {
        return true;
    }

    if (day !== "" && (month === "" || year === "")) {
        return false;
    }

    else if (month !== "" && (day === "" || year === "")) {
        return false;
    }

    else if (year !== "" && (month === "" || day === "")) {
        return false;
    }

    // Ensures proper "DD", "MM", "YYYY" format
    if (Number(day) < 10 && !(day[0] === "0")) {
        return false;
    }
    else if (Number(month) < 10 && !(month[0] === "0")) {
        return false;
    }
    else if (year.length !== 4) {
        return false;
    }

    const fullDate = year + "-" + month + "-" + day;
    return true;
}

export function isValidDate3InputsNoBlanks(day, month, year) {
    if (day === "" && month === "" && year === "") {
        return false;
    }

    return isValidDate3Inputs(day, month, year);
}

export function isValidTime2Inputs(hours, minutes) {
    if (hours === "" && minutes === "") {
        return true;
    }

    if (hours !== "" && minutes === "") {
        return false;
    }

    else if (minutes !== "" && hours === "") {
        return false;
    }

    // Ensures proper "HH:MM" format
    if (Number(hours) < 10 && !(hours[0] === "0")) {
        return false;
    }
    else if (Number(minutes) < 10 && !(minutes[0] === "0")) {
        return false;
    }

    return true;
}

export function isValidTime2InputsNoBlanks(hours, minutes) {
    if (hours === "" && minutes === "") {
        return false;
    }

    return isValidTime2Inputs(hours, minutes);
}

// Check if the date specified actually exists
// This is done because JavaScript accepts a date with the 31st date even if it doesn't exist for that month
// Specifically, the date generated is automatically the next month
// This also covers for february
function verifyDay(date) {
    const resultDate = new Date(date);

    // If the format is valid "date.slice(8,10)" is the selected day
    if (!(getDate(resultDate) === Number(date.slice(8,10)))) {
        return false;
    }

    return true;
}

// A note for specified time => Inherent JavaScript functionality already handles 
export function isValidFormatted(date) {
    if (!isValid(new Date(date))) {
        return false;
    }

    // Checks for discrepancies between the day selected and the day that will be generated
    if (!verifyDay(date)) {
        return false;
    }

    return true;
}