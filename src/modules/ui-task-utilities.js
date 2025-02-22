import { taskCollection } from "./task-utility-functions.js";

function openTaskModal(task) {
    
}

function completeTaskUI(task) {

}

function editTaskUI(task) {

}

function deleteTaskUI(task) {
    
}

export function taskContEventListeners(taskCont) {
    taskCont.addEventListener("click", (e) => {
        console.log(e.target);
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