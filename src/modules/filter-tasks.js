export function priorityFirst(taskList) {
    return taskList.sort((a, b) => { return (b.priority - a.priority) });
}


function compareTime(deadline1, allDay1, deadline2, allDay2) {
    if (allDay1 === false && allDay2 === true) {
        return -1;
    }
    else if (allDay1 === true && allDay2 === false) {
        return 1;
    }
    else if (allDay1 === true && allDay2 === true) {
        return 0;
    }

    return (new Date(deadline1)) - (new Date(deadline2));
}

export function latestTodayFirst(taskList) {
    return taskList.sort((a, b) => { return compareTime(a.deadline, a.allDay, b.deadline, b.allDay) });
}