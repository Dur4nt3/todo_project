import { getAllTasks } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { completedPriorityAndTimeFilterCont } from "./build-filter-cont.js";
import { generalTaskCont } from "./build-task-cont.js";
import { generalTabHeader } from "./build-tab-header.js";
import { taskContEventListeners, refreshTabEvent, clearTab } from "./ui-task-utilities.js";
import { filterInitialCheck, deactivateCompletedFilter, deactivateChooseOneFilterWithCompleted,
    activateShowCompletedFilter, activateChooseOneFilter } from "./filter-tasks-ui.js";
import { priorityFirst, earliestFirst, latestFirst } from "./filter-tasks.js";

function showCompletedTasksAll(filterInfoObj) {
    filterInitialCheck(filterInfoObj);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateCompletedFilter(filterInfoObj);
        return;
    }

    activateShowCompletedFilter(filterInfoObj);
    return;
}

function filterByPriorityAll(filterInfoObj) {
    let filterInfoCopy = filterInfoObj;
    filterInfoCopy.fetchArgs = true;

    filterInitialCheck(filterInfoCopy);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterInfoObj);
        return;
    }
    
    const includeCompleted = filterInfoObj.filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");
    const taskList = priorityFirst(getAllTasks(includeCompleted));

    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function filterByEarliestFirstAll(filterInfoObj) {
    let filterInfoCopy = filterInfoObj;
    filterInfoCopy.fetchArgs = true;

    filterInitialCheck(filterInfoCopy);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterInfoObj);
        return;
    }
    
    const includeCompleted = filterInfoObj.filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");
    const taskList = earliestFirst(getAllTasks(includeCompleted));
    
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function filterByLatestFirstAll(filterInfoObj) {
    let filterInfoCopy = filterInfoObj;
    filterInfoCopy.fetchArgs = true;

    filterInitialCheck(filterInfoCopy);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterInfoObj);
        return;
    }
    
    const includeCompleted = filterInfoObj.filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");
    const taskList = latestFirst(getAllTasks(includeCompleted));
    
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function allFilterEvent(filterCont) {
    filterCont.addEventListener("click", (e) => {
        const target = e.target;

        if (!(target.parentNode.classList.contains("filter-types"))) {
            return;
        }

        const filterInfoObj = {
            directClick: false,
            filterButton: target,
            tabCont: document.querySelector(".all-tab-cont"),
            tasksCont: document.querySelector(".all-tasks-cont"),
            noMsgCont: document.querySelector(".no-tasks-msg"),
            noMsgType: "all",
            fetchTasksFunc: getAllTasks,
            fetchArgs: null,
            completedActive: target.parentNode.querySelector(".show-completed").classList.contains("active-filter"),
            tabTasksCreationFunc: createAllTabTasks,
            chooseOneFilterButtons: [target.parentNode.querySelector(".filter-priority"), target.parentNode.querySelector(".filter-earliest-first"),
                target.parentNode.querySelector(".filter-latest-first")
            ],
            chooseOneFilterFuncs: [filterByPriorityAll, filterByEarliestFirstAll, filterByLatestFirstAll],
            showCompletedFilterFunc: showCompletedTasksAll
        }

        const includeCompleted = target.parentNode.querySelector(".show-completed").classList.contains("active-filter");

        if (target.classList.contains("show-completed")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.fetchArgs = true;

            showCompletedTasksAll(filterInfoCopy);
        }
        else if (target.classList.contains("filter-priority")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.fetchArgs = (includeCompleted);
            filterInfoCopy.filterFunc = priorityFirst;

            filterByPriorityAll(filterInfoCopy);
        }
        else if (target.classList.contains("filter-earliest-first")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.fetchArgs = (includeCompleted);
            filterInfoCopy.filterFunc = earliestFirst;

            filterByEarliestFirstAll(filterInfoCopy);
        }
        else if (target.classList.contains("filter-latest-first")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.fetchArgs = (includeCompleted);
            filterInfoCopy.filterFunc = latestFirst;

            filterByLatestFirstAll(filterInfoCopy);
        }
    });
}

function createAllFilterOptions(tabCont) {
    if (getAllTasks(true).length === 0) {
        return;
    }

    const filterOptionsCont = completedPriorityAndTimeFilterCont();

    allFilterEvent(filterOptionsCont);

    tabCont.appendChild(filterOptionsCont);
}

function createAllTabHeader(tabCont) {
    const tabHeaderCont = generalTabHeader("all-tab", "All Tasks");

    refreshTabEvent(tabHeaderCont.querySelector(".refresh-icon"), ".all-tasks-cont", createAllTabTasks, tabCont);

    tabCont.appendChild(tabHeaderCont);
}

function createAllTabTasks(tabCont, filter = false) {
    const noMsg = document.querySelector(".no-tasks-msg");

    let allTasks;
    if (!filter) {
        allTasks = getAllTasks();
    }
    else {
        allTasks = filter;
    }

    if (allTasks.length === 0) {
        clearTab(tabCont, getAllTasks, true, noMsg, "all");
        return;
    }
    else {
        if (noMsg !== null) {
            noMsg.remove();
        }

        if (tabCont.querySelector(".filter-options") === null) {
            createAllFilterOptions(tabCont);
        }
    }

    const allTasksCont = buildElement("div", "all-tasks-cont");

    for (let taskIndex in allTasks) {
        let task = allTasks[taskIndex];

        let taskCont = generalTaskCont(task);
        taskContEventListeners(taskCont);

        allTasksCont.appendChild(taskCont);
    }

    tabCont.appendChild(allTasksCont);
}

export function createAllTab() {
    const allTabCont = document.querySelector(".all-tab-cont");

    createAllTabHeader(allTabCont);
    createAllFilterOptions(allTabCont);
    createAllTabTasks(allTabCont);
}