import { ta } from "date-fns/locale";
import { hide, show } from "./dom-manipulator.js";

// Apply CSS styling to indicate the active tab
function makeActive(tab) {
    const functionalitiesCont = tab.parentNode;
    const functionalitiesChildrenArray = Array.from(functionalitiesCont.children);

    // Remove the "active-tab" class from the currently active tab
    for (let index in functionalitiesChildrenArray) {
        let functionalityCont = functionalitiesChildrenArray[index];
        if (functionalityCont.classList.contains("active-tab")) {
            functionalityCont.classList.remove("active-tab");
        }
    }

    tab.classList.add("active-tab");
}

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

export function changeGroupTab(groupCont) {
    makeGroupTabActive(groupCont);
}