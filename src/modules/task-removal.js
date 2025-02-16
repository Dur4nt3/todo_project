import { taskCollection, taskGroups } from "./task-utility-functions.js";

function removeFromTaskGroups(taskID, groupName) {
    for (let index in taskGroups[groupName]) {
        let task = taskGroups[groupName][index];
        if (task.id === taskID) {
            taskGroups[groupName].splice(index, 1);
            // If removed the last task in the group => delete the group
            if (taskGroups[groupName].length === 0) {
                delete taskGroups[groupName];
            }
        }
    }
}

export function removeFromTaskCollection(taskID, taskType) {
    for (let index in taskCollection[taskType]) {
        let task = taskCollection[taskType][index];
        if (task.id === taskID) {
            taskCollection[taskType].splice(index, 1);
            if (task.group !== undefined) {
                removeFromTaskGroups(taskID, task.group);
            }
        }
    }
}

export function removeClusterFromTaskCollection(clusterID, taskType) {
    for (let i = taskCollection[taskType].length - 1; i >= 0; i--) {
        let task = taskCollection[taskType][i];
        if (task.clusterID === clusterID) {
            taskCollection[taskType].splice(i, 1);
            if (task.group !== undefined) {
                removeFromTaskGroups(task.id, task.group);
            }
        }
    }
}
