import { getTodayTasks } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { completedPriorityAndTimeFilterCont } from "./build-filter-cont.js";
import { todayTaskCont } from "./build-task-cont.js";
import { todayTabHeader } from "./build-tab-header.js";
import { taskContEventListeners, resetChooseOneFilterSelection,
    refreshTabEvent, clearTab } from "./ui-task-utilities.js";
import { filterInitialCheck, deactivateCompletedFilter, deactivateChooseOneFilterWithCompleted } from "./filter-tasks-ui.js";
import { priorityFirst, earliestFirst } from "./filter-tasks.js";

function showCompletedTasksToday(filterButton, directClick = false) {
    filterInitialCheck(filterButton, document.querySelector(".today-tab-cont"), document.querySelector(".tasks-today-cont"),
    document.querySelector(".no-tasks-today-msg"), "today", getTodayTasks, false);

    // Check what filters are active to ensure they are kept
    
    // Disables the filter when the users directly press on it
    if (filterButton.classList.contains("active-filter") && directClick === true) {
        deactivateCompletedFilter(filterButton,
        [filterButton.parentNode.querySelector(".filter-priority"), filterButton.parentNode.querySelector(".filter-time")],
        [filterByPriorityToday, filterByEarliestFirstToday], createTodayTabTasks, document.querySelector(".today-tab-cont"));
            
        return;
    }

    const activePriority = filterButton.parentNode.querySelector(".filter-priority").classList.contains("active-filter");
    const activeTime = filterButton.parentNode.querySelector(".filter-time").classList.contains("active-filter");

    filterButton.classList.add("active-filter");
    const taskList = getTodayTasks(false);

    if (activePriority) {
        filterByPriorityToday(filterButton.parentNode.querySelector(".filter-priority"));
    }
    else if (activeTime) {
        filterByEarliestFirstToday(filterButton.parentNode.querySelector(".filter-time"));
    }
    else {
        createTodayTabTasks(document.querySelector(".today-tab-cont"), taskList);
    }
}

function filterByPriorityToday(filterButton, directClick = false) {
    filterInitialCheck(filterButton, document.querySelector(".today-tab-cont"), document.querySelector(".tasks-today-cont"),
    document.querySelector(".no-tasks-today-msg"), "today", getTodayTasks, false);

    const includeCompleted = filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");

    // Disables the filter when the users directly press on it
    if (filterButton.classList.contains("active-filter") && directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterButton, includeCompleted, showCompletedTasksToday,
        createTodayTabTasks, document.querySelector(".today-tab-cont"));
        return;
    }

    resetChooseOneFilterSelection(filterButton.parentNode);
    filterButton.classList.add("active-filter");
    // Using ! because the function takes the argument "filterOn" which is false if we're showing completed tasks 
    const taskList = priorityFirst(getTodayTasks(!includeCompleted));

    createTodayTabTasks(document.querySelector(".today-tab-cont"), taskList);
}

function filterByEarliestFirstToday(filterButton, directClick = false) {
    filterInitialCheck(filterButton, document.querySelector(".today-tab-cont"), document.querySelector(".tasks-today-cont"),
    document.querySelector(".no-tasks-today-msg"), "today", getTodayTasks, false);

    const includeCompleted = filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");

    // Disables the filter when the users directly press on it
    if (filterButton.classList.contains("active-filter") && directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterButton, includeCompleted, showCompletedTasksToday,
        createTodayTabTasks, document.querySelector(".today-tab-cont"));
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
            filterByPriorityToday(target, true);
        }
        else if (target.classList.contains("filter-time")) {
            filterByEarliestFirstToday(target, true);
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
    const noMsg = document.querySelector(".no-tasks-today-msg");

    let todayTasks;
    if (!filter) {
        todayTasks = getTodayTasks();
    }
    else {
        todayTasks = filter;
    }

    if (todayTasks.length === 0) {
        clearTab(tabCont, getTodayTasks, false, noMsg, "today");
        return;
    }
    else {
        if (noMsg !== null) {
            noMsg.remove();
        }

        if (tabCont.querySelector(".filter-options") === null) {
            createTodayFilterOptions(tabCont);
        }
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