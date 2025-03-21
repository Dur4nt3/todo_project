import { isSingleDigitNumber, isNumberInRange } from "./number-input-validation.js";
import { isValidDate3InputsNoBlanks, isValidTime2InputsNoBlanks } from "./date-input-validation.js";

// This module takes the collect form data when submitting a request to edit/create a new task and formats that data so it's easier to validate

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
        super(name, description, priority, deadline, allDay, pattern, patternValue);
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
    
}

function formatRepetitiveTaskData(formData) {
    
}

function formatRepetitiveGroupedTaskData(formData) {
    
}

export function formatAddTaskSubmissionData(taskType, formData) {
    let taskDataObj;

    switch (taskType) {
        case "basic":
            taskDataObj = formatBasicTaskData(formData);
            console.log(taskDataObj);
            return;
        
        case "grouped":
            taskDataObj = formatGroupedTaskData(formData);
            console.log(taskDataObj);
            return;

        case "dated":
            taskDataObj = formatDatedTaskData(formData);
            console.log(taskDataObj);
            return;

        case "datedGrouped":
            taskDataObj = formatDatedGroupedTaskData(formData);
            console.log(taskDataObj);
            return;

        case "repetitive":
            taskDataObj = formatRepetitiveTaskData(formData);
            console.log(taskDataObj);
            return;
            
        case "repetitiveGrouped":
            taskDataObj = formatRepetitiveGroupedTaskData(formData);
            console.log(taskDataObj);
            return;
    }
}