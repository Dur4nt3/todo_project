import { getTodayTasks, getTaskTime } from "./task-utility-functions.js";
import { buildElement } from "./dom-manipulator.js";
import { differenceInHours } from "../../node_modules/date-fns";
import { taskContEventListeners, resetChooseOneFilterSelection } from "./ui-task-utilities.js";
import { priorityFirst, latestTodayFirst } from "./filter-tasks.js";

import editSvg from "../images/Edit.svg";
import deleteSvg from "../images/Delete.svg";

function showCompletedTasksToday(filterButton, directClick = false) {
    const todayTaskCont = document.querySelector(".tasks-today-cont");
    const noMsg = document.querySelector(".no-scheduled-tasks-msg");

    if (todayTaskCont === null) {
        if (getTodayTasks(false).length === 0 ) {
            return;
        }
        else if (noMsg !== null) {
            document.querySelector(".no-scheduled-tasks-msg").remove();
        }
    }

    if (!(todayTaskCont === null)) {
        todayTaskCont.remove();
    }

    if (filterButton.classList.contains("active-filter") && directClick === true) {
        filterButton.classList.remove("active-filter");
        createTodayTabTasks(document.querySelector(".today-tab-cont"));
        return;
    }
    
    filterButton.classList.add("active-filter");
    const taskList = getTodayTasks(false);

    if (filterButton.parentNode.querySelector(".filter-priority").classList.contains("active-filter")) {
        filterByPriority(filterButton.parentNode.querySelector(".filter-priority"));
    }
    else if (filterButton.parentNode.querySelector(".filter-time").classList.contains("active-filter")) {
        filterByTime(filterButton.parentNode.querySelector(".filter-time"));
    }
    else {
        createTodayTabTasks(document.querySelector(".today-tab-cont"), taskList);
    }
}


function filterByPriority(filterButton, directClick = false) {
    const todayTaskCont = document.querySelector(".tasks-today-cont");
    const noMsg = document.querySelector(".no-scheduled-tasks-msg");

    if (todayTaskCont === null) {
        if (getTodayTasks(false).length === 0 ) {
            return;
        }
        else if (noMsg !== null) {
            document.querySelector(".no-scheduled-tasks-msg").remove();
        }
    }

    if (!(todayTaskCont === null)) {
        todayTaskCont.remove();
    }

    const includeCompleted = filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");

    if (filterButton.classList.contains("active-filter") && directClick === true) {
        filterButton.classList.remove("active-filter");
        if (includeCompleted) {
            showCompletedTasksToday(filterButton.parentNode.querySelector(".show-completed"));
            return;
        }
        createTodayTabTasks(document.querySelector(".today-tab-cont"));
        return;
    }

    resetChooseOneFilterSelection(filterButton.parentNode);
    filterButton.classList.add("active-filter");
    // Using ! because the function takes the argument "filterOn" which is false if we're showing completed tasks 
    const taskList = priorityFirst(getTodayTasks(!includeCompleted));

    createTodayTabTasks(document.querySelector(".today-tab-cont"), taskList);
}


function filterByTime(filterButton, directClick = false) {
    const todayTaskCont = document.querySelector(".tasks-today-cont");
    const noMsg = document.querySelector(".no-scheduled-tasks-msg");

    if (todayTaskCont === null) {
        if (getTodayTasks(false).length === 0 ) {
            return;
        }
        else if (noMsg !== null) {
            document.querySelector(".no-scheduled-tasks-msg").remove();
        }
    }

    if (!(todayTaskCont === null)) {
        todayTaskCont.remove();
    }

    const includeCompleted = filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");

    if (filterButton.classList.contains("active-filter") && directClick === true) {
        filterButton.classList.remove("active-filter");
        if (includeCompleted) {
            showCompletedTasksToday(filterButton.parentNode.querySelector(".show-completed"));
            return;
        }
        createTodayTabTasks(document.querySelector(".today-tab-cont"));
        return;
    }

    resetChooseOneFilterSelection(filterButton.parentNode);
    filterButton.classList.add("active-filter");
    // Using ! because the function takes the argument "filterOn" which is false if we're showing completed tasks 
    const taskList = latestTodayFirst(getTodayTasks(!includeCompleted));

    createTodayTabTasks(document.querySelector(".today-tab-cont"), taskList);
}


function todayFilterEvent(filterCont) {
    filterCont.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("filter-options")) {
            return;
        }

        if (target.classList.contains("show-completed")) {
            showCompletedTasksToday(target, true);
        }
        else if (target.classList.contains("filter-priority")) {
            filterByPriority(target, true);
        }
        else {
            filterByTime(target, true);
        }
    });
}


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


function createTodayFilterOptions(tabCont) {
    if (getTodayTasks(false).length === 0) {
        return;
    }

    const filterOptionsCont = buildElement("div", "filter-options");

    const showCompleted = buildElement("p", "show-completed");
    showCompleted.textContent = "Show Completed";

    const filterPriority = buildElement("p", "filter-priority", "choose-one");
    filterPriority.textContent = "Filter by Priority";

    const filterTime = buildElement("p", "filter-time", "choose-one");
    filterTime.textContent = "Filter by Time";

    filterOptionsCont.appendChild(showCompleted);
    filterOptionsCont.appendChild(filterPriority);
    filterOptionsCont.appendChild(filterTime);

    todayFilterEvent(filterOptionsCont);

    tabCont.appendChild(filterOptionsCont);
}


function createTodayTabTasks(tabCont, filter = false) {
    let todayTasks;
    if (!filter) {
        todayTasks = getTodayTasks();
    }
    else {
        todayTasks = filter;
    }

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
        taskCont.id = task.id;

        let checkbox = buildElement("input", "complete-task");
        checkbox.type = "checkbox";

        if (task.completionStatus === true) {
            checkbox.checked = true;
        }

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

        taskContEventListeners(taskCont);

        tasksTodayCont.appendChild(taskCont);
    }

    tabCont.appendChild(tasksTodayCont);
}


export function createTodayTab() {
    const todayTabCont = document.querySelector(".today-tab-cont");

    createTodayTabHeader(todayTabCont);
    createTodayFilterOptions(todayTabCont);
    createTodayTabTasks(todayTabCont);
}