import { getBasicTaskList, getDatedGroupedTaskList, getDatedTaskList, getGroupedTaskList,
    getRepetitiveGroupedTaskList, getRepetitiveTaskList } from "./create-local-storage-task-lists.js";


// This module is used to update localStorage items
// This module handles item creation for information that is stored for the first time

export function updateSettings(settingsValues) {
    localStorage.setItem("settingsValues", JSON.stringify(settingsValues));
    return true;
}

export function updateListingPositions(listedGroups) {
    localStorage.setItem("listingPositions", JSON.stringify(listedGroups));
    return true;
}

export function updateColorLabels(groupsColorLabels) {
    localStorage.setItem("colorLabels", JSON.stringify(groupsColorLabels));
    return true;
}


export function updateBasicTasks(basicTasks) {
    const basicTaskList = getBasicTaskList(basicTasks);
    
    localStorage.setItem("basicTasks", JSON.stringify(basicTaskList));
    return true;
}

export function updateGroupedTasks(groupedTasks) {
    const groupedTaskList = getGroupedTaskList(groupedTasks);
    
    localStorage.setItem("groupedTasks", JSON.stringify(groupedTaskList));
    return true;
}

export function updateDatedTasks(datedTasks) {
    const datedTaskList = getDatedTaskList(datedTasks);
    
    localStorage.setItem("datedTasks", JSON.stringify(datedTaskList));
    return true;
}

export function updateDatedGroupedTasks(datedGroupedTasks) {
    const datedGroupedTaskList = getDatedGroupedTaskList(datedGroupedTasks);
    
    localStorage.setItem("datedGroupedTasks", JSON.stringify(datedGroupedTaskList));
    return true;
}

export function updateRepetitiveTasks(repetitiveTasks) {
    const repetitiveTaskList = getRepetitiveTaskList(repetitiveTasks);
    
    localStorage.setItem("repetitiveTasks", JSON.stringify(repetitiveTaskList));
    return true;
}

export function updateRepetitiveGroupedTasks(repetitiveGroupedTasks) {
    const repetitiveGroupedTaskList = getRepetitiveGroupedTaskList(repetitiveGroupedTasks);
    
    localStorage.setItem("repetitiveGroupedTasks", JSON.stringify(repetitiveGroupedTaskList));
    return true;
}

export function updateTasks(taskType, taskList) {
    switch (taskType) {
        case "basic":
            updateBasicTasks(taskList);
            break;

        case "grouped":
            updateGroupedTasks(taskList);
            break;

        case "dated":
            updateDatedTasks(taskList);
            break;

        case "datedGrouped":
            updateDatedGroupedTasks(taskList);
            break;

        case "repetitive":
            updateRepetitiveTasks(taskList);
            break;

        case "repetitiveGrouped":
            updateRepetitiveGroupedTasks(taskList);
            break;
    }
}