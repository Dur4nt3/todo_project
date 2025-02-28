import { getTodayTasks } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { completedPriorityAndTimeFilterCont } from "./build-filter-cont.js";
import { todayTaskCont } from "./build-task-cont.js";
import { todayTabHeader } from "./build-tab-header.js";
import { taskContEventListeners, resetChooseOneFilterSelection, getFilterOptionsCont,
    createNoScheduledTasksMsg, refreshTabEvent } from "./ui-task-utilities.js";
import { priorityFirst, earliestFirst } from "./filter-tasks.js";

function showCompletedTasksToday(filterButton, directClick = false) {
    const todayTaskCont = document.querySelector(".tasks-today-cont");
    const noMsg = document.querySelector(".no-tasks-today-msg");

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
            noMsg.remove();
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
    const noMsg = document.querySelector(".no-tasks-today-msg");

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
            noMsg.remove();
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
    const noMsg = document.querySelector(".no-tasks-today-msg");

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
            document.querySelector(".no-tasks-today-msg").remove();
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
    const taskList = earliestFirst(getTodayTasks(!includeCompleted));

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
        else if (target.classList.contains("filter-time")) {
            filterByTime(target, true);
        }
    });
}


function createTodayFilterOptions(tabCont) {
    if (getTodayTasks(false).length === 0) {
        return;
    }

    const filterOptionsCont = completedPriorityAndTimeFilterCont();

    todayFilterEvent(filterOptionsCont);

    tabCont.appendChild(filterOptionsCont);
}

function createTodayTabHeader(tabCont) {
    const tabHeaderCont = todayTabHeader();

    refreshTabEvent(tabHeaderCont.querySelector(".refresh-icon"), ".tasks-today-cont", createTodayTabTasks, tabCont);

    tabCont.appendChild(tabHeaderCont);
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

        if (document.querySelector(".no-tasks-today-msg") === null) {
            createNoScheduledTasksMsg(tabCont, "today");
        }

        return;
    }

    const tasksTodayCont = buildElement("div", "tasks-today-cont");

    for (let taskIndex in todayTasks) {
        let task = todayTasks[taskIndex];

        let taskCont = todayTaskCont(task);
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