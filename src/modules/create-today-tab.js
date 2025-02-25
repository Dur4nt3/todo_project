import { getTodayTasks } from "./task-utility-functions.js";
import { getTaskTime } from "./misc-utilities.js";
import { buildElement } from "./dom-manipulator.js";
import { taskContEventListeners, resetChooseOneFilterSelection, getFilterOptionsCont, createNoScheduledTasksMsg, checkDueStatus, refreshTabEvent } from "./ui-task-utilities.js";
import { priorityFirst, latestTodayFirst } from "./filter-tasks.js";

import clockSvg from "../images/Clock.svg"
import editSvg from "../images/Edit.svg";
import deleteSvg from "../images/Delete.svg";
import refreshSvg from "../images/Refresh.svg";

function showCompletedTasksToday(filterButton, directClick = false) {
    const todayTaskCont = document.querySelector(".tasks-today-cont");
    const noMsg = document.querySelector(".no-scheduled-tasks-msg");

    // Check if there are no tasks
    if (todayTaskCont === null) {
        // If there are truly no tasks scheduled for today (even completed ones) remove the filter container and display the "no tasks ..." message
        if (getTodayTasks(false).length === 0 ) {
            filterButton.parentNode.remove();
            createNoScheduledTasksMsg(document.querySelector(".today-tab-cont"), "today");
            return;
        }

        // If there are tasks scheduled for today (even completed ones) remove the "no tasks ..." message
        else if (noMsg !== null) {
            document.querySelector(".no-scheduled-tasks-msg").remove();
        }
    }

    // Preemptively remove the container and prepare to generate a new one
    if (!(todayTaskCont === null)) {
        todayTaskCont.remove();
    }


    // Check what filters are active to ensure they are kept
    const activePriority = filterButton.parentNode.querySelector(".filter-priority").classList.contains("active-filter");
    const activeTime = filterButton.parentNode.querySelector(".filter-time").classList.contains("active-filter");

    // Disables the filter when the users directly press on it
    if (filterButton.classList.contains("active-filter") && directClick === true) {
        filterButton.classList.remove("active-filter");
        if (activePriority) {
            filterByPriority(filterButton.parentNode.querySelector(".filter-priority"));
            return;
        }
        else if (activeTime) {
            filterByTime(filterButton.parentNode.querySelector(".filter-time"));
            return;
        }
        createTodayTabTasks(document.querySelector(".today-tab-cont"));
        return;
    }
    
    filterButton.classList.add("active-filter");
    const taskList = getTodayTasks(false);

    if (activePriority) {
        filterByPriority(filterButton.parentNode.querySelector(".filter-priority"));
    }
    else if (activeTime) {
        filterByTime(filterButton.parentNode.querySelector(".filter-time"));
    }
    else {
        createTodayTabTasks(document.querySelector(".today-tab-cont"), taskList);
    }
}


function filterByPriority(filterButton, directClick = false) {
    const todayTaskCont = document.querySelector(".tasks-today-cont");
    const noMsg = document.querySelector(".no-scheduled-tasks-msg");

    // Check if there are no tasks
    if (todayTaskCont === null) {
        // If there are truly no tasks scheduled for today (even completed ones) remove the filter container and display the "no tasks ..." message
        if (getTodayTasks(false).length === 0 ) {
            filterButton.parentNode.remove();
            createNoScheduledTasksMsg(document.querySelector(".today-tab-cont"), "today");
            return;
        }

        // If there are tasks scheduled for today (even completed ones) remove the "no tasks ..." message
        else if (noMsg !== null) {
            document.querySelector(".no-scheduled-tasks-msg").remove();
        }
    }

    // Preemptively remove the container and prepare to generate a new one
    if (!(todayTaskCont === null)) {
        todayTaskCont.remove();
    }

    const includeCompleted = filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");

    // Disables the filter when the users directly press on it
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

    // Check if there are no tasks
    if (todayTaskCont === null) {
        // If there are truly no tasks scheduled for today (even completed ones) remove the filter container and display the "no tasks ..." message
        if (getTodayTasks(false).length === 0 ) {
            filterButton.parentNode.remove();
            createNoScheduledTasksMsg(document.querySelector(".today-tab-cont"), "today");
            return;
        }

        // If there are tasks scheduled for today (even completed ones) remove the "no tasks ..." message
        else if (noMsg !== null) {
            document.querySelector(".no-scheduled-tasks-msg").remove();
        }
    }

    // Preemptively remove the container and prepare to generate a new one
    if (!(todayTaskCont === null)) {
        todayTaskCont.remove();
    }

    const includeCompleted = filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");

    // Disables the filter when the users directly press on it
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
    // Using ! because the function takes the argument "filterOn" (i.e., filter completed tasks) which is false if we're showing completed tasks 
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

    const tabHeaderCont = buildElement("div", "today-tab-header-cont");

    const tabHeader = buildElement("h1", "today-tab-header");
    tabHeader.textContent = "Today - " + todayDate;

    const refreshIcon = buildElement("img", "refresh-icon");
    refreshIcon.src = refreshSvg;
    refreshIcon.alt = "Refresh";
    refreshTabEvent(refreshIcon, ".tasks-today-cont", createTodayTabTasks, tabCont);

    tabHeaderCont.appendChild(tabHeader);
    tabHeaderCont.appendChild(refreshIcon);

    tabCont.appendChild(tabHeaderCont);
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
        const filterCont = getFilterOptionsCont(tabCont);
        if (filterCont !== null && getTodayTasks(false).length === 0) {
            filterCont.remove();
        }
        createNoScheduledTasksMsg(tabCont, "today");
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