import "./styles.css";
import "./stylesheets/reset.css";

import * as taskUtil from "./modules/task-utility-functions.js";
import * as repetitionGenerator from "./modules/repetition-generator.js";

import { getDay, add as increaseDate } from "../node_modules/date-fns"

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

export function createBasicTask(title, description, priority = 1) {
    const basicTask = taskUtil.deepClone(handleTaskBasics(title, description, priority));

    taskUtil.updateTaskCollection(basicTask, "basic");

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

export function createDatedTask(title, description, deadline, allDay, priority = 1) {
    const datedTask = taskUtil.deepClone(
        handleTaskBasics(title, description, priority), 
        handleTaskDates(deadline, allDay)
    );

    taskUtil.updateTaskCollection(datedTask, "dated");

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

export function createGroupedTask(title, description, groupName, priority = 1) {
    const groupedTask = taskUtil.deepClone(
        handleTaskBasics(title, description, priority), 
        handleTaskGroups(groupName)
    );

    taskUtil.updateTaskCollection(groupedTask, "grouped");
    taskUtil.updateGroups(groupedTask.group, groupedTask);

    return groupedTask;
}

export function createDatedGroupedTask(title, description, groupName, deadline, allDay, priority) {
    const datedGroupedTask = taskUtil.deepClone(
        handleTaskBasics(title, description, priority),
        handleTaskDates(deadline, allDay),
        handleTaskGroups(groupName)
    );

    taskUtil.updateTaskCollection(datedGroupedTask, "datedGrouped");
    taskUtil.updateGroups(datedGroupedTask.group, datedGroupedTask);

    return datedGroupedTask;
}

function handleTaskRepetition(repetitionPattern, repetitionValue, origin, clusterID) {
    if (origin === true) {
        clusterID = taskUtil.generateID();
    }

    return {
        get repetitionPattern() { return repetitionPattern },
        set repetitionPattern(newPattern) {
            repetitionPattern = newPattern;
        },

        get repetitionValue() { return repetitionValue },
        set repetitionValue(newValue) {
            repetitionValue = newValue;
        },

        get origin() { return origin },

        get clusterID() { return clusterID }
    }
}

export function createRepetitiveTask(title, description, deadline,
    allDay, repetitionPattern, repetitionValue, origin, priority, clusterID) {

    const repetitiveTask = taskUtil.deepClone(
        handleTaskBasics(title, description, priority),
        handleTaskDates(deadline, allDay),
        handleTaskRepetition(repetitionPattern, repetitionValue, origin, clusterID)
    )

    taskUtil.updateTaskCollection(repetitiveTask, "repetitive");

    return repetitiveTask;
}

export function createRepetitiveGroupedTask(title, description, groupName, deadline,
    allDay, repetitionPattern, repetitionValue, origin, priority, clusterID) {
    
    const repetitiveGroupedTask = taskUtil.deepClone(
        handleTaskBasics(title, description, priority),
        handleTaskDates(deadline, allDay),
        handleTaskGroups(groupName),
        handleTaskRepetition(repetitionPattern, repetitionValue, origin, clusterID)
    )

    taskUtil.updateTaskCollection(repetitiveGroupedTask, "repetitiveGrouped");
    taskUtil.updateGroups(repetitiveGroupedTask.group, repetitiveGroupedTask);

    return repetitiveGroupedTask;
}

// const repetitiveTask = createRepetitiveTask("repetitive task", "checking repetition",
//     "2025-02-17T12:30:00", false, "hybrid-weekly", [[1,3,5], {"weeks": 1}], true, 2, null
// );

const repetitiveGroupedTask = createRepetitiveGroupedTask("repetitive & grouped task", "checking repetition & groups",
    "reoccurs", "2025-02-21", true, "hybrid-monthly", [1,3,{ "months": 1 }], true, 3, null
);

// repetitionGenerator.generateRepetition(repetitiveTask, true);
repetitionGenerator.generateRepetition(repetitiveGroupedTask, true);


console.log(taskUtil.taskCollection);

let count = 0;

for (let index in taskUtil.taskCollection.repetitiveGrouped) {
    count++;
    let task = taskUtil.taskCollection.repetitiveGrouped[index];
    console.log(task.title, task.id, task.clusterID, task.origin, task.deadline, task.group);
    console.log("Task on Day:", getDay(Date.parse(task.deadline)));
}

console.log(count);