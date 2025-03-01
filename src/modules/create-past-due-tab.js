import { getPastDueTasks } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { priorityAndTimeFilterCont } from "./build-filter-cont.js";
import { generalTaskCont } from "./build-task-cont.js";
import { generalTabHeader } from "./build-tab-header.js";
import { taskContEventListeners, resetChooseOneFilterSelection, 
    refreshTabEvent, clearTab } from "./ui-task-utilities.js";
import { filterInitialCheck, deactivateChooseOneFilter } from "./filter-tasks-ui.js";
import { priorityFirst, earliestFirst } from "./filter-tasks.js";

function filterByPriorityPastDue(filterButton, directClick = false) {
    filterInitialCheck(filterButton, document.querySelector(".past-due-tab-cont"), document.querySelector(".past-due-tasks-cont"),
    document.querySelector(".no-past-due-tasks-msg"), "past-due", getPastDueTasks, null);

    // Disables the filter when the users directly press on it
    if (filterButton.classList.contains("active-filter") && directClick === true) {
        deactivateChooseOneFilter(filterButton, createPastDueTabTasks, document.querySelector(".past-due-tab-cont"));
        return;
    }

    resetChooseOneFilterSelection(filterButton.parentNode);
    filterButton.classList.add("active-filter");
    const taskList = priorityFirst(getPastDueTasks());

    createPastDueTabTasks(document.querySelector(".past-due-tab-cont"), taskList);
}

function filterByEarliestFirstPastDue(filterButton, directClick = false) {
    filterInitialCheck(filterButton, document.querySelector(".past-due-tab-cont"), document.querySelector(".past-due-tasks-cont"),
    document.querySelector(".no-past-due-tasks-msg"), "past-due", getPastDueTasks, null);

    // Disables the filter when the users directly press on it
    if (filterButton.classList.contains("active-filter") && directClick === true) {
        deactivateChooseOneFilter(filterButton, createPastDueTabTasks, document.querySelector(".past-due-tab-cont"));
        return;
    }

    resetChooseOneFilterSelection(filterButton.parentNode);
    filterButton.classList.add("active-filter");
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
            filterByEarliestFirstPastDue(target, true);
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