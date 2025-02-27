import { getCompletedTasks, getPastDueTasks } from "./fetch-tasks.js";
import { getTaskTime, getTaskDateTextFormat } from "./misc-utilities.js";
import { buildElement } from "./dom-manipulator.js";
import { priorityAndTimeFilterCont } from "./build-filter-cont.js";
import { taskContEventListeners, resetChooseOneFilterSelection, getFilterOptionsCont, createNoScheduledTasksMsg, refreshTabEvent } from "./ui-task-utilities.js";
import { priorityFirst, earliestFirst } from "./filter-tasks.js";

import editSvg from "../images/Edit.svg";
import deleteSvg from "../images/Delete.svg";
import refreshSvg from "../images/Refresh.svg";

function filterByPriorityCompleted(filterButton, directClick = false) {
    const completedTaskCont = document.querySelector(".completed-tasks-cont");
    const noMsg = document.querySelector(".no-completed-tasks-msg");

    // Check if there are no tasks
    if (completedTaskCont === null) {
        // If there are truly no tasks scheduled remove the filter container and display the "no tasks ..." message
        if (getCompletedTasks().length === 0 ) {
            filterButton.parentNode.remove();
            createNoScheduledTasksMsg(document.querySelector(".completed-tab-cont"), "completed");
            return;
        }

        // If there are tasks scheduled remove the "no tasks ..." message
        else if (noMsg !== null) {
            noMsg.remove();
        }
    }

    // Preemptively remove the container and prepare to generate a new one
    if (!(completedTaskCont === null)) {
        completedTaskCont.remove();
    }

    // Disables the filter when the users directly press on it
    if (filterButton.classList.contains("active-filter") && directClick === true) {
        filterButton.classList.remove("active-filter");
        createCompletedTabTasks(document.querySelector(".completed-tab-cont"));
        return;
    }

    resetChooseOneFilterSelection(filterButton.parentNode);
    filterButton.classList.add("active-filter");
    // Using ! because the function takes the argument "filterOn" which is false if we're showing completed tasks 
    const taskList = priorityFirst(getCompletedTasks());

    createCompletedTabTasks(document.querySelector(".completed-tab-cont"), taskList);
}

function filterByTimeCompleted(filterButton, directClick = false) {
    const completedTaskCont = document.querySelector(".completed-tasks-cont");
    const noMsg = document.querySelector(".no-completed-tasks-msg");

    // Check if there are no tasks
    if (completedTaskCont === null) {
        // If there are truly no tasks scheduled remove the filter container and display the "no tasks ..." message
        if (getCompletedTasks().length === 0 ) {
            filterButton.parentNode.remove();
            createNoScheduledTasksMsg(document.querySelector(".completed-tab-cont"), "completed");
            return;
        }

        // If there are tasks scheduled remove the "no tasks ..." message
        else if (noMsg !== null) {
            noMsg.remove();
        }
    }

    // Preemptively remove the container and prepare to generate a new one
    if (!(completedTaskCont === null)) {
        completedTaskCont.remove();
    }

    // Disables the filter when the users directly press on it
    if (filterButton.classList.contains("active-filter") && directClick === true) {
        filterButton.classList.remove("active-filter");
        createCompletedTabTasks(document.querySelector(".completed-tab-cont"));
        return;
    }

    resetChooseOneFilterSelection(filterButton.parentNode);
    filterButton.classList.add("active-filter");
    // Using ! because the function takes the argument "filterOn" which is false if we're showing completed tasks 
    const taskList = earliestFirst(getCompletedTasks());

    createCompletedTabTasks(document.querySelector(".completed-tab-cont"), taskList);
}

function completedFilterEvent(filterCont) {
    filterCont.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("filter-options")) {
            return;
        }

        if (target.classList.contains("filter-priority")) {
            filterByPriorityCompleted(target, true);
        }
        else {
            filterByTimeCompleted(target, true);
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
    let completedTasks;
        if (!filter) {
            completedTasks = getCompletedTasks();
        }
        else {
            completedTasks = filter;
        }
    
        if (completedTasks.length === 0) {
            const filterCont = getFilterOptionsCont(tabCont);
            if (filterCont !== null) {
                filterCont.remove();
            }
    
            if (document.querySelector(".no-completed-tasks-msg") === null) {
                createNoScheduledTasksMsg(tabCont, "completed");
            }
            return;
        }
    
        const completedCont = buildElement("div", "completed-tasks-cont");
    
        for (let taskIndex in completedTasks) {
            let task = completedTasks[taskIndex];
    
            let priorityClass = "priority-one";
    
            if (task.priority === 2) {
                priorityClass = "priority-two";
            }
            else if (task.priority === 3) {
                priorityClass = "priority-three";
            }
    
            let taskCont = buildElement("div", "task-cont", priorityClass);
            taskCont.id = task.id;
    
            let checkbox = buildElement("input", "complete-task");
            checkbox.type = "checkbox";
            checkbox.checked = true;
    
            let taskInfo = buildElement("div", "task-info");
    
            let taskTitle = buildElement("div", "task-title");
            taskTitle.textContent = task.title;
    
            taskInfo.appendChild(taskTitle);
    
            if (!(task.deadline === undefined)) {
                let taskDateCont = buildElement("div", "dated-task-full-date-cont");
        
                let taskDateText = buildElement("p", "dated-task-full-date-text");
                taskDateText.textContent = getTaskDateTextFormat(task.deadline);
        
                taskDateCont.appendChild(taskDateText);
        
                if(!task.allDay) {
                    let taskTime = buildElement("p", "dated-task-full-date-text");
                    taskTime.textContent = "at " + getTaskTime(task);
        
                    taskDateCont.appendChild(taskTime);
                }
        
                taskInfo.appendChild(taskDateCont);
            }

            let taskOptions = buildElement("div", "task-options");
    
            let editIcon = buildElement("img", "task-options-icon", "edit-task");
            let deleteIcon = buildElement("img", "task-options-icon", "delete-task");
    
            editIcon.src = editSvg;
            editIcon.alt = "Edit Task";
    
            deleteIcon.src = deleteSvg;
            deleteIcon.alt = "Delete Task";
    
            taskOptions.appendChild(editIcon);
            taskOptions.appendChild(deleteIcon);
    
            taskCont.appendChild(checkbox);
            taskCont.appendChild(taskInfo);
            taskCont.appendChild(taskOptions);
    
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