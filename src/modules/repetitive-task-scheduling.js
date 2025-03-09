// This module manages how long into the future repetitive tasks should be scheduled

// Used to determine how long ahead to schedule tasks (for tasks with "time" repetition pattern)
function getCumulativeHoursTimePattern(patternValue) {
    let cumulativeHours = 0;

    for (let timePeriod in patternValue) {
        switch (timePeriod) {
            case "years":
                cumulativeHours+= (365*patternValue[timePeriod]*24);
                break;

            case "months":
                cumulativeHours+= (30*patternValue[timePeriod]*24);
                break;

            case "weeks":
                cumulativeHours+= (7*patternValue[timePeriod]*24);
                break;

            case "days":
                cumulativeHours+= (patternValue[timePeriod]*24);
                break;

            case "hours":
                cumulativeHours+= (patternValue[timePeriod]*1);
                break;
        }
    }
    return cumulativeHours;
}

// Used to determine how long ahead to schedule tasks (for tasks with "day" repetition pattern)
function getCumulativeHoursDayPattern(patternValue) {
    return (7 / patternValue.length * 24);
}

// Used to determine how long ahead to schedule tasks (for tasks with "hybrid" repetition pattern)
function getCumulativeHoursHybridWeeklyPattern(patternValue) {
    return (getCumulativeHoursTimePattern(patternValue[1]) / patternValue[0].length);
}

// Execute the correct "getCumulativeHours" type of function based on the repetition pattern
export function getCumulativeHours(patternType, patternValue) {
    let cumulativeHours = 0;

    switch (patternType) {
        case "time":
            cumulativeHours = getCumulativeHoursTimePattern(patternValue);
            break;

        case "day":
            cumulativeHours = getCumulativeHoursDayPattern(patternValue);
            break;

        case "hybrid-weekly":
            cumulativeHours = getCumulativeHoursHybridWeeklyPattern(patternValue);
            break;
        case "hybrid-monthly":
            cumulativeHours = getCumulativeHoursTimePattern(patternValue[patternValue.length - 1]);
            break;
    }
    return cumulativeHours;
}

// Scheduling brackets depending on how frequent the task repeat itself
export function determineScheduling(cumulativeHours) {
    // Less than 12 hours => 1 week ahead
    if (cumulativeHours <= 12) {
        return 7*24;
    }
    // Between 12 and 24 hours => 1 month ahead
    else if (12 < cumulativeHours && cumulativeHours <= 24) {
        return 30*24;
    }
    // Between 1 day and 1 week => 3 months ahead
    else if (24 < cumulativeHours && cumulativeHours <= 168) {
        return 90*24;
    }
    // Between 1 week and 2 weeks => 6 months ahead
    else if (168 < cumulativeHours && cumulativeHours <= 336) {
        return 180*24;
    }
    // Between 2 weeks and 1 month => 1 year ahead
    else if (336 < cumulativeHours && cumulativeHours <= 720) {
        return 365*24;
    }
    // Between 1 month and 3 months => 2 years ahead
    else if (720 < cumulativeHours && cumulativeHours <= 2160) {
        return 730*24;
    }
    // More than 3 months => 5 years ahead
    else if (cumulativeHours > 2160) {
        return 1825*24;
    }
}