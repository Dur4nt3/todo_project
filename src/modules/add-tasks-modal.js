import { buildElement } from "./dom-manipulator.js";
import { addTasksForm } from "./add-tasks-modal-form.js";

// This module creates the markup for the "add tasks" feature

export function addTasksModal() {
    const modalCont = buildElement("div", "modal");
    modalCont.tabIndex = 0;

    const addTasksModalCont = buildElement("div", "modal-cont", "add-tasks-modal");

    const modalTitle = buildElement("h2", "modal-title");
    modalTitle.textContent = "Create a New Task:";

    const modalForm = addTasksForm();

    const buttonCont = buildElement("div", "add-tasks-button-cont");

    const cancelButton = buildElement("button", "add-tasks-button", "cancel-button");
    const confirmButton = buildElement("button", "add-tasks-button", "confirm-button");

    cancelButton.textContent = "Cancel";
    confirmButton.textContent = "Create";

    buttonCont.appendChild(cancelButton);
    buttonCont.appendChild(confirmButton);

    addTasksModalCont.appendChild(modalTitle);
    addTasksModalCont.appendChild(modalForm);
    addTasksModalCont.appendChild(buttonCont);

    modalCont.appendChild(addTasksModalCont);

    return modalCont;
}