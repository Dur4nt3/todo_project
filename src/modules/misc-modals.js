import { editGroupsModal, fadeOutButtons, groupChangeLog, locateActiveInput, fadeOutInputs, SubstituteListingValues, idToGroupName } from "./edit-groups-modal.js";
import { getGroupList, listedGroups, groupsColorLabels, taskGroups, reservedGroups } from "./task-utility-functions.js";
import { isInputSingleDigitNumber } from "./number-input-validation.js";
import { whiteSpacesAndDashesOnly } from "./text-input-validation.js";
import { generateGroupList } from "./create-groups-cont.js";
import { processGroupChanges } from "./process-task-changes.js";

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
            // Saving the index not the numerical position
            currentListings.push(listedGroups.indexOf(groupList[i]));
        }

        currentColors.push(groupsColorLabels[groupList[i]]);
    }

    let newNames = currentNames.slice();
    let newListings = currentListings.slice();
    let newColors = currentColors.slice();

    return new groupChangeLog(currentNames, currentListings, currentColors, newNames, newListings, newColors);
}

function validateGroupName(newName, newNamesArray = []) {
    if (Object.hasOwn(taskGroups, newName) || reservedGroups.includes(newName) || !(whiteSpacesAndDashesOnly(newName))) {
        return false;
    }

    // For newly changed names => check if another group is already attempting to change into the selected name
    for (let i in newNamesArray) {
        if (newNamesArray[i] === newName) {
            return false;
        }
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

        // Clicking outside the modal to exit it is disable due to it being inconvenient for this modal
        if (target.classList.contains("cancel-button")) {
            editGroupsModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { editGroupsModalCont.remove(); }, 300);
            return;
        }

        if (target.classList.contains("modify-group-button")) {
            fadeOutButtons(target);
        }

        // Logic for when an input is submitted
        else if (target.classList.contains("submit-changes-icon")) {
            const groupID = target.parentNode.id;
            const targetInput = locateActiveInput(target);
            const changeLogIndex = editsChangeLog.currentNames.indexOf(idToGroupName(groupID));

            // Logic for submitting a new group name
            if (targetInput.classList.contains("change-group-name-input")) {

                // If the name isn't valid and isn't in fact just the current name display an error
                if ((!(validateGroupName(targetInput.value, editsChangeLog.newNames)) && 
                !(targetInput.value === editsChangeLog.currentNames[changeLogIndex])) || targetInput.value.length > 30) {
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
                    let groupNameSpan = document.querySelector(".edit-groups-group-name"+"#"+groupID).querySelector(".group-text");
                    groupNameSpan.textContent = targetInput.value;
                    groupNameSpan.classList.remove("new-valid");
                    targetInput.classList.remove("invalid-input");
                    fadeOutInputs(target);
                    return;
                }

                // Else the new group name is valid but different
                else {
                    editsChangeLog.newNames[changeLogIndex] = targetInput.value;
                    let groupNameSpan = document.querySelector(".edit-groups-group-name"+"#"+groupID).querySelector(".group-text");
                    groupNameSpan.textContent = targetInput.value;
                    groupNameSpan.classList.add("new-valid");
                    targetInput.classList.remove("invalid-input");
                    fadeOutInputs(target);
                    return;
                }
            }

            // Logic for submitting a new listing order
            else if (targetInput.classList.contains("change-list-order-input")) {
                const groupOrderCont = document.querySelector(".edit-groups-group-order"+"#"+groupID);
                const currentGroupOrder = groupOrderCont.querySelector(".current-group-order");
                // If its blank => unlisted
                if (targetInput.value === "") {
                    editsChangeLog.newListings[changeLogIndex] = "";
                    if (!(currentGroupOrder.textContent === "Currently Unlisted")) {
                        currentGroupOrder.lastChild.remove();
                        currentGroupOrder.textContent = "Currently Unlisted";
                        currentGroupOrder.classList.add("new-valid");
                    }

                    fadeOutInputs(target);
                    return;
                }

                // Handles invalid values
                else if (!isInputSingleDigitNumber(targetInput, 1, 5)) {
                    if (!(targetInput.classList.contains("invalid-input"))) {
                        targetInput.classList.add("invalid-input");
                    }
                    targetInput.classList.add("invalid-animation");
                    setTimeout(() => {targetInput.classList.remove("invalid-animation");}, 450);
                    return; 
                }

                // If its not blank or invalid => a listing position was chosen
                else {
                    const originalListingPosition = editsChangeLog.currentListings[changeLogIndex];
                    const currentListingPosition = editsChangeLog.newListings[changeLogIndex];

                    // No change was made to the listing position => simply fade out the inputs
                    if (Number(targetInput.value) === originalListingPosition + 1 && Number(targetInput.value) === currentListingPosition + 1) {
                        editsChangeLog.newListings[changeLogIndex] = originalListingPosition;
                        fadeOutInputs(target);
                        return;
                    }

                    const indexOfNewListing = editsChangeLog.newListings.indexOf(Number(targetInput.value) - 1);
                    // Substitute the listings if the other exists
                    if (!(indexOfNewListing === -1)) {
                        editsChangeLog.newListings[indexOfNewListing] = currentListingPosition;
                    }
                    editsChangeLog.newListings[changeLogIndex] = Number(targetInput.value) - 1;
                    SubstituteListingValues(groupOrderCont, currentListingPosition, 
                    document.querySelector(".edit-groups-group-order"+"#"+editsChangeLog.currentNames[indexOfNewListing]), (Number(targetInput.value) - 1));
                    fadeOutInputs(target);
                    return;
                }
            }

            // Logic for submitting a new label color
            else {
                const labelCont = document.querySelector(".edit-groups-group-name"+"#"+groupID);
                labelCont.querySelector(".group-label").style.color = targetInput.value;
                editsChangeLog.newColors[changeLogIndex] = targetInput.value;
                fadeOutInputs(target);
                return;
            }
            
        }

        else if (target.classList.contains("confirm-button")) {
            if (!processGroupChanges(editsChangeLog)) {
                // This is a fallback, as by the time a user submits the modal, there shouldn't be any errors 
                document.querySelector(".modal-catastrophic-error").classList.remove("hide");
                return;
            }
            else {
                // Recreate the group list container on the sidebar and exit the modal
                const sidebarGroupList = document.querySelector(".group-list-cont");
                while (sidebarGroupList.lastChild !== null) {
                    if (sidebarGroupList === null) {
                        break;
                    }
                    sidebarGroupList.lastChild.remove();
                }

                generateGroupList();

                editGroupsModalCont.children[0].classList.add("close-modal-animation");
                setTimeout(() => { editGroupsModalCont.remove() }, 300);
            }

        }
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