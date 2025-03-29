import * as createTasks from "./create-task-objects.js";
import { generateRepetition } from "./repetition-generator.js";
import { adjustRepetitiveTasks, adjustRepetitiveGroupedTasks } from "./local-storage-adjust-repetitive.js";
import { getClusterTasks } from "./repetitive-task-utilities.js";

function convertBasicTasks() {
    if (!localStorage.getItem("basicTasks") || localStorage.getItem("basicTasks") === 'undefined') {
        return;
    }

    const storedTasks = JSON.parse(localStorage.getItem("basicTasks"));
    for (let i in storedTasks) {
        let task = createTasks.createBasicTask(
            storedTasks[i].title, storedTasks[i].description, storedTasks[i].priority
        )
        if (storedTasks[i].completed === true) {
            task.complete();
        }
    }
}

function convertGroupedTasks() {
    if (!localStorage.getItem("groupedTasks") || localStorage.getItem("groupedTasks") === 'undefined') {
        return;
    }

    const storedTasks = JSON.parse(localStorage.getItem("groupedTasks"));
    for (let i in storedTasks) {
        let task = createTasks.createGroupedTask(
            storedTasks[i].title, storedTasks[i].description, storedTasks[i].group, storedTasks[i].priority
        )
        if (storedTasks[i].completed === true) {
            task.complete();
        }
    }
}

function convertDatedTasks() {
    if (!localStorage.getItem("datedTasks") || localStorage.getItem("datedTasks") === 'undefined') {
        return;
    }

    const storedTasks = JSON.parse(localStorage.getItem("datedTasks"));
    for (let i in storedTasks) {
        let task = createTasks.createDatedTask(
            storedTasks[i].title, storedTasks[i].description,
            storedTasks[i].deadline, storedTasks[i].allDay, storedTasks[i].priority
        )
        if (storedTasks[i].completed === true) {
            task.complete();
        }
    }
}

function convertDatedGroupedTasks() {
    if (!localStorage.getItem("datedGroupedTasks") || localStorage.getItem("datedGroupedTasks") === 'undefined') {
        return;
    }

    const storedTasks = JSON.parse(localStorage.getItem("datedGroupedTasks"));
    for (let i in storedTasks) {
        let task = createTasks.createDatedGroupedTask(
            storedTasks[i].title, storedTasks[i].description, storedTasks[i].group,
            storedTasks[i].deadline, storedTasks[i].allDay, storedTasks[i].priority
        )
        if (storedTasks[i].completed === true) {
            task.complete();
        }
    }
}

function getClusterWithinStorage(storedTasks, clusterID) {
    const cluster = []
    for (let i in storedTasks) {
        if (storedTasks[i].clusterID === clusterID) {
            cluster.push(storedTasks[i]);
        }
    }
    return cluster;
}

function convertRepetitiveTasks() {
    if (!localStorage.getItem("repetitiveTasks") || localStorage.getItem("repetitiveTasks") === 'undefined') {
        return;
    }

    const storedTasks = JSON.parse(localStorage.getItem("repetitiveTasks"));
    for (let i in storedTasks) {
        let storedTask = storedTasks[i];
        // Creation process is only relevant to origin tasks
        if (storedTask.origin !== true) {
            continue;
        }
        // From here on storedTask[i] has to be an origin

        // Get all tasks within the storage that match the origin's cluster ID
        const storedTaskList = getClusterWithinStorage(storedTasks, storedTask.clusterID);
        let originTask = createTasks.createRepetitiveTask(
            storedTask.title, storedTask.description, storedTask.deadline,
            storedTask.allDay, storedTask.repetitionPattern, storedTask.repetitionValue,
            true, storedTask.priority, null
        );
        generateRepetition(originTask, true);
        adjustRepetitiveTasks(storedTaskList, getClusterTasks(originTask));
    }
}

function convertRepetitiveGroupedTasks() {
    if (!localStorage.getItem("repetitiveGroupedTasks") || localStorage.getItem("repetitiveGroupedTasks") === 'undefined') {
        return;
    }

    const storedTasks = JSON.parse(localStorage.getItem("repetitiveGroupedTasks"));
    for (let i in storedTasks) {
        let storedTask = storedTasks[i];
        // Creation process is only relevant to origin tasks
        if (storedTask.origin !== true) {
            continue;
        }
        // From here on storedTask[i] has to be an origin

        // Get all tasks within the storage that match the origin's cluster ID
        const storedTaskList = getClusterWithinStorage(storedTasks, storedTask.clusterID);
        let originTask = createTasks.createRepetitiveGroupedTask(
            storedTask.title, storedTask.description, storedTask.group,
            storedTask.deadline, storedTask.allDay, 
            storedTask.repetitionPattern, storedTask.repetitionValue,
            true, storedTask.priority, null
        );
        generateRepetition(originTask, true);
        adjustRepetitiveGroupedTasks(storedTaskList, getClusterTasks(originTask));
    }
}

export function convertAllTasks() {
    convertBasicTasks();
    convertGroupedTasks();
    convertDatedTasks();
    convertDatedGroupedTasks();
    convertRepetitiveTasks();
    convertRepetitiveGroupedTasks();
}