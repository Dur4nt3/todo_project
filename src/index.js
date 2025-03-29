import "./styles.css";
import "./stylesheets/reset.css";

import * as changeTabs from "./modules/change-tabs.js";
import initialLoad from "./modules/initial-load.js";
import { refreshGroupList } from "./modules/create-groups-cont.js";
import { moreGroupsModalInteractivity } from "./modules/more-groups-modal.js";
import { editGroupsModalInteractivity } from "./modules/misc-modals.js";
import { helpModalInteractivity } from "./modules/help-modal.js";
import { addTasksModalInteractivity } from "./modules/add-tasks-modal-interactivity.js";
import { settingsModalInteractivity } from "./modules/settings-modal-interactivity.js";

document.addEventListener("DOMContentLoaded", () => {
    initialLoad();
});

const sidebarFunctionalities = document.querySelector(".sidebar-functionalities-cont");
const groupListCont = document.querySelector(".sidebar-groups-cont");
const settingsCont = document.querySelector(".sidebar-settings-cont");


// Event listener for sidebar
sidebarFunctionalities.addEventListener("click", (e) => {
    const target = e.target;

    // Exit if not clicking on icon/label
    if (target.parentNode === sidebarFunctionalities || target === sidebarFunctionalities) {
        return;
    }


    // Different function for adding tasks as opposed to changing tabs
    if (!target.parentNode.classList.contains("add-cont")) {
        changeTabs.changeTab(target.parentNode);
    }
    else {
        addTasksModalInteractivity()
    }
});


// Event listener for group container
groupListCont.addEventListener("click", (e) => {
    // Exit if not clicking icon/label/more groups
    let target = e.target;

    if (target.classList.contains("edit-groups-icon")) {
        editGroupsModalInteractivity();
        return;
    }

    else if (target.classList.contains("refresh-groups-icon")) {
        refreshGroupList();
        return;
    }
    
    else if (target.classList[0] === "group-symbol" || target.classList[0] === "group-name" ) {
        changeTabs.changeGroupTab(target.parentNode);
        return;
    }
    else if (target.classList.contains("view-more-groups")) {
        moreGroupsModalInteractivity();
        return;
    }
});

// Event listener for settings and help
settingsCont.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("settings-icon") || target.classList.contains("settings-label")) {
        settingsModalInteractivity();
    }
    if (target.classList.contains("help-icon") || target.classList.contains("help-label")) {
        helpModalInteractivity();
    }
})
