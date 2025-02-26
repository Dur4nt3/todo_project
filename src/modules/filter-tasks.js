import { isSameDay } from "../../node_modules/date-fns";

export function priorityFirst(taskList) {
    return taskList.sort((a, b) => { return (b.priority - a.priority) });
}

function compareTime(deadline1, allDay1, deadline2, allDay2) {
    // If tasks are on the same day => timed tasks should be before all-day tasks
    // This is done to solve inconsistencies introduced by timezones and default time of dates without a specified time
    if (isSameDay(new Date(deadline1), new Date(deadline2))) {
        if (allDay1 === false && allDay2 === true) {
            return -1;
        }
        else if (allDay1 === true && allDay2 === false) {
            return 1;
        }
        else if (allDay1 === true && allDay2 === true) {
            return 0;
        }
    }

    return (new Date(deadline1)) - (new Date(deadline2));
}

export function latestFirst(taskList) {
    return taskList.sort((a, b) => { return compareTime(a.deadline, a.allDay, b.deadline, b.allDay) });
}