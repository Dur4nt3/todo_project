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
    constructor(name, description, priority, deadline, allDay) {
        super(name, description, priority);
        this.deadline = deadline;
        this.allDay = allDay;
        this.timedDeadline = deadline;
    }
}

class datedGroupedTaskData extends basicTaskData {
    constructor(name, description, priority, groupName, deadline, allDay) {
        super(name, description, priority);
        this.group = groupName
        this.deadline = deadline;
        this.allDay = allDay;
        this.timedDeadline = deadline;
    }
}

class repetitiveTaskData extends basicTaskData {
    constructor(name, description, priority, deadline, allDay, pattern, patternValue) {
        super(name, description, priority);
        this.deadline = deadline;
        this.allDay = allDay;
        this.timedDeadline = deadline;
        this.repetitionPattern = pattern;
        this.repetitionValue = patternValue;
    }
}

class repetitiveGroupedTaskData extends repetitiveTaskData {
    constructor(name, description, priority, groupName, deadline, allDay, pattern, patternValue) {
        super(name, description, priority, deadline, allDay, pattern, patternValue);
        this.group = groupName;
    }
}

function formatBasicTaskData(formData) {

}

function formatGroupedTaskData(formData) {

}

function formatDatedTaskData(formData) {

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
            return;
        
        case "grouped":
            taskDataObj = formatDatedGroupedTaskData(formData);
            return;

        case "dated":
            taskDataObj = formatDatedTaskData(formData);
            return;

        case "datedGrouped":
            taskDataObj = formatDatedGroupedTaskData(formData);
            return;

        case "repetitive":
            taskDataObj = formatRepetitiveTaskData(formData);
            return;
            
        case "repetitiveGrouped":
            taskDataObj = formatRepetitiveGroupedTaskData(formData);
            return;
    }
}