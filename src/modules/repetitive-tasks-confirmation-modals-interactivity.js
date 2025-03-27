import { informationChangeModal, repetitiveDeletionConfirmation, deadlineChangeModal } from "./repetitive-tasks-confirmation-modals.js";
import { removeClusterFromTaskCollection, removeFromTaskCollection } from "./task-removal.js";
import { determineTaskType } from "./task-utility-functions.js";
import { simulatePageRefresh } from "./simulate-page-refresh.js";
import { addTasksCreateTask } from "./add-tasks-task-creation.js";
import { getClusterTasks} from "./repetitive-task-utilities.js";

function performLocalChanges(originalTask, taskObj) {
    originalTask.title = taskObj.name;
    originalTask.description = taskObj.description;
    originalTask.priority = taskObj.priority;

    if (originalTask.group !== undefined) {
        if (Array.isArray(taskObj.group) && taskObj.group[0] === "__unlisted__") {
            originalTask.removeListing();
            console.log(originalTask.group);
        }
        else {
            originalTask.group = taskObj.group;
        }
    }
}

function performClusterChanges(originalTask, taskObj) {
    const clusterTasks = getClusterTasks(originalTask);

    for (let i in clusterTasks) {
        performLocalChanges(clusterTasks[i], taskObj);
    }
}

export function informationChangeModalInteractivity(parentModal, taskObj, changes, originalTask) {
    const infoChangeModal = informationChangeModal(taskObj.name, changes);

    parentModal.appendChild(infoChangeModal);
    infoChangeModal.focus();

    infoChangeModal.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("cancel-button") && target.classList.contains("repetitive-changes-button")) {
            infoChangeModal.children[0].remove();
            parentModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { parentModal.remove(); infoChangeModal.remove(); simulatePageRefresh(); }, 300);
            return;
        }

        else if (target.classList.contains("this-task-button") && target.classList.contains("repetitive-changes-button")) {
            performLocalChanges(originalTask, taskObj);

            infoChangeModal.children[0].remove();
            parentModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { parentModal.remove(); infoChangeModal.remove(); simulatePageRefresh(); }, 300);
        }

        else if (target.classList.contains("all-tasks-button") && target.classList.contains("repetitive-changes-button")) {
            performClusterChanges(originalTask, taskObj);

            infoChangeModal.children[0].remove();
            parentModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { parentModal.remove(); infoChangeModal.remove(); simulatePageRefresh(); }, 300);
        }
    });
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

    deletionModal.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            deletionModal.classList.add("close-modal-animation");
            setTimeout(() => { parentModal.remove(); }, 300);
            return;
        }
    });
}

export function deadlineChangeModalInteractivity(parentModal, taskObj, originalTaskID) {
    const deadlineModal = deadlineChangeModal(taskObj);

    parentModal.appendChild(deadlineModal);
    deadlineModal.focus();

    deadlineModal.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("cancel-button") && target.classList.contains("repetitive-deadline-button")) {
            deadlineModal.remove();
            return;
        }

        else if (target.classList.contains("confirm-button") && target.classList.contains("repetitive-deadline-button")) {
            
            if (taskObj.group === undefined) {
                removeFromTaskCollection(originalTaskID, "repetitive");
                addTasksCreateTask(taskObj, "dated");
            }
            else {
                removeFromTaskCollection(originalTaskID, "repetitiveGrouped");
                addTasksCreateTask(taskObj, "datedGrouped");
            }

            deadlineModal.children[0].remove();
            parentModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { parentModal.remove(); deadlineModal.remove(); simulatePageRefresh(); }, 300);
        }
    });
}