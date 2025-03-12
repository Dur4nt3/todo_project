import { editGroupsModal, fadeOutButtons } from "./edit-groups-modal.js";

// This module includes the interactivity logic of various modals
// This module isn't centered around a specific category of modals

export function editGroupsModalInteractivity() {
    const editGroupsModalCont = editGroupsModal();

    document.body.prepend(editGroupsModalCont);
    editGroupsModalCont.focus();

    editGroupsModalCont.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("modify-group-button")) {
            fadeOutButtons(target);
        }
    });


    editGroupsModalCont.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            editGroupsModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { editGroupsModalCont.remove() }, 300);
        }
    });
}