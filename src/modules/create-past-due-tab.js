import { getPastDueTasks } from "./task-utility-functions.js";
import { getTaskTime, getTaskDateTextFormat } from "./misc-utilities.js";
import { buildElement } from "./dom-manipulator.js";
import { taskContEventListeners, resetChooseOneFilterSelection, getFilterOptionsCont, createNoScheduledTasksMsg, checkDueStatus, refreshTabEvent } from "./ui-task-utilities.js";
import { priorityFirst, latestFirst } from "./filter-tasks.js";

import editSvg from "../images/Edit.svg";
import deleteSvg from "../images/Delete.svg";
import refreshSvg from "../images/Refresh.svg";

function filterByPriorityPastDue(filterButton, directClick = false) {
    const pastDueTaskCont = document.querySelector(".past-due-tasks-cont");
    const noMsg = document.querySelector(".no-scheduled-tasks-msg");

    // Check if there are no tasks
    if (pastDueTaskCont === null) {
        // If there are truly no tasks scheduled for today (even completed ones) remove the filter container and display the "no tasks ..." message
        if (getPastDueTasks().length === 0 ) {
            filterButton.parentNode.remove();
            createNoScheduledTasksMsg(document.querySelector(".past-due-tab-cont"), "past-due");
            return;
        }

        // If there are tasks scheduled for today (even completed ones) remove the "no tasks ..." message
        else if (noMsg !== null) {
            noMsg.remove();
        }
    }

    // Preemptively remove the container and prepare to generate a new one
    if (!(pastDueTaskCont === null)) {
        pastDueTaskCont.remove();
    }

    // Disables the filter when the users directly press on it
    if (filterButton.classList.contains("active-filter") && directClick === true) {
        filterButton.classList.remove("active-filter");
        createPastDueTabTasks(document.querySelector(".past-due-tab-cont"));
        return;
    }

    resetChooseOneFilterSelection(filterButton.parentNode);
    filterButton.classList.add("active-filter");
    // Using ! because the function takes the argument "filterOn" which is false if we're showing completed tasks 
    const taskList = priorityFirst(getPastDueTasks());

    createPastDueTabTasks(document.querySelector(".past-due-tab-cont"), taskList);
}

function filterByTimePastDue(filterButton, directClick = false) {
    const pastDueTaskCont = document.querySelector(".past-due-tasks-cont");
    const noMsg = document.querySelector(".no-scheduled-tasks-msg");

    // Check if there are no tasks
    if (pastDueTaskCont === null) {
        // If there are truly no tasks scheduled for today (even completed ones) remove the filter container and display the "no tasks ..." message
        if (getPastDueTasks().length === 0 ) {
            filterButton.parentNode.remove();
            createNoScheduledTasksMsg(document.querySelector(".past-due-tab-cont"), "past-due");
            return;
        }

        // If there are tasks scheduled for today (even completed ones) remove the "no tasks ..." message
        else if (noMsg !== null) {
            noMsg.remove();
        }
    }

    // Preemptively remove the container and prepare to generate a new one
    if (!(pastDueTaskCont === null)) {
        pastDueTaskCont.remove();
    }

    // Disables the filter when the users directly press on it
    if (filterButton.classList.contains("active-filter") && directClick === true) {
        filterButton.classList.remove("active-filter");
        createPastDueTabTasks(document.querySelector(".past-due-tab-cont"));
        return;
    }

    resetChooseOneFilterSelection(filterButton.parentNode);
    filterButton.classList.add("active-filter");
    // Using ! because the function takes the argument "filterOn" which is false if we're showing completed tasks 
    const taskList = latestFirst(getPastDueTasks());

    createPastDueTabTasks(document.querySelector(".past-due-tab-cont"), taskList);
}


function pastDueFilterEvent(filterCont) {
    filterCont.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("filter-options")) {
            return;
        }

        if (target.classList.contains("filter-priority")) {
            filterByPriorityPastDue(target, true);
        }
        else {
            filterByTimePastDue(target, true);
        }
    });
}

function createPastDueTabHeader(tabCont) {
    const tabHeaderCont = buildElement("div", "past-due-tab-header-cont", "tab-header-cont");

    const tabHeader = buildElement("h1", "past-due-tab-header", "tab-header");
    tabHeader.textContent = "Past Due";
    

    const refreshIcon = buildElement("img", "refresh-icon");
    refreshIcon.src = refreshSvg;
    refreshIcon.alt = "Refresh";
    refreshTabEvent(refreshIcon, ".past-due-tasks-cont", createPastDueTabTasks, tabCont);

    tabHeaderCont.appendChild(tabHeader);
    tabHeaderCont.appendChild(refreshIcon);

    tabCont.appendChild(tabHeaderCont);
}

function createPastDueFilterOptions(tabCont) {
    if (getPastDueTasks().length === 0) {
        return;
    }

    const filterOptionsCont = buildElement("div", "filter-options");

    const filterPriority = buildElement("p", "filter-priority", "choose-one");
    filterPriority.textContent = "Filter by Priority";

    const filterTime = buildElement("p", "filter-time", "choose-one");
    filterTime.textContent = "Filter by Time";

    filterOptionsCont.appendChild(filterPriority);
    filterOptionsCont.appendChild(filterTime);

    pastDueFilterEvent(filterOptionsCont);

    tabCont.appendChild(filterOptionsCont);
}

function createPastDueTabTasks(tabCont, filter = false) {
    let pastDueTasks;
    if (!filter) {
        pastDueTasks = getPastDueTasks();
    }
    else {
        pastDueTasks = filter;
    }

    if (pastDueTasks.length === 0) {
        const filterCont = getFilterOptionsCont(tabCont);
        if (filterCont !== null) {
            filterCont.remove();
        }

        if (document.querySelector(".no-past-due-tasks-msg") === null) {
            createNoScheduledTasksMsg(tabCont, "past-due");
        }
        return;
    }

    const pastDueCont = buildElement("div", "past-due-tasks-cont");

    for (let taskIndex in pastDueTasks) {
        let task = pastDueTasks[taskIndex];

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

        let taskInfo = buildElement("div", "task-info");

        let taskTitle = buildElement("div", "task-title");
        taskTitle.textContent = task.title;

        taskInfo.appendChild(taskTitle);

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

        pastDueCont.appendChild(taskCont);
    }

    tabCont.appendChild(pastDueCont);
} 


export function createPastDueTab() {
    const PastDueTabCont = document.querySelector(".past-due-tab-cont");

    createPastDueTabHeader(PastDueTabCont);
    createPastDueFilterOptions(PastDueTabCont);
    createPastDueTabTasks(PastDueTabCont);
}