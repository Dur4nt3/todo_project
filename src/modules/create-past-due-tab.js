import { getPastDueTasks } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { priorityAndTimeFilterCont } from "./build-filter-cont.js";
import { generalTaskCont } from "./build-task-cont.js";
import { generalTabHeader } from "./build-tab-header.js";
import { taskContEventListeners, refreshTabEvent, clearTab } from "./ui-task-utilities.js";
import { filterInitialCheck, deactivateChooseOneFilter, activateChooseOneFilter } from "./filter-tasks-ui.js";
import { priorityFirst, earliestFirst, latestFirst } from "./filter-tasks.js";

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

        const filterInfoObj = {
            directClick: false,
            filterButton: target,
            tabCont: document.querySelector(".past-due-tab-cont"),
            tasksCont: document.querySelector(".past-due-tasks-cont"),
            noMsgCont: document.querySelector(".no-past-due-tasks-msg"),
            noMsgType: "past-due",
            fetchTasksFunc: getPastDueTasks,
            fetchArgs: null,
            tabTasksCreationFunc: createPastDueTabTasks
        }

        if (target.classList.contains("filter-options")) {
            return;
        }

        if (target.classList.contains("filter-priority")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.filterFunc = priorityFirst;

            filterByPriorityPastDue(filterInfoCopy);
        }
        else if (target.classList.contains("filter-earliest-first")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.filterFunc = earliestFirst;

            filterByEarliestFirstPastDue(filterInfoCopy);
        }
        else if (target.classList.contains("filter-latest-first")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.filterFunc = latestFirst;

            filterByLatestFirstPastDue(filterInfoCopy);
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