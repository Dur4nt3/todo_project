import { getTaskDateObject } from "./misc-utilities.js";
import { removeFromTaskCollection } from "./task-removal.js";

// Because repetitive tasks have functionality both as a cluster and as individual tasks some adjustments may be required
// For example: unique title, descriptions, and completion statuses
// This module aims to ensure that tasks generated via the localStorage reflect the repetitive tasks that the user created/edited

// matches a already created task to its equivalent in the localStorage
function findParallelInCluster(storedTask, cluster) {
    for (let i in cluster) {
        let task = cluster[i];
        // No two tasks in the cluster will have the same deadline unless one is an origin
        // Therefore, this is a viable method to find parallels
        if (task.deadline === storedTask.deadline && task.origin === storedTask.origin) {
            return task;
        }
    }
}

function findLatestInStorage(storedTaskList) {
    let latest = storedTaskList[0].deadline;
    for (let i in storedTaskList) {
        if (Date.parse(storedTaskList[i].deadline) > Date.parse(latest)) {
            latest = storedTaskList[i].deadline;
        }
    }

    return latest;
}

function adjustForDeletions(storedTaskList, cluster, taskType) {
    const taskListCopy = storedTaskList.slice();
    const latest = findLatestInStorage(storedTaskList);

    for (let i in cluster) {
        let task = cluster[i];

        // Without this generating new tasks is impossible
        // Downside: can't delete tasks from the chronological end of the cluster
        if (Date.parse(task.deadline) > Date.parse(latest)) {
            continue;
        }


        // Another loop was chosen due to the fact that tasks in "cluster" don't match tasks in "storedTaskList"
        // Therefore, we cannot use the "includes" Array prototype method (it will never return true)
        for (let j in taskListCopy) {
            let storedTask = taskListCopy[j];
            // If the task wasn't deleted => move on to the next => delete the entry to shorten runtime
            if (task.deadline === storedTask.deadline && task.origin === storedTask.origin) {
                break;
            }

            // You've reach the last task in the localStorage entries, therefore, this task was deleted => remove it
            if (j == (taskListCopy.length - 1)) {
                removeFromTaskCollection(task.id, taskType);
            }
        }
    }
}

function validateRepetitiveAdjustments(storedTask) {
    let proposedValues = [storedTask.title, storedTask.description, storedTask.priority, storedTask.completed];
    for (let i in proposedValues) {
        if (proposedValues[i] === undefined) {
            return false;
        }
    }
    return true;
}

function validateRepetitiveGroupedAdjustments(storedTask) {
    let proposedValues = [storedTask.title, storedTask.description, storedTask.priority, storedTask.group, storedTask.completed];
    for (let i in proposedValues) {
        if (proposedValues[i] === undefined) {
            return false;
        }
    }
    return true;
}

export function adjustRepetitiveTasks(storedTaskList, cluster) {
    adjustForDeletions(storedTaskList, cluster, "repetitive");

    for (let i in storedTaskList) {
        let storedTask = storedTaskList[i]
        let parallel = findParallelInCluster(storedTask, cluster);
        // If a parallel wasn't found or the adjustments to be made are for some reason invalid => skip the adjustment
        // Furthermore, origin tasks don't need to be adjusted (even if it's skipped there will be no effect)
        if (parallel === undefined || !(validateRepetitiveAdjustments(storedTask)) || storedTask.origin === true) {
            continue;
        }
        parallel.title = storedTask.title;
        parallel.description = storedTask.description;
        parallel.priority = storedTask.priority;
        if (storedTask.completed === true) {
            parallel.complete();
        }
    }

}

export function adjustRepetitiveGroupedTasks(storedTaskList, cluster) {
    adjustForDeletions(storedTaskList, cluster, "repetitiveGrouped");
    
    for (let i in storedTaskList) {
        let storedTask = storedTaskList[i]
        let parallel = findParallelInCluster(storedTask, cluster);
        // If a parallel wasn't found or the adjustments to be made are for some reason invalid => skip the adjustment
        // Furthermore, origin tasks don't need to be adjusted (even if it's skipped there will be no effect)
        if (parallel === undefined || !(validateRepetitiveGroupedAdjustments(storedTask)) || storedTask.origin === true) {
            continue;
        }
        parallel.title = storedTask.title;
        parallel.description = storedTask.description;
        parallel.priority = storedTask.priority;
        parallel.group = storedTask.group;
        if (storedTask.completed === true) {
            parallel.complete();
        }
    }
}