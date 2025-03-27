import { getGroupCount, generateGroupColorLabels, listedGroups, appendToListed, getGroupList } from "./task-utility-functions.js";
import * as domManipulator from "./dom-manipulator.js";
import { stringToHex } from "./misc-utilities.js";

// This module is used to build the group listing container in the sidebar

function createGroupCont(groupName) {
    let groupCont = domManipulator.buildElement("div", "group-cont");
    groupCont.id = stringToHex(groupName);

    let groupSymbol = domManipulator.buildElement("span", "group-symbol");
    groupSymbol.textContent = "~";
    let groupLabelColor = generateGroupColorLabels(groupName);
    groupSymbol.style.color = groupLabelColor;

    let groupInfo = domManipulator.buildElement("p", "group-name");
    groupInfo.textContent = groupName;

    groupCont.appendChild(groupSymbol);
    groupCont.appendChild(groupInfo);

    return groupCont;
}

function populateGroupListCont() {
    const groupListCont = document.querySelector(".group-list-cont");
    const groupList = getGroupList();

    let alreadyListed = [];
    let insertionCount = 0;

    let viewMoreBuilt = false;

    for (let index in groupList) {
        
        for (let i in listedGroups) {
            if (listedGroups[i] !== undefined) {
                if (alreadyListed.includes(listedGroups[i])) {
                    continue;
                }
                
                let groupCont = createGroupCont(listedGroups[i]);
                groupListCont.appendChild(groupCont);
                alreadyListed.push(listedGroups[i]);
                insertionCount++;
                continue;
            }
        }
        
        let groupName = groupList[index];

        if (alreadyListed.includes(groupName)) {
            continue;
        }

        // If there are more than 5 groups, after the fifth create the "More Groups" container
        // Said container can be clicked to open a modal with all the groups
        if (index >= 5 || insertionCount >= 5) {

            generateGroupColorLabels(groupName);

            if (viewMoreBuilt === false) {
                let viewMore = domManipulator.buildElement("div", "view-more-groups");
                viewMore.textContent = "More Groups";
                groupListCont.appendChild(viewMore);
                viewMoreBuilt = true;
            }

            continue;;
        }

        let groupCont = createGroupCont(groupName);

        groupListCont.appendChild(groupCont);

        appendToListed(groupName, index);

        alreadyListed.push(groupName);
        insertionCount++;
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

export function refreshGroupList() {
    const sidebarGroupList = document.querySelector(".group-list-cont");

    while (sidebarGroupList.lastChild !== null) {
        if (sidebarGroupList === null) {
            break;
        }
        sidebarGroupList.lastChild.remove();
    }

    generateGroupList();
}