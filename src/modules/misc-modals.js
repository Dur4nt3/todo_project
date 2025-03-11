import { editGroupsModal } from "./edit-groups-modal.js";

// This module includes the interactivity logic of various modals
// This module isn't centered around a specific category of modals

export function editGroupsModalInteractivity() {
    const editGroupsModalCont = editGroupsModal();

    document.body.prepend(editGroupsModalCont);
    editGroupsModalCont.focus();
}