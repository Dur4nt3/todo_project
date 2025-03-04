import { getUpcomingTasks } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { completedPriorityAndTimeFilterCont } from "./build-filter-cont.js";
import { generalTaskCont } from "./build-task-cont.js";
import { upcomingTabHeader } from "./build-tab-header.js";
import { taskContEventListeners, refreshTabEvent, clearTab } from "./ui-task-utilities.js";
import { filterInfoWithCompleted, filterInitialCheck, deactivateCompletedFilter, deactivateChooseOneFilterWithCompleted,
    activateShowCompletedFilter, activateChooseOneFilter } from "./filter-tasks-ui.js";
import { priorityFirst, earliestFirst, latestFirst } from "./filter-tasks.js";

function showCompletedTasksUpcoming(filterInfoObj) {
    filterInitialCheck(filterInfoObj);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateCompletedFilter(filterInfoObj);
        return;
    }

    activateShowCompletedFilter(filterInfoObj);
    return;
}

function filterByPriorityUpcoming(filterInfoObj) {
    let filterInfoCopy = filterInfoObj;
    filterInfoCopy.fetchArgs = true;

    filterInitialCheck(filterInfoCopy);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterInfoObj);
        return;
    }
    
    const includeCompleted = filterInfoObj.filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");
    const taskList = priorityFirst(getUpcomingTasks(includeCompleted));

    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function filterByEarliestFirstUpcoming(filterInfoObj) {
    let filterInfoCopy = filterInfoObj;
    filterInfoCopy.fetchArgs = true;

    filterInitialCheck(filterInfoCopy);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterInfoObj);
        return;
    }
    
    const includeCompleted = filterInfoObj.filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");
    const taskList = earliestFirst(getUpcomingTasks(includeCompleted));
    
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function filterByLatestFirstUpcoming(filterInfoObj) {
    let filterInfoCopy = filterInfoObj;
    filterInfoCopy.fetchArgs = true;

    filterInitialCheck(filterInfoCopy);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterInfoObj);
        return;
    }
    
    const includeCompleted = filterInfoObj.filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");
    const taskList = latestFirst(getUpcomingTasks(includeCompleted));
    
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function upcomingFilterEvent(filterCont) {
    filterCont.addEventListener("click", (e) => {
        const target = e.target;

        if (!(target.parentNode.classList.contains("filter-types"))) {
            return;
        }
        
        const filterInfoObj = new filterInfoWithCompleted(target, "upcoming-tab-cont", "upcoming-tasks-cont", "no-upcoming-tasks-msg",
            "upcoming", getUpcomingTasks, createUpcomingTabTasks, [filterByPriorityUpcoming, filterByEarliestFirstUpcoming, filterByLatestFirstUpcoming],
            showCompletedTasksUpcoming);

        const includeCompleted = target.parentNode.querySelector(".show-completed").classList.contains("active-filter");

        if (target.classList.contains("show-completed")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.fetchArgs = true;

            showCompletedTasksUpcoming(filterInfoCopy);
        }

        else {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.fetchArgs = (includeCompleted);

            if (target.classList.contains("filter-priority")) {
                filterInfoCopy.filterFunc = priorityFirst;
                filterByPriorityUpcoming(filterInfoCopy);
            }
            else if (target.classList.contains("filter-earliest-first")) {
                filterInfoCopy.filterFunc = earliestFirst;
                filterByEarliestFirstUpcoming(filterInfoCopy);
            }
            else if (target.classList.contains("filter-latest-first")) {
                filterInfoCopy.filterFunc = latestFirst;
                filterByLatestFirstUpcoming(filterInfoCopy);
            }
        }
    });
}

function createUpcomingFilterOptions(tabCont) {
    if (getUpcomingTasks(true).length === 0) {
        return;
    }

    const filterOptionsCont = completedPriorityAndTimeFilterCont();

    upcomingFilterEvent(filterOptionsCont);

    tabCont.appendChild(filterOptionsCont);
}

function createUpcomingTabHeader(tabCont) {
    const tabHeaderCont = upcomingTabHeader("upcoming-tab-cont", createUpcomingTab);

    refreshTabEvent(tabHeaderCont.querySelector(".refresh-icon"), ".upcoming-tasks-cont", createUpcomingTabTasks, tabCont);

    tabCont.appendChild(tabHeaderCont);
}

function createUpcomingTabTasks(tabCont, filter = false) {
const noMsg = document.querySelector(".no-upcoming-tasks-msg");

    let upcomingTasks;
    if (!filter) {
        upcomingTasks = getUpcomingTasks();
    }
    else {
        upcomingTasks = filter;
    }

    if (upcomingTasks.length === 0) {
        clearTab(tabCont, getUpcomingTasks, true, noMsg, "upcoming");
        return;
    }
    else {
        if (noMsg !== null) {
            noMsg.remove();
        }

        if (tabCont.querySelector(".filter-options") === null) {
            createUpcomingFilterOptions(tabCont);
        }
    }

    const upcomingTasksCont = buildElement("div", "upcoming-tasks-cont");

    for (let taskIndex in upcomingTasks) {
        let task = upcomingTasks[taskIndex];

        let taskCont = generalTaskCont(task);
        taskContEventListeners(taskCont);

        upcomingTasksCont.appendChild(taskCont);
    }

    tabCont.appendChild(upcomingTasksCont);
}

export function createUpcomingTab() {
    const upcomingTabCont = document.querySelector(".upcoming-tab-cont");

    createUpcomingTabHeader(upcomingTabCont);
    createUpcomingFilterOptions(upcomingTabCont);
    createUpcomingTabTasks(upcomingTabCont);
}