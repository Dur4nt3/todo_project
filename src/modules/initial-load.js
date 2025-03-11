import { generateGroupList } from "./create-groups-cont.js";
import generateAllTabs from "./generate-all-tabs.js";
import { hide } from "./dom-manipulator.js";
import { makeActive } from "./change-tabs.js";

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
    generateGroupList();
    hideNonDefaultTabs("today-tab-cont");
    makeActive(document.querySelector(".today-cont"));
    generateAllTabs();
}