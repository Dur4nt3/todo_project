import { editGroupsModal, fadeOutButtons, groupChangeLog, locateActiveInput, fadeOutInputs } from "./edit-groups-modal.js";
import { getGroupList, listedGroups, groupsColorLabels, taskGroups, reservedGroups } from "./task-utility-functions.js";

// This module includes the interactivity logic of various modals
// This module isn't centered around a specific category of modals

function createGroupChangeLog() {
    const groupList = getGroupList();

    let currentNames = [];
    let currentListings = [];
    let currentColors = [];

    for (let i in groupList) {
        currentNames.push(groupList[i]);

        if (listedGroups.indexOf(groupList[i]) === -1) {
            currentListings.push("");
        }
        else {
            currentListings.push(listedGroups.indexOf(groupList[i]) + 1);
        }

        currentColors.push(groupsColorLabels[groupList[i]]);
    }

    let newNames = currentNames.slice();
    let newListings = currentListings.slice();
    let newColors = currentColors.slice();

    return new groupChangeLog(currentNames, currentListings, currentColors, newNames, newListings, newColors);
}

function validateGroupName(newName) {
    if (Object.hasOwn(taskGroups, newName) || reservedGroups.includes(newName)) {
        return false;
    }

    return true;
}

export function editGroupsModalInteractivity() {
    const editGroupsModalCont = editGroupsModal();

    const colorLabelInputs = Array.from(editGroupsModalCont.querySelectorAll(".change-label-color-input"));

    document.body.prepend(editGroupsModalCont);
    editGroupsModalCont.focus();

    const editsChangeLog = createGroupChangeLog();
    

    editGroupsModalCont.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("modal")) {
            editGroupsModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { editGroupsModalCont.remove(); }, 300);
            return;
        }

        else if (target.classList.contains("cancel-button")) {
            editGroupsModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { editGroupsModalCont.remove(); }, 300);
            return;
        }

        if (target.classList.contains("modify-group-button")) {
            fadeOutButtons(target);
        }

        else if (target.classList.contains("submit-changes-icon")) {
            const targetInput = locateActiveInput(target);
            const changeLogIndex = editsChangeLog.currentNames.indexOf(target.parentNode.id);

            // Logic for submitting a new group name
            if (targetInput.classList.contains("change-group-name-input")) {
                // If the name isn't valid and isn't in fact just the current name display an error
                if ((!(validateGroupName(targetInput.value)) && !(targetInput.value === editsChangeLog.currentNames[changeLogIndex])) || targetInput.value.length > 30) {
                    if (!(targetInput.classList.contains("invalid-input"))) {
                        targetInput.classList.add("invalid-input");
                    }
                    targetInput.classList.add("invalid-animation");
                    setTimeout(() => {targetInput.classList.remove("invalid-animation");}, 450);
                    return;
                }
                // If the new group name is the same as the current one
                else if (targetInput.value === editsChangeLog.currentNames[changeLogIndex]) {
                    editsChangeLog.newNames[changeLogIndex] = targetInput.value;
                    let groupNameSpan = document.querySelector(".edit-groups-group-name"+"#"+target.parentNode.id).querySelector(".group-text");
                    groupNameSpan.textContent = targetInput.value;
                    groupNameSpan.classList.remove("new-valid");
                    targetInput.classList.remove("invalid-input");
                    fadeOutInputs(target);
                    return;
                }
                // Else the new group name is valid but different
                else {
                    editsChangeLog.newNames[changeLogIndex] = targetInput.value;
                    let groupNameSpan = document.querySelector(".edit-groups-group-name"+"#"+target.parentNode.id).querySelector(".group-text");
                    groupNameSpan.textContent = targetInput.value;
                    groupNameSpan.classList.add("new-valid");
                    targetInput.classList.remove("invalid-input");
                    fadeOutInputs(target);
                    return;
                }
            }

            // Logic for submitting a new listing order

            // Logic for submitting a new color
            
        }

        // Insert all edits submission logic (validating all inputs)
    });

    // Syncs the preview label with the selected color
    for (let i in colorLabelInputs) {
        let input = colorLabelInputs[i];
        input.addEventListener("input", () => {
            input.parentNode.querySelector(".change-label-color-label").style.color = input.value;
        });
    }

    editGroupsModalCont.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            editGroupsModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { editGroupsModalCont.remove() }, 300);
        }
    });
}