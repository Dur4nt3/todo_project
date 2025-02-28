import { getPastDueTasks } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { priorityAndTimeFilterCont } from "./build-filter-cont.js";
import { generalTaskCont } from "./build-task-cont.js";
import { generalTabHeader } from "./build-tab-header.js";
import { taskContEventListeners, resetChooseOneFilterSelection, getFilterOptionsCont, createNoScheduledTasksMsg, refreshTabEvent } from "./ui-task-utilities.js";
import { priorityFirst, earliestFirst } from "./filter-tasks.js";

function filterByPriorityPastDue(filterButton, directClick = false) {
    const pastDueTaskCont = document.querySelector(".past-due-tasks-cont");
    const noMsg = document.querySelector(".no-past-due-tasks-msg");

    // Check if there are no tasks
    if (pastDueTaskCont === null) {
        // If there are truly no tasks scheduled remove the filter container and display the "no tasks ..." message
        if (getPastDueTasks().length === 0 ) {
            filterButton.parentNode.remove();
            createNoScheduledTasksMsg(document.querySelector(".past-due-tab-cont"), "past-due");
            return;
        }

        // If there are tasks scheduled remove the "no tasks ..." message
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
    const noMsg = document.querySelector(".no-past-due-tasks-msg");

    // Check if there are no tasks
    if (pastDueTaskCont === null) {
        // If there are truly no tasks scheduled remove the filter container and display the "no tasks ..." message
        if (getPastDueTasks().length === 0 ) {
            filterButton.parentNode.remove();
            createNoScheduledTasksMsg(document.querySelector(".past-due-tab-cont"), "past-due");
            return;
        }

        // If there are tasks scheduled remove the "no tasks ..." message
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
    const taskList = earliestFirst(getPastDueTasks());

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
        else if (target.classList.contains("filter-time")) {
            filterByTimePastDue(target, true);
        }
    });
}

function createPastDueFilterOptions(tabCont) {
    if (getPastDueTasks().length === 0) {
        return;
    }

    const filterOptionsCont = priorityAndTimeFilterCont();

    pastDueFilterEvent(filterOptionsCont);

    tabCont.appendChild(filterOptionsCont);
}

function createPastDueTabHeader(tabCont) {
    const tabHeaderCont = generalTabHeader("past-due-tab", "Past Due");

    refreshTabEvent(tabHeaderCont.querySelector(".refresh-icon"), ".past-due-tasks-cont", createPastDueTabTasks, tabCont);

    tabCont.appendChild(tabHeaderCont);
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

        let taskCont = generalTaskCont(task);

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