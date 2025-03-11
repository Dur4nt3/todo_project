import { buildElement } from "./dom-manipulator.js";
import { getGroupList, groupsColorLabels, listedGroups } from "./task-utility-functions.js";

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

function editGroupsGroupCont(groupName) {
    const groupCont = buildElement("div", "edit-groups-group-cont");

    const mainDetailsCont = buildElement("div", "edit-groups-group-main-details");
    mainDetailsCont.id = groupName;

    const nameCont = buildElement("p", "edit-groups-group-name");

    const labelSpan = buildElement("span", "group-label");
    labelSpan.textContent = "~";
    labelSpan.style.color = groupsColorLabels[groupName];

    const nameSpan = buildElement("span", "group-text");
    nameSpan.textContent = groupName;

    nameCont.appendChild(labelSpan);
    nameCont.appendChild(nameSpan);

    const groupOrder = buildElement("div", "edit-groups-group-order");
    groupOrder.appendChild(groupCurrentOrderInfoCont(groupName));

}

function editGroupsModal() {
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
        editGroupsList.appendChild()
    }

    overflowCont.appendChild(editGroupsList);
    
}

export function editGroupsModalInteractivity() {
    console.log("edit");
}