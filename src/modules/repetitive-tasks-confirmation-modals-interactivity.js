import { informationChangeModal, repetitiveDeletionConfirmation, deadlineChangeModal } from "./repetitive-tasks-confirmation-modals.js";
import { removeClusterFromTaskCollection, removeFromTaskCollection } from "./task-removal.js";
import { determineTaskType, taskCollection } from "./task-utility-functions.js";
import { simulatePageRefresh } from "./simulate-page-refresh.js";
import { addTasksCreateTask } from "./add-tasks-task-creation.js";
import { getClusterTasks} from "./repetitive-task-utilities.js";
import { settingsValues } from "./settings-modal-interactivity.js";
import { updateDatedGroupedTasks, updateRepetitiveGroupedTasks, updateRepetitiveTasks } from "./update-local-storage.js";

function performLocalChanges(originalTask, taskObj, changes) {
    if (changes.includes("title")) {
        originalTask.title = taskObj.name;
    }
    if (changes.includes("description")) {
        originalTask.description = taskObj.description;
    }
    if (changes.includes("priority")) {
        originalTask.priority = taskObj.priority;
    }
    

    if (originalTask.group !== undefined && changes.includes("group")) {
        if (Array.isArray(taskObj.group) && taskObj.group[0] === "__unlisted__") {
            originalTask.removeListing();
        }
        else {
            originalTask.group = taskObj.group;
        }
    }
}

function performClusterChanges(originalTask, taskObj, changes) {
    const clusterTasks = getClusterTasks(originalTask);

    for (let i in clusterTasks) {
        performLocalChanges(clusterTasks[i], taskObj, changes);
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
            performLocalChanges(originalTask, taskObj, changes);

            if (originalTask.group === undefined) {
                updateRepetitiveTasks(taskCollection["repetitive"]);
            }
            else {
                updateRepetitiveGroupedTasks(taskCollection["repetitiveGrouped"]);
            }

            infoChangeModal.children[0].remove();
            parentModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { parentModal.remove(); infoChangeModal.remove(); simulatePageRefresh(); }, 300);
        }

        else if (target.classList.contains("all-tasks-button") && target.classList.contains("repetitive-changes-button")) {
            performClusterChanges(originalTask, taskObj, changes);

            if (originalTask.group === undefined) {
                updateRepetitiveTasks(taskCollection["repetitive"]);
            }
            else {
                updateRepetitiveGroupedTasks(taskCollection["repetitiveGrouped"]);
            }

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

            if (taskObj.group === undefined) {
                updateRepetitiveTasks(taskCollection["repetitive"]);
            }
            else {
                updateRepetitiveGroupedTasks(taskCollection["repetitiveGrouped"]);
            }

            simulatePageRefresh();
            deletionModal.classList.add("close-modal-animation");
            setTimeout(() => { parentModal.remove(); }, 300);
            return;
        }

        else if (target.classList.contains("all-tasks-button")) {
            removeClusterFromTaskCollection(taskObj.clusterID, determineTaskType(taskObj));

            if (taskObj.group === undefined) {
                updateRepetitiveTasks(taskCollection["repetitive"]);
            }
            else {
                updateRepetitiveGroupedTasks(taskCollection["repetitiveGrouped"]);
            }

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
    // No need to create the modal if the user requested not to show a confirmation prompt
    if (settingsValues['deadlineConfirmation'] === false) {
        if (taskObj.group === undefined) {
            removeFromTaskCollection(originalTaskID, "repetitive");
            updateRepetitiveTasks(taskCollection["repetitive"]);
            addTasksCreateTask(taskObj, "dated");
        }
        else {
            removeFromTaskCollection(originalTaskID, "repetitiveGrouped");
            updateRepetitiveGroupedTasks(taskCollection["repetitiveGrouped"]);
            addTasksCreateTask(taskObj, "datedGrouped");
        }

        parentModal.children[0].classList.add("close-modal-animation");
        setTimeout(() => { parentModal.remove(); simulatePageRefresh(); }, 300);
        return;
    }


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
                updateRepetitiveTasks(taskCollection["repetitive"]);
                addTasksCreateTask(taskObj, "dated");
            }
            else {
                removeFromTaskCollection(originalTaskID, "repetitiveGrouped");
                updateRepetitiveGroupedTasks(taskCollection["repetitiveGrouped"]);
                addTasksCreateTask(taskObj, "datedGrouped");
            }

            deadlineModal.children[0].remove();
            parentModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { parentModal.remove(); deadlineModal.remove(); simulatePageRefresh(); }, 300);
        }
    });
}