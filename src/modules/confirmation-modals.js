import { determineTaskType } from "./task-utility-functions.js";
import * as removeTask from "./task-removal.js";
import { buildElement } from "./dom-manipulator.js";

// This module is used to create both the markup and the UI for the task deletion modals

function deletionConfirmationModal(taskTitle) {
    const modalCont = buildElement("div", "modal");
    modalCont.tabIndex = 0;

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

function deleteTaskUI(task, taskCont) {
    const taskType = determineTaskType(task)
    removeTask.removeFromTaskCollection(task.id, taskType);

    taskCont.classList.add("deleted-animation");
    setTimeout(() => { taskCont.remove() }, 600);
}

export function deletionConfirmationModalInteractivity(task, taskCont) {
    const deletionModal = deletionConfirmationModal(task.title);

    document.body.prepend(deletionModal);
    deletionModal.focus();

    deletionModal.addEventListener("click", (e) => {
        const target = e.target;

        if (!target.classList.contains("deletion-confirmation-button")) {
            if (target === deletionModal) {
                deletionModal.children[0].classList.add("close-modal-animation");
                setTimeout(() => { deletionModal.remove() }, 300);
            }
            return;
        }

        if (target.classList.contains("cancel-button")) {
            deletionModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { deletionModal.remove(); }, 300);
            return;
        }
        else if (target.classList.contains("confirm-button")) {
            deletionModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { deletionModal.remove(); }, 300);
            deleteTaskUI(task, taskCont);
            return;
        }
    });

    deletionModal.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            deletionModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { deletionModal.remove() }, 300);
        }
    });
}