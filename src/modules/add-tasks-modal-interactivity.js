import { addTasksModal } from "./add-tasks-modal";

// This module includes the interactivity logic for the "add tasks" feature

export function addTasksModalInteractivity() {
    const addTasksModalCont = addTasksModal();

    document.body.prepend(addTasksModalCont);
    addTasksModalCont.focus();
}