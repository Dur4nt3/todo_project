import { buildElement } from "./dom-manipulator.js";
import { getTaskTime, getTaskDateTextFormat } from "./misc-utilities.js";
import { differenceInHours } from "../../node_modules/date-fns";

import clockSvg from "../images/Clock.svg";
import editSvg from "../images/Edit.svg";
import deleteSvg from "../images/Delete.svg";

// This module is used to build a variety of task containers
// This containers are the tasks the user views in each tabs
// *This module is not to be confused with the "task-modal.js" module*

function checkDueStatus(deadline) {

    if (differenceInHours(deadline, new Date()) > 1) {
        return "due";
    }
    else if (differenceInHours(deadline, new Date()) <= 1 && differenceInHours(deadline, new Date()) > 0) {
        return "due-soon";
    }
    else if (differenceInHours(deadline, new Date()) <= 0) {
        return "past-due";
    }
}

export function generalTaskCont(task) {
    let priorityClass = "priority-one";

    if (task.priority === 2) {
        priorityClass = "priority-two";
    }
    else if (task.priority === 3) {
        priorityClass = "priority-three";
    }

    let taskCont = buildElement("div", "task-cont", priorityClass);
    taskCont.id = task.id;

    let checkbox = buildElement("input", "complete-task");
    checkbox.type = "checkbox";
    checkbox.name = "complete-task";
    checkbox.checked = task.completionStatus;

    let taskInfo = buildElement("div", "task-info");

    let taskTitle = buildElement("div", "task-title");
    taskTitle.textContent = task.title;

    taskInfo.appendChild(taskTitle);

    if (!(task.deadline === undefined)) {
        let taskDateCont = buildElement("div", "dated-task-full-date-cont");

        let taskDateText = buildElement("p", "dated-task-full-date-text");
        taskDateText.textContent = getTaskDateTextFormat(task.deadline);

        taskDateCont.appendChild(taskDateText);

        if(!task.allDay) {
            let taskTime = buildElement("p", "dated-task-full-date-text");
            taskTime.textContent = "at " + getTaskTime(task);

            taskDateCont.appendChild(taskTime);
        }

        taskInfo.appendChild(taskDateCont);
    }

    let taskOptions = buildElement("div", "task-options");

    let editIcon = buildElement("img", "task-options-icon", "edit-task");
    let deleteIcon = buildElement("img", "task-options-icon", "delete-task");

    editIcon.src = editSvg;
    editIcon.alt = "Edit Task";

    deleteIcon.src = deleteSvg;
    deleteIcon.alt = "Delete Task";

    taskOptions.appendChild(editIcon);
    taskOptions.appendChild(deleteIcon);

    taskCont.appendChild(checkbox);
    taskCont.appendChild(taskInfo);
    taskCont.appendChild(taskOptions);

    return taskCont;
}

export function todayTaskCont(task) {
    let priorityClass = "priority-one";
    if (task.priority === 2) {
        priorityClass = "priority-two";
    }
    else if (task.priority === 3) {
        priorityClass = "priority-three";
    }

    let taskCont = buildElement("div", "task-cont", priorityClass);
    taskCont.id = task.id;

    let checkbox = buildElement("input", "complete-task");
    checkbox.type = "checkbox";
    checkbox.name = "complete-task";
    checkbox.checked = task.completionStatus;

    let taskInfo = buildElement("div", "task-info");

    let taskTitle = buildElement("div", "task-title");
    taskTitle.textContent = task.title;

    taskInfo.appendChild(taskTitle);

    if(!task.allDay) {
        let dueStatus = checkDueStatus(task.deadline);
        let taskTimeCont = buildElement("div", "dated-task-time-cont");

        let taskTime = buildElement("p", "dated-task-time-text", dueStatus);
        taskTime.textContent = getTaskTime(task);

        let clockIcon = buildElement("img", "clock-icon");
        clockIcon.src = clockSvg;
        clockIcon.alt = "Due Time";

        taskTimeCont.appendChild(taskTime);
        taskTimeCont.appendChild(clockIcon);

        taskInfo.appendChild(taskTimeCont);
    }

    let taskOptions = buildElement("div", "task-options");

    let editIcon = buildElement("img", "task-options-icon", "edit-task");
    let deleteIcon = buildElement("img", "task-options-icon", "delete-task");

    editIcon.src = editSvg;
    editIcon.alt = "Edit Task";

    deleteIcon.src = deleteSvg;
    deleteIcon.alt = "Delete Task";

    taskOptions.appendChild(editIcon);
    taskOptions.appendChild(deleteIcon);

    taskCont.appendChild(checkbox);
    taskCont.appendChild(taskInfo);
    taskCont.appendChild(taskOptions);

    return taskCont;
}

export function searchTaskCont(task, keyword) {
    const taskCont = generalTaskCont(task);

    const taskTitle = taskCont.querySelector(".task-title");

    const regex = new RegExp(keyword, 'gi');

    let currentText = taskTitle.innerHTML;
    currentText = currentText.replace(/(<span class="highlight-text">|<\/span>)/gim, '');

    const newText = currentText.replace(regex, '<span class="highlight-text">$&</span>');
    taskTitle.innerHTML = newText;

    return taskCont;
}