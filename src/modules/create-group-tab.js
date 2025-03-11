import { getTaskByGroup } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { completedPriorityAndTimeFilterCont } from "./build-filter-cont.js";
import { generalTaskCont } from "./build-task-cont.js";
import { generalTabHeader } from "./build-tab-header.js";
import { taskContEventListeners, refreshTabEvent, clearTab } from "./ui-task-utilities.js";
import { filterInfoWithCompleted, filterInitialCheck, deactivateCompletedFilter, deactivateChooseOneFilterWithCompleted,
    activateShowCompletedFilter, activateChooseOneFilter } from "./filter-tasks-ui.js";
import { priorityFirst, earliestFirst, latestFirst } from "./filter-tasks.js";

// This module is used to create individual group tabs

function showCompletedTasksGroup(filterInfoObj) {
    filterInitialCheck(filterInfoObj);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateCompletedFilter(filterInfoObj);
        return;
    }

    activateShowCompletedFilter(filterInfoObj);
    return;
}

function filterByPriorityGroup(filterInfoObj) {
    let filterInfoCopy = filterInfoObj;
    filterInfoCopy.fetchArgs = true;

    filterInitialCheck(filterInfoCopy);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterInfoObj);
        return;
    }
    
    const includeCompleted = filterInfoObj.filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");
    const taskList = priorityFirst(getTaskByGroup(filterInfoObj.secondaryArgs, includeCompleted));

    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function filterByEarliestFirstGroup(filterInfoObj) {
    let filterInfoCopy = filterInfoObj;
    filterInfoCopy.fetchArgs = true;

    filterInitialCheck(filterInfoCopy);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterInfoObj);
        return;
    }
    
    const includeCompleted = filterInfoObj.filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");
    const taskList = earliestFirst(getTaskByGroup(filterInfoObj.secondaryArgs, includeCompleted));
    
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function filterByLatestFirstGroup(filterInfoObj) {
    let filterInfoCopy = filterInfoObj;
    filterInfoCopy.fetchArgs = true;

    filterInitialCheck(filterInfoCopy);

    // Disables the filter when the users directly press on it
    if (filterInfoObj.filterButton.classList.contains("active-filter") && filterInfoObj.directClick === true) {
        deactivateChooseOneFilterWithCompleted(filterInfoObj);
        return;
    }
    
    const includeCompleted = filterInfoObj.filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");
    const taskList = latestFirst(getTaskByGroup(filterInfoObj.secondaryArgs, includeCompleted));
    
    activateChooseOneFilter(filterInfoObj, taskList);
    return;
}

function groupFilterEvent(filterCont, groupName) {
    filterCont.addEventListener("click", (e) => {
        const target = e.target;

        if (!(target.parentNode.classList.contains("filter-types"))) {
            return;
        }

        const filterInfoObj = new filterInfoWithCompleted(target, "groups-tab-cont", "group-tasks-cont", "no-group-tasks-msg",
            "group", getTaskByGroup, createGroupTabTasks, [filterByPriorityGroup, filterByEarliestFirstGroup, filterByLatestFirstGroup],
            showCompletedTasksGroup);

        filterInfoObj.secondaryArgs = groupName;

        const includeCompleted = target.parentNode.querySelector(".show-completed").classList.contains("active-filter");

        if (target.classList.contains("show-completed")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.fetchArgs = true;

            showCompletedTasksGroup(filterInfoCopy);
        }

        else {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.directClick = true;
            filterInfoCopy.fetchArgs = (includeCompleted);

            if (target.classList.contains("filter-priority")) {
                filterInfoCopy.filterFunc = priorityFirst;
                filterByPriorityGroup(filterInfoCopy);
            }
            else if (target.classList.contains("filter-earliest-first")) {
                filterInfoCopy.filterFunc = earliestFirst;
                filterByEarliestFirstGroup(filterInfoCopy);
            }
            else if (target.classList.contains("filter-latest-first")) {
                filterInfoCopy.filterFunc = latestFirst;
                filterByLatestFirstGroup(filterInfoCopy);
            }
        }
    });
}

function createGroupFilterOptions(tabCont, groupName) {
    if (getTaskByGroup(groupName, true).length === 0) {
        return;
    }

    const filterOptionsCont = completedPriorityAndTimeFilterCont();

    groupFilterEvent(filterOptionsCont, groupName);

    tabCont.appendChild(filterOptionsCont);
}

function createGroupTabHeader(tabCont, groupName) {
    const tabHeaderCont = generalTabHeader("groups-tab", groupName);
    
    refreshTabEvent(tabHeaderCont.querySelector(".refresh-icon"), ".group-tasks-cont", createGroupTabTasks, tabCont, "group", groupName);
    
    tabCont.appendChild(tabHeaderCont);
}

function createGroupTabTasks(tabCont, groupName, filter = false) {
    const noMsg = document.querySelector(".no-group-tasks-msg");

    let groupTasks;
    if (!filter) {
        groupTasks = getTaskByGroup(groupName);
    }
    else {
        groupTasks = filter;
    }

    if (groupTasks.length === 0) {
        clearTab(tabCont, getTaskByGroup, [groupName, true], noMsg, "group");
        return;
    }
    else {
        if (noMsg !== null) {
            noMsg.remove();
        }

        if (tabCont.querySelector(".filter-options") === null) {
            createGroupFilterOptions(tabCont, groupName);
        }
    }

    const groupTasksCont = buildElement("div", "group-tasks-cont");

    for (let taskIndex in groupTasks) {
        let task = groupTasks[taskIndex];

        let taskCont = generalTaskCont(task);
        taskContEventListeners(taskCont);

        groupTasksCont.appendChild(taskCont);
    }

    tabCont.appendChild(groupTasksCont);
}

export function createGroupTab(group) {
    const groupTabCont = document.querySelector(".groups-tab-cont");

    createGroupTabHeader(groupTabCont, group);
    createGroupFilterOptions(groupTabCont, group);
    createGroupTabTasks(groupTabCont, group);
}