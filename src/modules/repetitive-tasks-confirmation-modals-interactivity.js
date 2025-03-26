import { informationChangeModal, repetitiveDeletionConfirmation, deadlineChangeModal } from "./repetitive-tasks-confirmation-modals.js";
import { removeClusterFromTaskCollection, removeFromTaskCollection } from "./task-removal.js";
import { determineTaskType } from "./task-utility-functions.js";
import { simulatePageRefresh } from "./simulate-page-refresh.js";

export function informationChangeModalInteractivity(parentModal, taskObj) {

}

export function repetitiveDeletionConfirmationInteractivity(parentModal, taskObj) {
    const deletionModal = repetitiveDeletionConfirmation(taskObj.title);

    parentModal.appendChild(deletionModal);
    parentModal.focus();

    parentModal.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("cancel-button")) {
            deletionModal.classList.add("close-modal-animation");
            setTimeout(() => { parentModal.remove(); }, 300);
            return;
        }

        if (target.classList.contains("this-task-button")) {
            removeFromTaskCollection(taskObj.id, determineTaskType(taskObj));
            simulatePageRefresh();
            deletionModal.classList.add("close-modal-animation");
            setTimeout(() => { parentModal.remove(); }, 300);
            return;
        }

        else if (target.classList.contains("all-tasks-button")) {
            removeClusterFromTaskCollection(taskObj.clusterID, determineTaskType(taskObj));
            simulatePageRefresh();
            deletionModal.classList.add("close-modal-animation");
            setTimeout(() => { parentModal.remove(); }, 300);
            return;
        }
    });
}

export function deadlineChangeModalInteractivity(parentModal, taskObj) {
    
}