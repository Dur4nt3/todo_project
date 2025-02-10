import { generateGroupList } from "./create-groups-cont.js";
import { createTodayTab } from "./create-today-tab.js";
import { hide } from "./dom-manipulator.js";

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
    createTodayTab();
}