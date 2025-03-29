import { buildElement, hide, show } from "./dom-manipulator.js";
import { getGroupList, groupsColorLabels, listedGroups, taskGroups } from "./task-utility-functions.js";
import { hexToString, stringToHex } from "./misc-utilities.js";

import submitSvg from "../images/Submit.svg";

// This module is used to build the "Edit Groups" modal

export class groupChangeLog {
    constructor(currentNames, currentListings, currentColors, newNames, newListings, newColors) {
        this.currentNames = currentNames;
        this.currentListings = currentListings;
        this.currentColors = currentColors;

        this.newNames = newNames;
        this.newListings = newListings;
        this.newColors = newColors;
    }
}

export function groupNameToID(groupName) {
    return stringToHex(groupName);
}

export function idToGroupName(id) {
    return hexToString(id);
}

function groupCurrentOrderInfoCont(groupName) {
    // Group isn't listed if the conditional is true
    if (listedGroups.indexOf(groupName) === -1) {
        const currentOrder = buildElement("p", "current-group-order");
        currentOrder.textContent = "Currently Unlisted";
        return currentOrder;
    }
    else {
        const currentOrder = buildElement("p", "current-group-order");
        const orderText = document.createTextNode("List Order: ");
        const orderNumberSpan = buildElement("span", "current-group-order-number");
        orderNumberSpan.textContent = listedGroups.indexOf(groupName) + 1;
        currentOrder.appendChild(orderText);
        currentOrder.appendChild(orderNumberSpan);

        return currentOrder;
    }
}

function modifyGroupOptionsCont(groupName) {
    const modifyGroup = buildElement("div", "modify-group-options");
    modifyGroup.id = groupNameToID(groupName);

    const changeNameButton = buildElement("button", "modify-group-button", "change-group-name");
    changeNameButton.textContent = "Change Name";
    const changeNameInput = buildElement("input", "hide", "modify-group-input", "change-group-name-input");
    changeNameInput.maxLength = 30;
    changeNameInput.placeholder = "Enter a new group name";
    changeNameInput.value = groupName;

    modifyGroup.appendChild(changeNameButton);
    modifyGroup.appendChild(changeNameInput);

    const changeOrderButton = buildElement("button", "modify-group-button", "change-list-order");
    changeOrderButton.textContent = "Change Order";
    const changeOrderInput = buildElement("input", "hide", "modify-group-input", "change-list-order-input");
    changeOrderInput.type = "number";
    changeOrderInput.min = 1;
    changeOrderInput.max = 5;
    changeOrderInput.placeholder = "Enter a new listing position";

    if (listedGroups.indexOf(groupName) !== -1) {
        changeOrderInput.value = listedGroups.indexOf(groupName) + 1;
    }

    modifyGroup.appendChild(changeOrderButton);
    modifyGroup.appendChild(changeOrderInput);

    const changeColorButton = buildElement("button", "modify-group-button", "change-label-color");
    changeColorButton.textContent = "Change Color";

    const changeColorInputCont = buildElement("div", "hide", "change-label-color-input-cont");
    const labelSelectionInfo = buildElement("p", "label-selection-info");
    labelSelectionInfo.textContent = "Select a new label color: ";
    const colorInputLabel = buildElement("label", "change-label-color-label");
    colorInputLabel.htmlFor = "change-label-color-input";
    colorInputLabel.textContent = "~";
    colorInputLabel.style.color = groupsColorLabels[groupName];
    const changeColorInput = buildElement("input", "change-label-color-input");
    changeColorInput.value = groupsColorLabels[groupName];
    changeColorInput.type = "color";
    changeColorInput.id = "change-label-color-input";

    changeColorInputCont.appendChild(labelSelectionInfo);
    changeColorInputCont.appendChild(colorInputLabel);
    changeColorInputCont.appendChild(changeColorInput);

    modifyGroup.appendChild(changeColorButton);
    modifyGroup.appendChild(changeColorInputCont);

    const submitIcon = buildElement("img", "hide", "submit-changes-icon");
    submitIcon.src = submitSvg;
    submitIcon.alt = "Submit Changes";

    modifyGroup.appendChild(submitIcon);

    return modifyGroup;
}

function editGroupsGroupCont(groupName) {
    const groupCont = buildElement("div", "edit-groups-group-cont");
    groupCont.id = groupNameToID(groupName);

    const mainDetailsCont = buildElement("div", "edit-groups-group-main-details");
    mainDetailsCont.id = groupNameToID(groupName);

    const nameCont = buildElement("p", "edit-groups-group-name");
    nameCont.id = groupNameToID(groupName);

    const labelSpan = buildElement("span", "group-label");
    labelSpan.textContent = "~ ";
    labelSpan.style.color = groupsColorLabels[groupName];

    const nameSpan = buildElement("span", "group-text");
    nameSpan.textContent = groupName;

    nameCont.appendChild(labelSpan);
    nameCont.appendChild(nameSpan);

    const groupOrder = buildElement("div", "edit-groups-group-order");
    groupOrder.id = groupNameToID(groupName);
    groupOrder.appendChild(groupCurrentOrderInfoCont(groupName));

    const modifyGroup = modifyGroupOptionsCont(groupName);

    mainDetailsCont.appendChild(nameCont);
    mainDetailsCont.appendChild(groupOrder);
    mainDetailsCont.appendChild(modifyGroup);

    groupCont.appendChild(mainDetailsCont);

    return groupCont;
}

export function editGroupsModal() {
    const modalCont = buildElement("div", "modal");
    modalCont.tabIndex = 0;

    const editGroupsModalCont = buildElement("div", "modal-cont", "edit-groups-modal");

    const modalTitle = buildElement("h2", "edit-groups-title");
    modalTitle.textContent = "Modify Groups:"

    const overflowCont = buildElement("div", "group-list-overflow-cont");

    const editGroupsList = buildElement("div", "edit-groups-group-list");

    const groupList = getGroupList();

    for (let i in groupList) {
        let groupCont = editGroupsGroupCont(groupList[i]);
        editGroupsList.appendChild(groupCont)
    }

    overflowCont.appendChild(editGroupsList);
    
    const buttonCont = buildElement("div", "edit-groups-button-cont");

    const cancelButton = buildElement("button", "edit-groups-button", "cancel-button");
    const confirmButton = buildElement("button", "edit-groups-button", "confirm-button");
    cancelButton.textContent = "Cancel";
    confirmButton.textContent = "Confirm";

    buttonCont.appendChild(cancelButton);
    buttonCont.appendChild(confirmButton);

    const modalError = buildElement("div", "modal-catastrophic-error", "hide");
    modalError.textContent = "There has been a catastrophic error. Some of your changes weren't saved. Please reload the page and try again.";

    editGroupsModalCont.appendChild(modalTitle);
    editGroupsModalCont.appendChild(overflowCont);
    editGroupsModalCont.appendChild(modalError);
    editGroupsModalCont.appendChild(buttonCont);

    modalCont.appendChild(editGroupsModalCont);

    return modalCont;
}

function matchButtonToInput(button) {
    if (button.classList.contains("change-group-name")) {
        return button.parentNode.querySelector(".change-group-name-input");
    }
    else if (button.classList.contains("change-list-order")) {
        return button.parentNode.querySelector(".change-list-order-input");
    }
    else if (button.classList.contains("change-label-color")) {
        return button.parentNode.querySelector(".change-label-color-input-cont");
    }
}

export function fadeOutButtons(targetButton) {
    const modifyOptions = targetButton.parentNode;

    const buttonsArray = Array.from(modifyOptions.querySelectorAll(".modify-group-button"));
    const submitIcon = modifyOptions.querySelector(".submit-changes-icon");

    const inputToShow = matchButtonToInput(targetButton);

    for (let i in buttonsArray) {
        buttonsArray[i].classList.remove("fade-in");
        buttonsArray[i].classList.add("fade-out");
    }

    setTimeout(() => {
        for (let i in buttonsArray) {
            hide(buttonsArray[i]);
        }

        show(inputToShow);
        show(submitIcon)
        inputToShow.classList.remove("fade-out");
        inputToShow.classList.add("fade-in");
        submitIcon.classList.remove("fade-out");
        submitIcon.classList.add("fade-in");
    }, 350);

    return;
}

export function fadeOutInputs(submitButton) {
    const modifyOptions = submitButton.parentNode;

    const buttonsArray = Array.from(modifyOptions.querySelectorAll(".modify-group-button"));
    let inputToHide = locateActiveInput(submitButton);

    // Target the correct elements when handling the color input
    if (inputToHide.id === "change-label-color-input") {
        inputToHide = inputToHide.parentNode;
    }

    submitButton.classList.remove("fade-in");
    inputToHide.classList.remove("fade-in");
    submitButton.classList.add("fade-out");
    inputToHide.classList.add("fade-out");

    setTimeout(() => {
        hide(inputToHide);
        hide(submitButton)

        for (let i in buttonsArray) {
            show(buttonsArray[i]);
            buttonsArray[i].classList.remove("fade-out");
            buttonsArray[i].classList.add("fade-in");
        }
    }, 350);

    return;
}

// Returns the input element that the user tried to submit
export function locateActiveInput(submitButton) {
    const modifyOptionsChildren = Array.from(submitButton.parentNode.children);

    for (let i in modifyOptionsChildren) {
        if (modifyOptionsChildren[i].classList.contains("change-label-color-input-cont") && !(modifyOptionsChildren[i].classList.contains("hide"))) {
            return modifyOptionsChildren[i].querySelector(".change-label-color-input");
        }

        if (modifyOptionsChildren[i].tagName.toLowerCase() === "input") {
            if (!(modifyOptionsChildren[i].classList.contains("hide"))) {
                return modifyOptionsChildren[i];
            }
        }
    }
}

export function SubstituteListingValues(originCont, originalListing, targetCont, targetListing) {
    // The origin is unlisted
    if (originalListing === "") {
        // If the target container was previously listed targetCont will be null
        if (targetCont !== null) {
            const targetGroupOrder = targetCont.querySelector(".current-group-order");
            targetGroupOrder.lastChild.remove();
            targetGroupOrder.textContent = "Currently Unlisted";
            targetGroupOrder.classList.add("new-valid");
        }
        

        const originGroupOrder = originCont.querySelector(".current-group-order");
        originGroupOrder.textContent = "List Order: ";
        originGroupOrder.classList.add("new-valid");
        const spanGroupOrder = buildElement("span", "current-group-order-number");
        spanGroupOrder.textContent = targetListing + 1;
        originGroupOrder.appendChild(spanGroupOrder);

        return;
    }

    // The origin is listed
    else {
        // If the target container was previously listed targetCont will be null
        if (targetCont !== null) {
            const targetGroupOrder = targetCont.querySelector(".current-group-order");
            targetGroupOrder.querySelector(".current-group-order-number").textContent = originalListing + 1;
            targetGroupOrder.classList.add("new-valid");
        }

        const originGroupOrder = originCont.querySelector(".current-group-order");
        originGroupOrder.querySelector(".current-group-order-number").textContent = targetListing + 1;
        originGroupOrder.classList.add("new-valid");

        return;
    }
}