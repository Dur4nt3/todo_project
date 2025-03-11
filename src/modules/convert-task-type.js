import * as taskRemoval from "./task-removal.js";
import * as createTask from "./create-task-objects.js";

// This module is used to convert a specific task into a different task type

// Convert a basic task to a dated one (with a deadline)
export function basicToDated(basicTask, deadline, allDay) {
    taskRemoval.removeFromTaskCollection(basicTask.id, "basic");

    const newDatedTask = createTask.createDatedTask(basicTask.title, basicTask.description, 
    deadline, allDay, basicTask.priority
    );

    return newDatedTask;
}

// Convert a dated task to a basic one (without a deadline)
export function datedToBasic(datedTask) {
    taskRemoval.removeFromTaskCollection(datedTask.id, "dated");

    const newBasicTask = createTask.createBasicTask(datedTask.title, datedTask.description,
    datedTask.priority);

    return newBasicTask;
}

// Convert a basic task to grouped one (with a group name)
export function basicToGrouped(basicTask, groupName) {
    taskRemoval.removeFromTaskCollection(basicTask.id, "basic");

    const newGroupedTask = createTask.createGroupedTask(basicTask.title, basicTask.description,
    groupName, basicTask.priority
    );

    return newGroupedTask;
}

// Convert a grouped task to a basic one (without a group name)
export function groupedToBasic(groupedTask) {
    taskRemoval.removeFromTaskCollection(groupedTask.id, "grouped");

    const newBasicTask = createTask.createBasicTask(groupedTask.title, groupedTask.description,
        groupedTask.priority);

    return newBasicTask;
}

// Convert a dated task to a grouped task (without a deadline)
export function datedToGrouped(datedTask, groupName) {
    taskRemoval.removeFromTaskCollection(datedTask.id, "dated");

    const newGroupedTask = createTask.createGroupedTask(datedTask.title, datedTask.description,
    groupName, datedTask.priority
    );

    return newGroupedTask;
}

// Convert a dated task to a dated & grouped task (with a deadline)
export function datedToDatedGrouped(datedTask, groupName) {
    taskRemoval.removeFromTaskCollection(datedTask.id, "dated");

    const newDatedGroupedTask = createTask.createDatedGroupedTask(datedTask.title, datedTask.description,
    groupName, datedTask.deadline, datedTask.allDay, datedTask.priority
    );

    return newDatedGroupedTask;
}

// Convert a grouped task to a dated one (without a group)
export function groupedToDated(groupedTask, deadline, allDay) {
    taskRemoval.removeFromTaskCollection(groupedTask.id, "grouped");

    const newDatedTask = createTask.createDatedTask(groupedTask.title, groupedTask.description, 
    deadline, allDay, groupedTask.priority
    );

    return newDatedTask;
}

// Convert a grouped task to a dated one (with a group)
export function groupedToDatedGrouped(groupedTask, deadline, allDay) {
    taskRemoval.removeFromTaskCollection(groupedTask.id, "grouped");

    const newDatedGroupedTask = createTask.createDatedGroupedTask(groupedTask.title, groupedTask.description,
    groupedTask.group, deadline, allDay, groupedTask.priority
    );

    return newDatedGroupedTask;
}

// Convert a dated and grouped task to a grouped one (without a deadline)
export function datedGroupedToGrouped(datedGroupedTask) {
    taskRemoval.removeFromTaskCollection(datedGroupedTask.id, "datedGrouped");

    const newGroupedTask = createTask.createGroupedTask(datedGroupedTask.title, datedGroupedTask.description,
    datedGroupedTask.group, datedGroupedTask.priority
    );

    return newGroupedTask;
}

// Convert a dated and grouped task to a dated one (without a group)
export function datedGroupedToDated(datedGroupedTask) {
    taskRemoval.removeFromTaskCollection(datedGroupedTask.id, "datedGrouped");
    
    const newDatedTask = createTask.createDatedTask(datedGroupedTask.title, datedGroupedTask.description, 
    datedGroupedTask.deadline, datedGroupedTask.allDay, datedGroupedTask.priority
    );

    return newDatedTask;
}