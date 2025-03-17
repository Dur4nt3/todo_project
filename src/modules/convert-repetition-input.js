import { isInputValidPositiveInteger } from "./number-input-validation.js";

// Takes user input and converts it into a repetition pattern value
// Note that this module validate the data to a certain extent but not fully
// Additional input validation is conducted within the "add-tasks-modal-validation.js" module file

function convertToTime(data) {
    const possiblePeriods = ["hours", "days", "weeks", "months", "years"];
    const selectedPeriod = data.period.toLowerCase();

    // User selected a period that isn't supported (only possible through "DevTools")
    if (!(possiblePeriods.includes(selectedPeriod))) {
        return undefined;
    }

    // The frequency entered isn't valid
    if (!(isInputValidPositiveInteger(data.frequency))) {
        return undefined;
    }

    const frequency = Number(data.frequency);

    return { [selectedPeriod]: frequency };
}

function convertToDay(data) {

    // Ensures all values are indeed numbers
    for (let i in data) {
        if (data[i] === "0") {
            continue;
        }

        else if (!isInputValidPositiveInteger(data[i])) {
            return undefined;
        }
    }

    let days = []

    for (let i in data) {
        days.push(Number(data[i]));
    }

    return days;
}

function convertToHybridWeekly(data) {
    const daysData = data.days;
    const frequencyData = { frequency: data.frequency, period: "weeks" };

    return [convertToDay(daysData), convertToTime(frequencyData)];
}

function convertToHybridMonthly(data) {
    if (data.occurrence) {
        let occurrence;
        let day;
        // The below conditionals are true if and only if the user has tampered with the select input via "DevTools"
        if (!(isInputValidPositiveInteger(data.specificOccurrence)) && data.specificOccurrence !== "f") {
            return undefined;
        }
        if (!(isInputValidPositiveInteger(data.occurrenceDay))) {
            return undefined;
        }
        
        
        if(data.specificOccurrence === "f") {
            occurrence = "f";
        }
        else {
            occurrence = Number(data.specificOccurrence);
        }

        day = Number(data.occurrenceDay);
        const frequencyData = { frequency: data.occurrenceFrequency, period: "months" };

        return [occurrence, day, convertToTime(frequencyData)];
    }

    else if (data.end) {
        const frequencyData = { frequency: data.endFrequency, period: "months" };

        return ["e", convertToTime(frequencyData)];
    }

    else { 
        return [];
    }
}

// When values are undefined it indicates that inputs were invalid to a point where you shouldn't bother with further validation
export function fetchPatternValue(repetitionPattern, formData) {
    switch (repetitionPattern) {
        case "time":
            return convertToTime(formData.repetitionValue.time);
        
        case "day":
            return convertToDay(formData.repetitionValue.day);

        case "hybrid-weekly":
            return convertToHybridWeekly(formData.repetitionValue["hybrid-weekly"]);

        case "hybrid-monthly":
            return convertToHybridMonthly(formData.repetitionValue["hybrid-monthly"]);
        
        default:
            return undefined;
    }
}