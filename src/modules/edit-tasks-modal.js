import { addTasksModal } from "./add-tasks-modal.js";
import { buildElement } from "./dom-manipulator.js";
import { modifyAddModalClasses } from "./edit-tasks-modify-classes.js";
import { determineTaskType } from "./task-utility-functions.js";
import { formatTaskType } from "./misc-utilities.js";

function populateInputFields(modalCont, taskObj) {
    
}

function alterAddModal(modalCont, taskObj) {
    modifyAddModalClasses(modalCont);

    modalCont.querySelector(".modal-title").textContent = "Modify Task:";

    const taskTypeSelectCont = modalCont.querySelector(".task-type-input").parentNode;
    const taskTypeRow = taskTypeSelectCont.parentNode;
    taskTypeSelectCont.remove();
    taskTypeRow.lastChild.removeAttribute("for");
    
    const taskTypePlaceholder = buildElement("p", "task-type-placeholder");
    taskTypePlaceholder.textContent = formatTaskType(determineTaskType(taskObj));

    taskTypeRow.appendChild(taskTypePlaceholder);
}

export function editTasksModal(taskObj) {
    const editTaskModal = addTasksModal();

    alterAddModal(editTaskModal, taskObj);
    populateInputFields(editTaskModal, taskObj);

    return editTaskModal;
}