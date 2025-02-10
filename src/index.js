import "./styles.css";
import "./stylesheets/reset.css";

import * as taskUtil from "./modules/utility-functions.js";

function handleTaskBasics(title, description, priority) {
    let completionStatus = false;
    let taskID = taskUtil.generateID();

    const complete = () => completionStatus = true;
    const undoCompletion = () => completionStatus = false;

    return { 
        get completionStatus() { return completionStatus; },
        complete,
        undoCompletion,

        get title() { return title; },
        set title(newTitle) {
            // **Possibly create a separate function that checks the below**
            if (newTitle === "") {
                throw new Error("Title is blank");
            }
            title = newTitle;
        },

        get description() { return description; },
        set description(newDescription) {
            description = newDescription;
        },

        get id() { return taskID; },

        get priority() { return priority; },
        set priority(newPriority) {
            // Additional input validation: could possibly be removed later
            if (!(1 <= newPriority <= 3 && Number.isInteger(newPriority))) {
                throw new Error("Invalid Priority");
            }
            priority = newPriority;
        }
    };
}

function createBasicTask(title, description, priority = 1) {
    const basicTask = taskUtil.deepClone(handleTaskBasics(title, description, priority));

    taskUtil.updateTaskArray(basicTask);

    return basicTask;
}

function handleTaskDates(deadline, allDay) {
    return {
        get deadline() { return deadline; },
        set deadline(newDeadline) {
            // **Possibly create a separate function that checks the below**
            let valid = taskUtil.validateDeadline(newDeadline);
            if (valid === false) {
                throw new Error("Deadline is invalid!");
            }
            deadline = valid;
        },

        overrideDeadline(newDeadline) {
            this.deadline = [newDeadline];
        },

        get allDay() { return allDay },
        set allDay(val) {
            // Additional input validation: could possibly be removed later
            if (val !== true && val !== false) {
                throw new Error("Invalid value");
            }

            else if (val === true) {
                let newDeadline = taskUtil.formatAllDayDeadline(this.deadline);
                this.deadline = newDeadline;
                allDay = true;
            }

            else if (val === false) {
                allDay = false;
            }
        }
    } 
}

function createDatedTask(title, description, deadline, allDay, priority = 1) {
    const datedTask = taskUtil.deepClone(
        handleTaskBasics(title, description, priority), 
        handleTaskDates(deadline, allDay)
    );

    taskUtil.updateTaskArray(datedTask);

    return datedTask;
}

function handleTaskGroups(group) {
    return {
        get group() { return group },
        set group(newGroup) {
            // **Possibly create a separate function that checks the below**
            if (!(taskUtil.validateGroup(newGroup))) {
                throw new Error("Invalid group name");
            }
            // **Possibly create a separate function that runs the below**
            // Because we are setting a new group: 
            // ensure previous task isn't in the previous one and is on the new one
            taskUtil.updateGroups(newGroup, this, group);
            group = newGroup;
        }
    }
}

function createGroupedTask(title, description, groupName, priority = 1) {
    const groupedTask = taskUtil.deepClone(
        handleTaskBasics(title, description, priority), 
        handleTaskGroups(groupName)
    );

    taskUtil.updateTaskArray(groupedTask);
    taskUtil.updateGroups(groupedTask.group, groupedTask);

    return groupedTask;
}

function createDatedGroupedTask(title, description, groupName, deadline, allDay, priority) {
    const datedGroupedTask = taskUtil.deepClone(
        handleTaskBasics(title, description, priority),
        handleTaskDates(deadline, allDay),
        handleTaskGroups(groupName)
    );

    taskUtil.updateTaskArray(datedGroupedTask);
    taskUtil.updateGroups(datedGroupedTask.group, datedGroupedTask);

    return datedGroupedTask;
}