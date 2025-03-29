import { generateGroupList } from "./create-groups-cont.js";
import generateAllTabs from "./generate-all-tabs.js";
import { hide } from "./dom-manipulator.js";
import { makeActive } from "./change-tabs.js";
import { convertLocalStorage } from "./convert-local-storage-data.js";
import { settingsValues } from "./settings-modal-interactivity.js";
import { helpModalInteractivity } from "./help-modal.js";

// This module is used to accumulate all of the functions that should execute on the initial load of the page

function hideNonDefaultTabs(defaultTabContClass) {
    const mainCont = document.querySelector(".main-cont");
    const tabContList = Array.from(mainCont.children);

    for (let index in tabContList) {
        let tabCont = tabContList[index];

        if (!tabCont.classList.contains(defaultTabContClass)) {
            if (!tabCont.classList.contains("hide")) {
                hide(tabCont);
            }
        }
    }
}

export default function initialLoad() {
    convertLocalStorage();

    generateGroupList();

    hideNonDefaultTabs(settingsValues["defaultTab"] + "-tab-cont");

    const selectedTab = document.querySelector("." + settingsValues["defaultTab"] + "-cont");
    if (selectedTab !== null) {
        makeActive(selectedTab);
    }

    generateAllTabs();

    if (settingsValues["showGuide"] === true) {
        helpModalInteractivity();
    }
}