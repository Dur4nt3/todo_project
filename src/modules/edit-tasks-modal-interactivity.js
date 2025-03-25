import { editTasksModal } from "./edit-tasks-modal.js";

export function editTasksModalInteractivity(taskObj) {
    const editTasksModalCont = editTasksModal(taskObj);

    document.body.prepend(editTasksModalCont);
    editTasksModalCont.focus();

    editTasksModalCont.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("cancel-button")) {
            editTasksModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { editTasksModalCont.remove() }, 300);
            return;
        }
    });

    editTasksModalCont.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            editTasksModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { editTasksModalCont.remove() }, 300);
        }
    });
}