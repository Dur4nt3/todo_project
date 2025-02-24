import { buildElement } from "./dom-manipulator.js";

export function deletionConfirmationModal(taskTitle) {
    const modalCont = buildElement("div", "modal");

    const deletionModalCont = buildElement("div", "deletion-confirmation", "modal-cont");

    const modalConfirmationTitle =  buildElement("h3", "deletion-confirmation-text");
    modalConfirmationTitle.textContent = "Are you sure you want to delete this task";

    const modalTaskTitle =  buildElement("h4", "deleted-task-title");
    modalTaskTitle.textContent = '"' + taskTitle + '"';

    const modalConfirmationInfo =  buildElement("p", "deletion-confirmation-info");
    modalConfirmationInfo.textContent = "You will not be able to recover this task!";

    const buttonCont = buildElement("div", "deletion-confirmation-button-cont");

    const cancelButton = buildElement("button", "deletion-confirmation-button", "cancel-button");
    cancelButton.textContent = "Cancel";

    const deleteButton = buildElement("button", "deletion-confirmation-button", "confirm-button");
    deleteButton.textContent = "Delete";


    buttonCont.appendChild(cancelButton);
    buttonCont.appendChild(deleteButton);

    deletionModalCont.appendChild(modalConfirmationTitle);
    deletionModalCont.appendChild(modalTaskTitle);
    deletionModalCont.appendChild(modalConfirmationInfo);
    deletionModalCont.appendChild(buttonCont);

    modalCont.appendChild(deletionModalCont);

    return modalCont;
}