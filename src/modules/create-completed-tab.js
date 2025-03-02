import { getCompletedTasks } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { priorityAndTimeFilterCont } from "./build-filter-cont.js";
import { taskContEventListeners, refreshTabEvent, clearTab } from "./ui-task-utilities.js";
import { filterInitialCheck, deactivateChooseOneFilter, activateChooseOneFilter } from "./filter-tasks-ui.js";
import { priorityFirst, earliestFirst, latestFirst } from "./filter-tasks.js";
import { generalTaskCont } from "./build-task-cont.js";
import { generalTabHeader } from "./build-tab-header.js";

function filterByPriorityCompleted(filterInfoObj) {
    filterInitialCheck(filterInfoObj);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilter(filterInfoObj);
        return;
    }

    const taskList = priorityFirst(getCompletedTasks());
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function filterByEarliestFirstCompleted(filterInfoObj) {
    filterInitialCheck(filterInfoObj);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilter(filterInfoObj);
        return;
    }

    const taskList = earliestFirst(getCompletedTasks());
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function filterByLatestFirstCompleted(filterInfoObj) {
    filterInitialCheck(filterInfoObj);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilter(filterInfoObj);
        return;
    }

    const taskList = latestFirst(getCompletedTasks());
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function completedFilterEvent(filterCont) {
    filterCont.addEventListener("click", (e) => {
        const target = e.target;

        const filterInfoObj = {
            directClick: false,
            filterButton: target,
            tabCont: document.querySelector(".completed-tab-cont"),
            tasksCont: document.querySelector(".completed-tasks-cont"),
            noMsgCont: document.querySelector(".no-completed-tasks-msg"),
            noMsgType: "completed",
            fetchTasksFunc: getCompletedTasks,
            fetchArgs: null,
            tabTasksCreationFunc: createCompletedTabTasks
        }

        if (target.classList.contains("filter-options")) {
            return;
        }

        if (target.classList.contains("filter-priority")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.filterFunc = priorityFirst;

            filterByPriorityCompleted(filterInfoCopy);
        }
        else if (target.classList.contains("filter-earliest-first")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.filterFunc = earliestFirst;

            filterByEarliestFirstCompleted(filterInfoCopy);
        }
        else if (target.classList.contains("filter-latest-first")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.filterFunc = latestFirst;

            filterByLatestFirstCompleted(filterInfoCopy);
        }
    });
}

function createCompletedFilterOptions(tabCont) {
    if (getCompletedTasks().length === 0) {
            return;
    }
    
    const filterOptionsCont = priorityAndTimeFilterCont();
    
    completedFilterEvent(filterOptionsCont);

    tabCont.appendChild(filterOptionsCont);
}

function createCompletedTabHeader(tabCont) {
    const tabHeaderCont = generalTabHeader("completed-tab", "Completed");
    
    refreshTabEvent(tabHeaderCont.querySelector(".refresh-icon"), ".completed-tasks-cont", createCompletedTabTasks, tabCont);
    
    tabCont.appendChild(tabHeaderCont);
}

function createCompletedTabTasks(tabCont, filter = false) {
    const noMsg = document.querySelector(".no-completed-tasks-msg");

    let completedTasks;
    if (!filter) {
        completedTasks = getCompletedTasks();
    }
    else {
        completedTasks = filter;
    }

    if (completedTasks.length === 0) {
        clearTab(tabCont, getCompletedTasks, null, noMsg, "completed");
        return;
    }
    else {
        if (noMsg !== null) {
            noMsg.remove();
        }
        if (tabCont.querySelector(".filter-options") === null) {
            createCompletedFilterOptions(tabCont);
        }
    }
    
    const completedCont = buildElement("div", "completed-tasks-cont");

    for (let taskIndex in completedTasks) {
        let task = completedTasks[taskIndex];

        let taskCont = generalTaskCont(task);
        taskContEventListeners(taskCont);

        completedCont.appendChild(taskCont);
    }

    tabCont.appendChild(completedCont);
}

export function createCompletedTab() {
    const completedTabCont = document.querySelector(".completed-tab-cont");

    createCompletedTabHeader(completedTabCont);
    createCompletedFilterOptions(completedTabCont);
    createCompletedTabTasks(completedTabCont);
}