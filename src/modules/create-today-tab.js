import { getTodayTasks } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { completedPriorityAndTimeFilterCont } from "./build-filter-cont.js";
import { todayTaskCont } from "./build-task-cont.js";
import { todayTabHeader } from "./build-tab-header.js";
import { taskContEventListeners, refreshTabEvent, clearTab } from "./ui-task-utilities.js";
import { filterInfoWithCompleted, filterInitialCheck, deactivateCompletedFilter, deactivateChooseOneFilterWithCompleted,
    activateShowCompletedFilter, activateChooseOneFilter } from "./filter-tasks-ui.js";
import { priorityFirst, earliestFirst, latestFirst } from "./filter-tasks.js";

// This module is used to create the "Today" tab

function showCompletedTasksToday(filterInfoObj) {
    filterInitialCheck(filterInfoObj);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateCompletedFilter(filterInfoObj);
        return;
    }

    activateShowCompletedFilter(filterInfoObj);
    return;
}

function filterByPriorityToday(filterInfoObj) {
    let filterInfoCopy = filterInfoObj;
    filterInfoCopy.fetchArgs = true;

    filterInitialCheck(filterInfoCopy);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterInfoObj);
        return;
    }
    
    const includeCompleted = filterInfoObj.filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");
    const taskList = priorityFirst(getTodayTasks(includeCompleted));

    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function filterByEarliestFirstToday(filterInfoObj) {
    let filterInfoCopy = filterInfoObj;
    filterInfoCopy.fetchArgs = true;

    filterInitialCheck(filterInfoCopy);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterInfoObj);
        return;
    }
    
    const includeCompleted = filterInfoObj.filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");
    const taskList = earliestFirst(getTodayTasks(includeCompleted));
    
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function filterByLatestFirstToday(filterInfoObj) {
    let filterInfoCopy = filterInfoObj;
    filterInfoCopy.fetchArgs = true;

    filterInitialCheck(filterInfoCopy);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterInfoObj);
        return;
    }
    
    const includeCompleted = filterInfoObj.filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");
    const taskList = latestFirst(getTodayTasks(includeCompleted));
    
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function todayFilterEvent(filterCont) {
    filterCont.addEventListener("click", (e) => {
        const target = e.target;

        if (!(target.parentNode.classList.contains("filter-types"))) {
            return;
        }

        const filterInfoObj = new filterInfoWithCompleted(target, "today-tab-cont", "tasks-today-cont", "no-tasks-today-msg",
            "today", getTodayTasks, createTodayTabTasks, [filterByPriorityToday, filterByEarliestFirstToday, filterByLatestFirstToday],
            showCompletedTasksToday);

        const includeCompleted = target.parentNode.querySelector(".show-completed").classList.contains("active-filter");

        if (target.classList.contains("show-completed")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.fetchArgs = true;

            showCompletedTasksToday(filterInfoCopy);
        }

        else {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.fetchArgs = (includeCompleted);

            if (target.classList.contains("filter-priority")) {
                filterInfoCopy.filterFunc = priorityFirst;
                filterByPriorityToday(filterInfoCopy);
            }
            else if (target.classList.contains("filter-earliest-first")) {
                filterInfoCopy.filterFunc = earliestFirst;
                filterByEarliestFirstToday(filterInfoCopy);
            }
            else if (target.classList.contains("filter-latest-first")) {
                filterInfoCopy.filterFunc = latestFirst;
                filterByLatestFirstToday(filterInfoCopy);
            }
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
        todayTasks = getTodayTasks(false);
    }
    else {
        todayTasks = filter;
    }

    if (todayTasks.length === 0) {
        clearTab(tabCont, getTodayTasks, true, noMsg, "today");
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