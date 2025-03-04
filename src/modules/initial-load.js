import { generateGroupList } from "./create-groups-cont.js";
import generateAllTabs from "./generate-all-tabs.js";
import { hide } from "./dom-manipulator.js";
import { makeActive } from "./change-tabs.js";

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
    hideNonDefaultTabs("search-tab-cont");
    makeActive(document.querySelector(".search-cont"));
    generateAllTabs();
}