import * as createTasks from "./create-task-objects.js";
import { generateRepetition } from "./repetition-generator.js";
import { updateBasicTasks, updateDatedGroupedTasks, updateDatedTasks, updateGroupedTasks, updateRepetitiveGroupedTasks, updateRepetitiveTasks } from "./update-local-storage.js";
import { taskCollection } from "./task-utility-functions.js";


function createBasicUI(taskDataObj) {
    createTasks.createBasicTask(taskDataObj.name, taskDataObj.description, taskDataObj.priority);
    updateBasicTasks(taskCollection["basic"]);
}

function createGroupedUI(taskDataObj) {
    createTasks.createGroupedTask(taskDataObj.name, taskDataObj.description, taskDataObj.group, taskDataObj.priority);
    updateGroupedTasks(taskCollection["grouped"]);
}

function createDatedUI(taskDataObj) {
    createTasks.createDatedTask(taskDataObj.name, taskDataObj.description, taskDataObj.timedDeadline, taskDataObj.allDay, taskDataObj.priority);
    updateDatedTasks(taskCollection["dated"]);
}

function createDatedGroupedUI(taskDataObj) {
    createTasks.createDatedGroupedTask(taskDataObj.name, taskDataObj.description, taskDataObj.group,
        taskDataObj.timedDeadline, taskDataObj.allDay, taskDataObj.priority);
    updateDatedGroupedTasks(taskCollection["datedGrouped"]);
}

function createRepetitiveUI(taskDataObj) {
    const repetitiveTask = createTasks.createRepetitiveTask(taskDataObj.name, taskDataObj.description,
        taskDataObj.timedDeadline, taskDataObj.allDay, taskDataObj.repetitionPattern, taskDataObj.repetitionValue,
        true, taskDataObj.priority, null);

    generateRepetition(repetitiveTask, true);
    updateRepetitiveTasks(taskCollection["repetitive"]);
}

function createRepetitiveGroupedUI(taskDataObj) {
    const repetitiveGroupedTask = createTasks.createRepetitiveGroupedTask(taskDataObj.name, taskDataObj.description,
        taskDataObj.group, taskDataObj.timedDeadline, taskDataObj.allDay, taskDataObj.repetitionPattern, taskDataObj.repetitionValue,
        true, taskDataObj.priority, null);

    generateRepetition(repetitiveGroupedTask, true);
    updateRepetitiveGroupedTasks(taskCollection["repetitiveGrouped"]);
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