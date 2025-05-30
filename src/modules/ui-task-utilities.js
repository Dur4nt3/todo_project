import { findByID, determineTaskType, taskCollection } from "./task-utility-functions.js";
import { buildElement } from "./dom-manipulator.js";
import { deletionConfirmationModalInteractivity, deleteTaskUI } from "./confirmation-modals.js";
import { taskInformationModalInteractivity } from "./task-modals.js";
import { editTasksModalInteractivity } from "./edit-tasks-modal-interactivity.js";
import { settingsValues } from "./settings-modal-interactivity.js";
import { updateTasks } from "./update-local-storage.js";

// This module includes various UI-related task utilities
// It mainly manages general logic for tabs and the tasks within them

// Finds the tab container of a given element within the tab
function findTabCont(element) {
    let count = 0;
    let targetCont = element;
    let check = false;

    while (check === false && count < 50) {
        targetCont = targetCont.parentNode;
        for (let classIndex in Array.from(targetCont.classList)) {
            if (Array.from(targetCont.classList)[classIndex].includes("tab-cont")) {
                check = true;
            }
        }
        count++;
    }

    if (count == 50) {
        console.log("couldn't find container");
        return;
    }

    return targetCont;
}

// Find the filter options container within a given tab
export function getFilterOptionsCont(tab) {
    return tab.querySelector(".filter-options");
}

// Message to display when no tasks are scheduled
export function createNoScheduledTasksMsg(tabCont, msgType) {
    const msgCont = buildElement("div", "no-scheduled-tasks-msg");

    switch (msgType) {
        case "today":
            msgCont.classList.add("no-tasks-today-msg");
            msgCont.textContent = "No tasks scheduled for today";
            break;
        
        case "upcoming":
            msgCont.classList.add("no-upcoming-tasks-msg");
            msgCont.textContent = "No upcoming tasks";
            break;
        
        case "past-due":
            msgCont.classList.add("no-past-due-tasks-msg");
            msgCont.textContent = "No past due tasks";
            break;

        case "completed":
            msgCont.classList.add("no-completed-tasks-msg");
            msgCont.textContent = "No completed tasks";
            break;

        case "all":
            msgCont.classList.add("no-tasks-msg");
            msgCont.textContent = "No tasks";
            break;

        case "search":
            msgCont.classList.add("no-found-tasks-msg");
            msgCont.textContent = "No tasks found";
            break;

        case "group":
            msgCont.classList.add("no-group-tasks-msg");
            msgCont.textContent = "No tasks in this group";
            break;
        
        default:
            msgCont.classList.add("no-tasks-msg");
            msgCont.textContent = "No tasks";
            break;
    }


    tabCont.appendChild(msgCont);
}

// Open a modal with the task's information (editable fields)
function editTaskUI(task) {
    editTasksModalInteractivity(task);
}

// Completes the task & plays an animation
function completeTaskUI(task, taskCont) {
    const taskType = determineTaskType(task);

    if (task.completionStatus === true) {
        task.undoCompletion();
        updateTasks(taskType, taskCollection[taskType]);
        return;
    }
    
    let includeCompleted = false
    // For tabs with no filter container
    if (getFilterOptionsCont(findTabCont(taskCont)) === null) {
        includeCompleted = false;
    }
    // For tabs with a filter container
    else if ((getFilterOptionsCont(findTabCont(taskCont))).querySelector(".show-completed") !== null) {
        includeCompleted = (getFilterOptionsCont(findTabCont(taskCont))).querySelector(".show-completed").classList.contains("active-filter");
    }


    // Completing a task when the "Show Completed" filter is off
    if (task.completionStatus === false && !includeCompleted) {
        task.complete();
        updateTasks(taskType, taskCollection[taskType]);
        taskCont.classList.add("completed-animation");
        setTimeout(() => { taskCont.remove() }, 600);
        return;
    }

    // Completing a task when the "Show Completed" filter is on
    else if (task.completionStatus === false && includeCompleted) {
        task.complete();
        updateTasks(taskType, taskCollection[taskType]);
        return;
    }
}

const modalOpeningClasses = ["task-title", "task-cont", "dated-task-time-cont", "dated-task-full-date-cont",
    "dated-task-time-text", "dated-task-full-date-text", "clock-icon"]

export function taskContEventListeners(taskCont) {
    taskCont.addEventListener("click", (e) => {
        const target = e.target;
        const targetClassList = target.classList;
        const targetClassListArray = Array.from(target.classList);

        let openModal = false;
        for (let index in targetClassListArray) {
            if (modalOpeningClasses.includes(targetClassListArray[index])) {
                openModal = true;
                break;
            }
        }

        // Elements that when clicked should open the task's modal
        if (openModal) {

            if (targetClassList.contains("task-cont")) {
                taskInformationModalInteractivity(findByID(target.id));
                return;
            }
            else if (targetClassList.contains("task-title") || targetClassList.contains("dated-task-time-cont")
                || targetClassList.contains("dated-task-full-date-cont")) {
                taskInformationModalInteractivity(findByID(target.parentNode.parentNode.id));
                return;
            }
            else {
                taskInformationModalInteractivity(findByID(target.parentNode.parentNode.parentNode.id));
                return;
            }

        }

        else if (targetClassList.contains("task-options-icon")) {
            if (targetClassList.contains("edit-task")) {
                editTaskUI(findByID(target.parentNode.parentNode.id));
                return;
            }
            if (target.classList.contains("delete-task")) {
                const task = findByID(target.parentNode.parentNode.id);
                const taskCont = target.parentNode.parentNode;
                const taskType = determineTaskType(task);

                if (!(taskType === "repetitive" || taskType === "repetitiveGrouped") && settingsValues['deletionConfirmation'] === false) {
                    deleteTaskUI(task, taskCont);
                    return;
                }

                deletionConfirmationModalInteractivity(task, taskCont);
                return;
            }
        }

        else if (targetClassList.contains("complete-task")) {
            completeTaskUI(findByID(target.parentNode.id), target.parentNode);
            return;
        }
    })
}

export function resetChooseOneFilterSelection(filterCont) {
    const filtersArray = Array.from(filterCont.children);

    filtersArray.forEach((filter) => {
        if (filter.classList.contains("choose-one")) {
            filter.classList.remove("active-filter");
        }
    })
}

export function resetAllFilterChoices(filterCont) {
    if (filterCont === null) {
        return;
    }

    const filtersArray = Array.from(filterCont.querySelector(".filter-types").children);
    
    filtersArray.forEach((filter) => {
        filter.classList.remove("active-filter");
    })
}

// Refresh only the task container
export function refreshTabEvent(button, contToDeleteClass, generationFunction, tabCont, noMsgType = null, secondaryArgs) {
    button.addEventListener("click", () => {
        button.classList.add("rotate-refresh");
        setTimeout(() => { button.classList.remove("rotate-refresh"); }, 600);

        const contToDelete = document.querySelector(contToDeleteClass);
        if (contToDelete !== null) {
            contToDelete.remove();
        }

        resetAllFilterChoices(getFilterOptionsCont(findTabCont(button)));

        if (generationFunction === null) {
            createNoScheduledTasksMsg(tabCont, noMsgType);
            return;
        }

        if (secondaryArgs !== undefined) {
            generationFunction(tabCont, secondaryArgs);
            return;
        }

        generationFunction(tabCont);
    });
}

// Refresh the entire tab
export function hardRefreshTabEvent(button, tabToDeleteClass, tabGenerationFunction) {
    button.addEventListener("click", () => {
        button.classList.add("rotate-refresh");
        setTimeout(() => { button.classList.remove("rotate-refresh"); }, 600);

        const tabChildrenArray = Array.from(document.querySelector(tabToDeleteClass).children);
        for (let i in tabChildrenArray) {
            if (tabChildrenArray[i] !== null) {
                tabChildrenArray[i].remove();
            }
        }

        tabGenerationFunction();
    });
}

export function forceRefresh(contToDeleteClass, generationFunction, tabCont) {
    const contToDelete = document.querySelector(contToDeleteClass);
    if (contToDelete !== null) {
        contToDelete.remove();
    }

    resetAllFilterChoices(getFilterOptionsCont(findTabCont(button)));
    generationFunction(tabCont);
}

export function forceHardRefresh(tabToDeleteClass, tabGenerationFunction) {
    const tabChildrenArray = Array.from(document.querySelector("."+tabToDeleteClass).children);
    for (let i in tabChildrenArray) {
        if (tabChildrenArray[i] !== null) {
            tabChildrenArray[i].remove();
        }
    }

    tabGenerationFunction();
}

export function clearTab(tabCont, fetchTasksFunction, fetchArgs = null, noMsgCont, noMsgType) {
    const filterCont = getFilterOptionsCont(tabCont);
    let taskList;
    if (fetchArgs === null) {
        taskList = fetchTasksFunction();
    }
    else {
        if (Array.isArray(fetchArgs)) {
            taskList = fetchTasksFunction(...fetchArgs);
        }
        else {
            taskList = fetchTasksFunction(fetchArgs);
        }
    }


    if (filterCont !== null && taskList.length === 0) {
        filterCont.remove();
    }

    if (noMsgCont === null) {
        createNoScheduledTasksMsg(tabCont, noMsgType);
    }
    
    return;
}