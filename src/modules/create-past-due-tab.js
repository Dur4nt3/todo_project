import { getPastDueTasks } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { priorityAndTimeFilterCont } from "./build-filter-cont.js";
import { generalTaskCont } from "./build-task-cont.js";
import { generalTabHeader } from "./build-tab-header.js";
import { taskContEventListeners, refreshTabEvent, clearTab } from "./ui-task-utilities.js";
import { filterInfoWithoutCompleted, filterInitialCheck, deactivateChooseOneFilter, activateChooseOneFilter } from "./filter-tasks-ui.js";
import { priorityFirst, earliestFirst, latestFirst } from "./filter-tasks.js";

// This module is used to create the "Past Due" tab

function filterByPriorityPastDue(filterInfoObj) {
    filterInitialCheck(filterInfoObj);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilter(filterInfoObj);
        return;
    }

    const taskList = priorityFirst(getPastDueTasks());
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function filterByEarliestFirstPastDue(filterInfoObj) {
    filterInitialCheck(filterInfoObj);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilter(filterInfoObj);
        return;
    }

    const taskList = earliestFirst(getPastDueTasks());
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function filterByLatestFirstPastDue(filterInfoObj) {
    filterInitialCheck(filterInfoObj);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilter(filterInfoObj);
        return;
    }

    const taskList = latestFirst(getPastDueTasks());
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}


function pastDueFilterEvent(filterCont) {
    filterCont.addEventListener("click", (e) => {
        const target = e.target;

        const filterInfoObj = new filterInfoWithoutCompleted(target, "past-due-tab-cont", "past-due-tasks-cont", "no-past-due-tasks-msg",
            "past-due", getPastDueTasks, createPastDueTabTasks);

        if (target.classList.contains("filter-options")) {
            return;
        }

        else {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;

            if (target.classList.contains("filter-priority")) {
                filterInfoCopy.filterFunc = priorityFirst;
                filterByPriorityPastDue(filterInfoCopy);
            }
            else if (target.classList.contains("filter-earliest-first")) {
                filterInfoCopy.filterFunc = earliestFirst;
                filterByEarliestFirstPastDue(filterInfoCopy);
            }
            else if (target.classList.contains("filter-latest-first")) {
                filterInfoCopy.filterFunc = latestFirst;
                filterByLatestFirstPastDue(filterInfoCopy);
            }
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
    const noMsg = document.querySelector(".no-past-due-tasks-msg");

    let pastDueTasks;
    if (!filter) {
        pastDueTasks = getPastDueTasks();
    }
    else {
        pastDueTasks = filter;
    }

    if (pastDueTasks.length === 0) {
        clearTab(tabCont, getPastDueTasks, null, noMsg, "past-due");
        return;
    }
    else {
        if (noMsg !== null) {
            noMsg.remove();
        }
        if (tabCont.querySelector(".filter-options") === null) {
            createPastDueFilterOptions(tabCont);
        }
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