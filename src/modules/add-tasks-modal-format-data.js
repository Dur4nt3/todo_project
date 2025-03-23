import { isSingleDigitNumber, isNumberInRange } from "./number-input-validation.js";
import { isValidDate3InputsNoBlanks, isValidTime2InputsNoBlanks } from "./date-input-validation.js";
import { fetchPatternValue } from "./convert-repetition-input.js";

// This module takes the collected form data when submitting a request to edit/create a new task and formats that data so it's easier to validate

class basicTaskData {
    constructor(name, description, priority) {
        this.name = name;
        this.description = description;
        this.priority = priority;
    }
}

class groupedTaskData extends basicTaskData {
    constructor(name, description, priority, groupName) {
        super(name, description, priority);
        this.group = groupName
    }
}

class datedTaskData extends basicTaskData {
    constructor(name, description, priority, deadline, allDay, timedDeadline) {
        super(name, description, priority);
        this.deadline = deadline;
        this.allDay = allDay;
        this.timedDeadline = timedDeadline;
    }
}

class datedGroupedTaskData extends basicTaskData {
    constructor(name, description, priority, groupName, deadline, allDay, timedDeadline) {
        super(name, description, priority);
        this.group = groupName
        this.deadline = deadline;
        this.allDay = allDay;
        this.timedDeadline = timedDeadline;
    }
}

class repetitiveTaskData extends basicTaskData {
    constructor(name, description, priority, deadline, allDay, timedDeadline, pattern, patternValue) {
        super(name, description, priority);
        this.deadline = deadline;
        this.allDay = allDay;
        this.timedDeadline = timedDeadline;
        this.repetitionPattern = pattern;
        this.repetitionValue = patternValue;
    }
}

class repetitiveGroupedTaskData extends repetitiveTaskData {
    constructor(name, description, priority, groupName, deadline, allDay, timedDeadline, pattern, patternValue) {
        super(name, description, priority, deadline, allDay, timedDeadline, pattern, patternValue);
        this.group = groupName;
    }
}

function formatPriority(priority) {
    if (!(isSingleDigitNumber(priority))) {
        return 1;
    }

    let newPriority = Number(priority)

    if (!isNumberInRange(newPriority, 1, 3)) {
        return 1;
    }

    return newPriority;
}

function formatBasicTaskData(formData) {
    let priority = formatPriority(formData.priority);

    return new basicTaskData(formData.name, formData.description, priority);
}

function formatGroupedTaskData(formData) {
    let data = formatBasicTaskData(formData);

    return new groupedTaskData(data.name, data.description, data.priority, formData.group);
}

function formatDatedTaskData(formData) {
    let data = formatBasicTaskData(formData);

    let deadline;
    if (!(isValidDate3InputsNoBlanks(formData.deadline.day, formData.deadline.month, formData.deadline.year))) {
        deadline = undefined;
    }
    else {
        deadline = formData.deadline.year + "-" + formData.deadline.month + "-" + formData.deadline.day;
    }

    let allDay = formData.allDay;
    let timedDeadline = deadline;

    if (!allDay) {
        if (!(isValidTime2InputsNoBlanks(formData.time.hours, formData.time.minutes))) {
            timedDeadline = undefined;
        }
        else {
            timedDeadline = deadline + "T" + formData.time.hours + ":" + formData.time.minutes + ":00";
        }
    }


    return new datedTaskData(data.name, data.description, data.priority, deadline, allDay, timedDeadline);
}

function formatDatedGroupedTaskData(formData) {
    let groupData = formatGroupedTaskData(formData);
    let dateData = formatDatedTaskData(formData);

    return new datedGroupedTaskData(groupData.name, groupData.description, groupData.priority, groupData.group,
        dateData.deadline, dateData.allDay, dateData.timedDeadline);
}

function formatRepetitiveTaskData(formData) {
    let dateData = formatDatedTaskData(formData);
    
    let repetitionValue = fetchPatternValue(formData.repetitionPattern, formData);

    return new repetitiveTaskData(dateData.name, dateData.description, dateData.priority,
        dateData.deadline, dateData.allDay, dateData.timedDeadline, formData.repetitionPattern, repetitionValue);
}

function formatRepetitiveGroupedTaskData(formData) {
    let repetitiveData = formatRepetitiveTaskData(formData);
    let groupData = formatGroupedTaskData(formData);

    return new repetitiveGroupedTaskData(groupData.name, groupData.description, groupData.priority, groupData.group,
        repetitiveData.deadline, repetitiveData.allDay, repetitiveData.timedDeadline,
        repetitiveData.repetitionPattern, repetitiveData.repetitionValue);
}

export function formatAddTaskSubmissionData(taskType, formData) {
    let taskDataObj;

    switch (taskType) {
        case "basic":
            taskDataObj = formatBasicTaskData(formData);
            return taskDataObj;
        
        case "grouped":
            taskDataObj = formatGroupedTaskData(formData);
            return taskDataObj;

        case "dated":
            taskDataObj = formatDatedTaskData(formData);
            return taskDataObj;

        case "datedGrouped":
            taskDataObj = formatDatedGroupedTaskData(formData);
            return taskDataObj;

        case "repetitive":
            taskDataObj = formatRepetitiveTaskData(formData);
            return taskDataObj;
            
        case "repetitiveGrouped":
            taskDataObj = formatRepetitiveGroupedTaskData(formData);
            return taskDataObj;
    }
}