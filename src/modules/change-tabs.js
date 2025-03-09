import { hide, show } from "./dom-manipulator.js";
import { createGroupTab } from "./create-group-tab.js";

// This module is used to change between tabs available in the sidebar

function hideAllTabs() {
    const tabArray = Array.from(document.querySelector(".main-cont").children);

    for (let i in tabArray) {
        if (!(tabArray[i].classList.contains("groups-tab-cont"))) {
            hide(tabArray[i]);
        }
    }
}

function deactivateMainLabels() {
    const sidebarFunctionalitiesLabels = Array.from(document.querySelector(".sidebar-functionalities-cont").children);

    for (let i in sidebarFunctionalitiesLabels) {
        let functionalityCont = sidebarFunctionalitiesLabels[i];
        if (functionalityCont.classList.contains("active-tab")) {
            functionalityCont.classList.remove("active-tab");
        }
    }
}

function deactivateGroupLabels() {
    const groupListCont = Array.from(document.querySelector(".group-list-cont").children);

    for (let i in groupListCont) {
        let groupLabel = groupListCont[i];
        if (groupLabel.classList.contains("active-group-tab")) {
            groupLabel.classList.remove("active-group-tab");
        }
    }
}

// Apply CSS styling to indicate the active tab
export function makeActive(tab) {
    deactivateMainLabels();
    tab.classList.add("active-tab");
}

// Locates the tab matching to the clicked label
function locateTabCont(tab) {
    const tabClassList = Array.from(tab.classList);
    let targetID;

    for (let index in tabClassList) {
        let currentID = tabClassList[index];
        // Target tab cont includes the id xxxx-task-functionality (where "xxxx" signifies the specific functionality)
        if (currentID.includes("tasks-functionality")) {
            // Add # to be able to use the variable in "querySelector"
            targetID = "#" + currentID;
        }
    }

    const mainCont = document.querySelector(".main-cont");

    const targetTab = mainCont.querySelector(targetID);

    return targetTab;
}

// Makes all main tabs apart from the selected tab hidden
function showTabCont(tab) {

    const tabToActivate = locateTabCont(tab);
    const tabList = Array.from(tabToActivate.parentNode.children);

    // Hide all other tabs
    for (let index in tabList) {
        let currentTab = tabList[index];

        if (currentTab !== tabToActivate) {
            if (!currentTab.classList.contains("hide")) {
                hide(currentTab);
            }
        }
    }

    show(tabToActivate);
}

export function changeTab(tab) {
    if (tab.classList.contains("active-tab")) {
        return;
    }

    deactivateGroupLabels();
    makeActive(tab);
    showTabCont(tab);
}

function makeGroupTabActive(groupCont) {
    const groupListCont = groupCont.parentNode;
    const groupListChildrenArray = Array.from(groupListCont.children);

    for (let index in groupListChildrenArray) {
        let groupCont = groupListChildrenArray[index];
        if (groupCont.classList.contains("active-group-tab")) {
            groupCont.classList.remove("active-group-tab");
        }
    }

    groupCont.classList.add("active-group-tab");
}

function showGroupTab() {
    hideAllTabs();
    show(document.querySelector(".groups-tab-cont"));
}

function clearPreviousContent() {
    const previousContent = Array.from(document.querySelector(".groups-tab-cont").children);

    for (let i in previousContent) {
        if (previousContent[i] !== null) {
            previousContent[i].remove();
        }
    }
}

export function changeGroupTab(groupCont, modal = false) {
    if (modal === false && groupCont.classList.contains("active-group-tab")) {
        return;
    }

    deactivateMainLabels();
    clearPreviousContent();
    showGroupTab();

    if (modal === true) {
        deactivateGroupLabels();
        createGroupTab(groupCont);
    }

    else if (!modal) {
        makeGroupTabActive(groupCont);
        createGroupTab(groupCont.id);
    }

}