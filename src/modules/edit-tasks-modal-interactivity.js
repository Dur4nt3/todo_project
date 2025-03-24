import { editTasksModal } from "./edit-tasks-modal.js";

export function editTasksModalInteractivity(taskObj) {
    const editTasksModalCont = editTasksModal(taskObj);

    document.body.prepend(editTasksModalCont);
    editTasksModalCont.focus();
}