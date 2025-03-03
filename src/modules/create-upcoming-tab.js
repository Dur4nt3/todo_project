import { getUpcomingTasks } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { completedPriorityAndTimeFilterCont } from "./build-filter-cont.js";
import { generalTaskCont } from "./build-task-cont.js";
import { upcomingTabHeader } from "./build-tab-header.js";
import { taskContEventListeners, refreshTabEvent, clearTab } from "./ui-task-utilities.js";
import { filterInitialCheck, deactivateCompletedFilter, deactivateChooseOneFilterWithCompleted,
    activateShowCompletedFilter, activateChooseOneFilter } from "./filter-tasks-ui.js";
import { priorityFirst, earliestFirst, latestFirst } from "./filter-tasks.js";

function createUpcomingTabHeader(tabCont) {
    const tabHeaderCont = upcomingTabHeader("upcoming-tab-cont", createUpcomingTab);

    refreshTabEvent(tabHeaderCont.querySelector(".refresh-icon"), ".upcoming-tasks-cont", createUpcomingTabTasks, tabCont);

    tabCont.appendChild(tabHeaderCont);
}

function createUpcomingTabTasks(tabCont, filter = false) {
    console.log("creating tasks");
}

export function createUpcomingTab() {
    const upcomingTabCont = document.querySelector(".upcoming-tab-cont");

    // let array = getUpcomingTasks();
    // for (let i in array) {
    //     console.log(array[i].title, array[i].deadline)
    // }

    createUpcomingTabHeader(upcomingTabCont);
    // createUpcomingFilterOptions(upcomingTabCont);
    createUpcomingTabTasks(upcomingTabCont);
}