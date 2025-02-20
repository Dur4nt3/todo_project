import { taskGroups, getGroupCount, generateGroupColorLabels } from "./task-utility-functions.js";
import * as domManipulator from "./dom-manipulator.js";

function populateGroupListCont() {
    const groupListCont = document.querySelector(".group-list-cont");
    const groupList = Object.keys(taskGroups);

    for (let index in groupList) {
        let groupName = groupList[index];

        // If there are more than 5 groups, after the fifth create the "More Groups" container
        // Said container can be clicked to open a modal with all the groups
        if (index >= 5) {
            let viewMore = domManipulator.buildElement("div", "view-more-groups");
            viewMore.textContent = "More Groups";

            groupListCont.appendChild(viewMore);
            break;
        }

        let groupCont = domManipulator.buildElement("div", "group-cont");
        groupCont.id = groupName;

        let groupSymbol = domManipulator.buildElement("span", "group-symbol");
        groupSymbol.textContent = "~";
        let groupLabelColor = generateGroupColorLabels(groupName);
        groupSymbol.style.color = groupLabelColor;

        let groupInfo = domManipulator.buildElement("p", "group-name");
        groupInfo.textContent = groupName;

        groupCont.appendChild(groupSymbol);
        groupCont.appendChild(groupInfo);

        groupListCont.appendChild(groupCont);
    }
}

function createNoGroupsMessage() {
    const noGroupsCont = domManipulator.buildElement("div", "no-groups-cont");

    const noGroupsMsg = domManipulator.buildElement("p", "no-groups-text");
    noGroupsMsg.textContent = "You currently have no groups";

    noGroupsCont.appendChild(noGroupsMsg);

    return noGroupsCont;
}

export function generateGroupList() {
    const groupListCont = document.querySelector(".group-list-cont");

    let listContents;

    if (getGroupCount() === 0) {
        listContents = createNoGroupsMessage();
    }
    else {
        populateGroupListCont();
        return;
    }

    groupListCont.appendChild(listContents);

}

