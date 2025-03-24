import * as createTasks from "./create-task-objects.js";
import { generateRepetition } from "./repetition-generator.js";


function createBasicUI(taskDataObj) {
    createTasks.createBasicTask(taskDataObj.name, taskDataObj.description, taskDataObj.priority);
}

function createGroupedUI(taskDataObj) {
    createTasks.createGroupedTask(taskDataObj.name, taskDataObj.description, taskDataObj.group, taskDataObj.priority);
}

function createDatedUI(taskDataObj) {
    createTasks.createDatedTask(taskDataObj.name, taskDataObj.description, taskDataObj.timedDeadline, taskDataObj.allDay, taskDataObj.priority);
}

function createDatedGroupedUI(taskDataObj) {
    createTasks.createDatedGroupedTask(taskDataObj.name, taskDataObj.description, taskDataObj.group,
        taskDataObj.timedDeadline, taskDataObj.allDay, taskDataObj.priority);
}

function createRepetitiveUI(taskDataObj) {
    const repetitiveTask = createTasks.createRepetitiveTask(taskDataObj.name, taskDataObj.description,
        taskDataObj.timedDeadline, taskDataObj.allDay, taskDataObj.repetitionPattern, taskDataObj.repetitionValue,
        true, taskDataObj.priority, null);

    generateRepetition(repetitiveTask, true);
}

function createRepetitiveGroupedUI(taskDataObj) {
    const repetitiveGroupedTask = createTasks.createRepetitiveGroupedTask(taskDataObj.name, taskDataObj.description,
        taskDataObj.group, taskDataObj.timedDeadline, taskDataObj.allDay, taskDataObj.repetitionPattern, taskDataObj.repetitionValue,
        true, taskDataObj.priority, null);

    generateRepetition(repetitiveGroupedTask, true);
}

export function addTasksCreateTask(taskDataObj, taskType) {
    switch (taskType) {
        case "basic":
            return createBasicUI(taskDataObj);

        case "grouped":
            return createGroupedUI(taskDataObj);

        case "dated":
            return createDatedUI(taskDataObj);

        case "datedGrouped":
            return createDatedGroupedUI(taskDataObj);

        case "repetitive":
            return createRepetitiveUI(taskDataObj);

        case "repetitiveGrouped":
            return createRepetitiveGroupedUI(taskDataObj);
        
        // This indicates that a modal error should be raised
        default:
            return false;
    }
}