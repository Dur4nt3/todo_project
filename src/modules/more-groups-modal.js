import { getGroupList, generateGroupColorLabels } from "./task-utility-functions.js";
import { buildElement } from "./dom-manipulator.js";
import { changeGroupTab } from "./change-tabs.js";
import { hexToString, stringToHex } from "./misc-utilities.js";

import closeSvg from "../images/Close.svg";

// This module both builds and includes the interactivity logic for the "More Groups" modal

function buildMoreGroupsGroupCont(groupName) {
    const groupCont = buildElement("div", "more-groups-group-cont");
    groupCont.id = stringToHex(groupName);

    const labelColor = generateGroupColorLabels(groupName);

    const groupNameParagraph = buildElement("p", "more-groups-group-name");

    const groupLabel = buildElement("span", "group-label");
    groupLabel.textContent = "~ ";
    groupLabel.style.color = labelColor;

    const groupNameContent = buildElement("span", "group-name-text");
    groupNameContent.textContent = groupName;

    groupNameParagraph.appendChild(groupLabel);
    groupNameParagraph.appendChild(groupNameContent);

    groupCont.appendChild(groupNameParagraph);

    return groupCont;
}

function moreGroupsModal() {
    const modalCont = buildElement("div", "modal");
    modalCont.tabIndex = 0;
    
    const moreGroupsModalCont = buildElement("div", "modal-cont", "more-groups-modal");

    const closeIcon = buildElement("img", "close-modal-icon");
    closeIcon.src = closeSvg;
    closeIcon.alt = "Close Modal";

    const modalTitle = buildElement("h2", "more-groups-title");
    modalTitle.textContent = "Select a Group to View:";

    const groupsGrid = buildElement("div", "groups-grid");

    const groupList = getGroupList();

    for (let i in groupList) {
        groupsGrid.appendChild(buildMoreGroupsGroupCont(groupList[i]));
    }

    moreGroupsModalCont.appendChild(closeIcon);
    moreGroupsModalCont.appendChild(modalTitle);
    moreGroupsModalCont.appendChild(groupsGrid);

    modalCont.appendChild(moreGroupsModalCont);

    return modalCont;
}

export function moreGroupsModalInteractivity() {
    const moreGroupsModalCont = moreGroupsModal();

    document.body.prepend(moreGroupsModalCont);
    moreGroupsModalCont.focus();

    moreGroupsModalCont.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("modal") || target.classList.contains("close-modal-icon")) {
            moreGroupsModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { moreGroupsModalCont.remove() }, 300);
            return;
        }

        else if (target.classList.contains("more-groups-group-cont")) {
            changeGroupTab(hexToString(target.id), true);
            moreGroupsModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { moreGroupsModalCont.remove() }, 300);
            return;
        }
        else if (target.classList.contains("more-groups-group-name")) {
            changeGroupTab(hexToString(target.parentNode.id), true);
            moreGroupsModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { moreGroupsModalCont.remove() }, 300);
            return;
        }
        else if (target.classList.contains("group-label") || target.classList.contains("group-name-text")) {
            changeGroupTab(hexToString(target.parentNode.parentNode.id), true);
            moreGroupsModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { moreGroupsModalCont.remove() }, 300);
            return;
        }

    });

    moreGroupsModalCont.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            moreGroupsModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => {  moreGroupsModalCont.remove() }, 300);
        }
    });
}