import { getTodayTasks, getTaskTime } from "./task-utility-functions.js";
import { buildElement } from "./dom-manipulator.js";
import { differenceInHours, getTime } from "../../node_modules/date-fns";

import editSvg from "../images/Edit.svg";
import deleteSvg from "../images/Delete.svg";

function getTodayDate() {
    let fullDate = new Date();

    let formattedDate = fullDate.getDate() + "." + (fullDate.getMonth() + 1) + "." + fullDate.getFullYear();

    return formattedDate;
}

function createTodayTabHeader(tabCont) {
    const todayDate = getTodayDate();

    const tabHeader = buildElement("h1", "today-tab-header");
    tabHeader.textContent = "Today - " + todayDate;

    tabCont.appendChild(tabHeader);
}

function createNoScheduledTasksMsg(tabCont) {
    const msgCont = buildElement("div", "no-scheduled-tasks-msg");
    msgCont.textContent = "No tasks scheduled for today";

    tabCont.appendChild(msgCont);
}

// Decides how to color the time of a task
function checkDueStatus(deadline) {

    console.log(differenceInHours(new Date("2025-02-22T11:30:00"), new Date()));

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

function createTodayTabTasks(tabCont) {
    const todayTasks = getTodayTasks();

    if (todayTasks.length === 0) {
        createNoScheduledTasksMsg(tabCont);
        return;
    }

    const tasksTodayCont = buildElement("div", "tasks-today-cont");

    for (let taskIndex in todayTasks) {
        let task = todayTasks[taskIndex];

        let priorityClass = "priority-one";

        if (task.priority === 2) {
            priorityClass = "priority-two";
        }
        else if (task.priority === 3) {
            priorityClass = "priority-three";
        }

        let taskCont = buildElement("div", "task-cont", priorityClass);

        let checkbox = buildElement("input", "complete-task");
        checkbox.type = "checkbox";

        let taskInfo = buildElement("div", "task-info");

        let taskTitle = buildElement("div", "task-title");
        taskTitle.textContent = task.title;

        taskInfo.appendChild(taskTitle);

        if(!task.allDay) {
            let dueStatus = checkDueStatus(task.deadline);
            let taskTimeCont = buildElement("div", "dated-task-time", dueStatus);
            taskTimeCont.textContent = getTaskTime(task);

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

        tasksTodayCont.appendChild(taskCont);
    }

    tabCont.appendChild(tasksTodayCont);
}


export function createTodayTab() {
    const todayTabCont = document.querySelector(".today-tab-cont");

    createTodayTabHeader(todayTabCont);
    createTodayTabTasks(todayTabCont);
}