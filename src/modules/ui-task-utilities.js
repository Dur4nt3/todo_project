import { findByID, determineTaskType } from "./task-utility-functions.js";
import { buildElement } from "./dom-manipulator.js";
import { differenceInHours } from "../../node_modules/date-fns";
import { deletionConfirmationModalInteractivity } from "./confirmation-modals.js";
import { taskInformationModalInteractivity } from "./task-modals.js";

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
            msgCont.textContent = "No tasks scheduled for today";
            break;
        
        case "upcoming":
            msgCont.textContent = "No upcoming tasks";
            break;
        
        case "past-due":
            msgCont.textContent = "No past due tasks";
            break;

        case "completed":
            msgCont.textContent = "No completed tasks";
            break;

        case "all":
            msgCont.textContent = "No tasks";
            break;
        
        default:
            msgCont.textContent = "No tasks";
            break;
    }


    tabCont.appendChild(msgCont);
}

// Open a modal with the task's information (editable fields)
function editTaskUI(task) {
    console.log("edit", task);
}

// Completes the task & plays an animation
function completeTaskUI(task, taskCont) {
    if (task.completionStatus === true) {
        task.undoCompletion();
        return;
    }
    
    const includeCompleted = (getFilterOptionsCont(findTabCont(taskCont))).querySelector(".show-completed").classList.contains("active-filter");

    // Completing a task when the "Show Completed" filter is off
    if (task.completionStatus === false && !includeCompleted) {
        task.complete();
        taskCont.classList.add("completed-animation");
        setTimeout(() => { taskCont.remove() }, 600);
        return;
    }

    // Completing a task when the "Show Completed" filter is on
    else if (task.completionStatus === false && includeCompleted) {
        task.complete();
        return;
    }
}

export function taskContEventListeners(taskCont) {
    taskCont.addEventListener("click", (e) => {
        const target = e.target;
        const targetClassList = target.classList;

        // Elements that when clicked should open the task's modal
        if (targetClassList.contains("task-title") || targetClassList.contains("task-cont") || targetClassList.contains("dated-task-time-cont")
            || targetClassList.contains("dated-task-time-text") || targetClassList.contains("clock-icon")) {

            if (targetClassList.contains("task-cont")) {
                taskInformationModalInteractivity(findByID(target.id));
                return;
            }
            else if (targetClassList.contains("task-title") || targetClassList.contains("dated-task-time-cont")) {
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
                deletionConfirmationModalInteractivity(findByID(target.parentNode.parentNode.id), target.parentNode.parentNode);
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
    const filtersArray = Array.from(filterCont.children);

    filtersArray.forEach((filter) => {
        filter.classList.remove("active-filter");
    })
}

// Decides how to color the time of a task
export function checkDueStatus(deadline) {

    if (differenceInHours(deadline, new Date()) > 1) {
        return "due";
    }
    else if (differenceInHours(deadline, new Date()) <= 1 && differenceInHours(deadline, new Date()) > 0) {
        return "due-soon";
    }
    else if (differenceInHours(deadline, new Date()) <= 0) {
        return "past-due";
    }
}

export function refreshTabEvent(button, contToDeleteClass, generationFunction, tabCont) {
    button.addEventListener("click", () => {
        button.classList.add("rotate-refresh");
        setTimeout(() => { button.classList.remove("rotate-refresh"); }, 600);

        const contToDelete = document.querySelector(contToDeleteClass);
        if (contToDelete !== null) {
            contToDelete.remove();
        }

        resetAllFilterChoices(getFilterOptionsCont(findTabCont(button)))
        generationFunction(tabCont);
    });
}