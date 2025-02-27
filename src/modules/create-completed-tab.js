import { getCompletedTasks } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { priorityAndTimeFilterCont } from "./build-filter-cont.js";
import { taskContEventListeners, resetChooseOneFilterSelection, 
    refreshTabEvent, clearTab } from "./ui-task-utilities.js";
import { filterInitialCheck, deactivateChooseOneFilter } from "./filter-tasks-ui.js";
import { priorityFirst, earliestFirst } from "./filter-tasks.js";
import { generalTaskCont } from "./build-task-cont.js";

import refreshSvg from "../images/Refresh.svg";

function filterByPriorityCompleted(filterButton, directClick = false, filterInfoObj) {
    filterInitialCheck(filterInfoObj);

    // Disables the filter when the users directly press on it
    if (filterButton.classList.contains("active-filter") && directClick === true) {
        deactivateChooseOneFilter(filterInfoObj);
        return;
    }

    resetChooseOneFilterSelection(filterButton.parentNode);
    filterButton.classList.add("active-filter");
    const taskList = priorityFirst(getCompletedTasks());

    createCompletedTabTasks(document.querySelector(".completed-tab-cont"), taskList);
}

function filterByEarliestFirstCompleted(filterButton, directClick = false, filterInfoObj) {
    filterInitialCheck(filterInfoObj);

    // Disables the filter when the users directly press on it
    if (filterButton.classList.contains("active-filter") && directClick === true) {
        deactivateChooseOneFilter(filterInfoObj);
        return;
    }

    resetChooseOneFilterSelection(filterButton.parentNode);
    filterButton.classList.add("active-filter");
    const taskList = earliestFirst(getCompletedTasks());

    createCompletedTabTasks(document.querySelector(".completed-tab-cont"), taskList);
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
            tabTasksCreationFunc: createCompletedTabTasks,
            chooseOneFilterButtons: [target.parentNode.querySelector(".filter-priority"), target.parentNode.querySelector(".filter-time")],
            chooseOneFilterFuncs: [filterByPriorityCompleted, filterByEarliestFirstCompleted],
        }

        if (target.classList.contains("filter-options")) {
            return;
        }

        if (target.classList.contains("filter-priority")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.filterFunc = priorityFirst;

            filterByPriorityCompleted(target, true, filterInfoCopy);
        }
        else if (target.classList.contains("filter-time")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.filterFunc = priorityFirst;

            filterByEarliestFirstCompleted(target, true, filterInfoCopy);
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
    const tabHeaderCont = buildElement("div", "completed-tab-header-cont", "tab-header-cont");
    
        const tabHeader = buildElement("h1", "completed-tab-header", "tab-header");
        tabHeader.textContent = "Completed";
        
        const refreshIconCont = buildElement("div", "refresh-icon-cont");
        const refreshIcon = buildElement("img", "refresh-icon");
        refreshIcon.src = refreshSvg;
        refreshIcon.alt = "Refresh";
        refreshTabEvent(refreshIcon, ".completed-tasks-cont", createCompletedTabTasks, tabCont);
        refreshIconCont.appendChild(refreshIcon);
    
        tabHeaderCont.appendChild(tabHeader);
        tabHeaderCont.appendChild(refreshIconCont);
    
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