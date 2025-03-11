import { buildElement, hide, show } from "./dom-manipulator.js";
import { getGroupList, groupsColorLabels, listedGroups } from "./task-utility-functions.js";

import submitSvg from "../images/Submit.svg";

// This module is used to build the "Edit Groups" modal

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
    modifyGroup.id = groupName;

    const changeNameButton = buildElement("button", "modify-group-button", "change-group-name");
    changeNameButton.textContent = "Change Name";
    const changeNameInput = buildElement("input", "hide", "modify-group-input", "change-group-name-input");
    changeNameInput.maxLength = 30;
    changeNameInput.placeholder = "Enter a new group name";

    modifyGroup.appendChild(changeNameButton);
    modifyGroup.appendChild(changeNameInput);

    const changeOrderButton = buildElement("button", "modify-group-button", "change-list-order");
    changeOrderButton.textContent = "Change Order";
    const changeOrderInput = buildElement("input", "hide", "modify-group-input", "change-list-order-input");
    changeOrderInput.type = "number";
    changeOrderInput.min = 1;
    changeOrderInput.max = 5;
    changeOrderInput.placeholder = "Enter a new listing position";

    modifyGroup.appendChild(changeOrderButton);
    modifyGroup.appendChild(changeOrderInput);

    const changeColorButton = buildElement("button", "modify-group-button", "change-label-color");
    changeColorButton.textContent = "Change Color";

    const changeColorInputCont = buildElement("div", "hide", "change-label-color-input-cont");
    const labelSelectionInfo = buildElement("p", "label-selection-info");
    labelSelectionInfo.textContent = "Select a new label color: ";
    const colorInputLabel = buildElement("label", "change-label-color-label");
    colorInputLabel.for = "change-label-color-input";
    colorInputLabel.textContent = "~";
    const changeColorInput = buildElement("input", "change-label-color-input");
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

function modificationErrorCont(groupName) {
    const modificationErrors = buildElement("div", "edit-groups-error-cont");
    modificationErrors.id = groupName;

    const nameConflict = buildElement("span", "hide", "name-error-conflict");
    nameConflict.textContent = "The chosen name is the same as an already created group. Please choose a unique name";
    
    const nameLength = buildElement("span", "hide", "name-error-length");
    nameLength.textContent = "The chosen name exceeds the max length. Please choose a unique name between 1-30 characters";

    const orderConflict = buildElement("span", "hide", "order-error-conflict");
    orderConflict.textContent = "The chosen listing order is already taken. Please choose a different number.";

    
    const orderValue = buildElement("span", "hide", "order-error-value");
    orderValue.textContent = "The chosen listing order is invalid. Please choose a number between 1 and 5 or leave blank (unlisted).";

    modificationErrors.appendChild(nameConflict);
    modificationErrors.appendChild(nameLength);
    modificationErrors.appendChild(orderConflict);
    modificationErrors.appendChild(orderValue);

    return modificationErrors;
}

function editGroupsGroupCont(groupName) {
    const groupCont = buildElement("div", "edit-groups-group-cont");
    groupCont.id = groupName;

    const mainDetailsCont = buildElement("div", "edit-groups-group-main-details");
    mainDetailsCont.id = groupName;

    const nameCont = buildElement("p", "edit-groups-group-name");
    nameCont.id = groupName;

    const labelSpan = buildElement("span", "group-label");
    labelSpan.textContent = "~ ";
    labelSpan.style.color = groupsColorLabels[groupName];

    const nameSpan = buildElement("span", "group-text");
    nameSpan.textContent = groupName;

    nameCont.appendChild(labelSpan);
    nameCont.appendChild(nameSpan);

    const groupOrder = buildElement("div", "edit-groups-group-order");
    groupOrder.id = groupName;
    groupOrder.appendChild(groupCurrentOrderInfoCont(groupName));

    const modifyGroup = modifyGroupOptionsCont(groupName);

    mainDetailsCont.appendChild(nameCont);
    mainDetailsCont.appendChild(groupOrder);
    mainDetailsCont.appendChild(modifyGroup);

    const modificationErrors = modificationErrorCont(groupName);

    groupCont.appendChild(mainDetailsCont);
    groupCont.appendChild(modificationErrors);

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
    confirmButton.textContent = "Submit";

    buttonCont.appendChild(cancelButton);
    buttonCont.appendChild(confirmButton);

    editGroupsModalCont.appendChild(modalTitle);
    editGroupsModalCont.appendChild(overflowCont);
    editGroupsModalCont.appendChild(buttonCont);

    modalCont.appendChild(editGroupsModalCont);

    return modalCont;
}