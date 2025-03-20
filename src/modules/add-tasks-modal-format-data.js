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
    }
}

class datedGroupedTaskData extends basicTaskData {
    constructor(name, description, priority, groupName, deadline, allDay) {
        super(name, description, priority);
        this.group = groupName
        this.deadline = deadline;
        this.allDay = allDay;
    }
}

class repetitiveTaskData extends basicTaskData {
    constructor(name, description, priority, deadline, allDay, pattern, patternValue) {
        super(name, description, priority);
        this.deadline = deadline;
        this.allDay = allDay;
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

export function formatAddTaskSubmissionData(taskType, modalCont) {

}