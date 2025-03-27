import { refreshGroupList } from "./create-groups-cont.js";
import generateAllTabs from "./generate-all-tabs.js";
import { changeGroupTab, changeTab } from "./change-tabs.js";

function findActiveTab() {
    const sidebarTabs = Array.from(document.querySelector(".sidebar-functionalities-cont").children);
    const groupTabs = Array.from(document.querySelector(".group-list-cont").children);

    let activeTab = undefined;

    for (let i in sidebarTabs) {
        if (sidebarTabs[i].classList.contains("active-tab")) {
            activeTab = sidebarTabs[i];
            return activeTab;
        }
    }

    for (let i in groupTabs) {
        if (groupTabs[i].classList.contains("active-group-tab")) {
            activeTab = [groupTabs[i].id];
            return activeTab;
        }
    }

    return activeTab;
}

function deleteAllTabsContent() {
    const mainCont = Array.from(document.querySelector(".main-cont").children);

    for (let i in mainCont) {
        let currentTab = Array.from(mainCont[i].children);
        for (let j in currentTab) {
            currentTab[j].remove();
        }
    }
}

export function simulatePageRefresh() {
    let currentActiveTab = findActiveTab();
    deleteAllTabsContent();
    generateAllTabs();
    refreshGroupList();

    if (currentActiveTab === undefined) {
        changeTab(document.querySelector(".sidebar-functionality-cont.search-cont"));
        return;
    }

    else if (Array.isArray(currentActiveTab)) {
        currentActiveTab = document.querySelector(".group-list-cont").querySelector("#"+currentActiveTab[0]);

        // When all tasks within the group are deleted this condition will be met
        if (currentActiveTab === null) {
            changeTab(document.querySelector(".sidebar-functionality-cont.search-cont"));
            return;
        }

        else {
            changeGroupTab(currentActiveTab);
            return;
        }
    }

    else if (currentActiveTab.classList[0].includes("sidebar")) {
        changeTab(currentActiveTab);
        return;
    }
    
    return;
}