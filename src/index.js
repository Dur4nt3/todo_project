import "./styles.css";
import "./stylesheets/reset.css";

import * as changeTabs from "./modules/change-tabs.js";
import initialLoad from "./modules/initial-load.js"

document.addEventListener("DOMContentLoaded", () => {
    initialLoad();
});

const sidebarFunctionalities = document.querySelector(".sidebar-functionalities-cont");
const groupListCont = document.querySelector(".group-list-cont");

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
        console.log("Trying to add a task");
    }
});

groupListCont.addEventListener("click", (e) => {
    // Exit if not clicking icon/label/more groups
    let target = e.target;

    if (!(target.classList[0] === "group-symbol" || target.classList[0] === "group-name" || target.classList[0] === "view-more-groups")) {
        return;
    }

    if (target.classList[0] === "group-symbol" || target.classList[0] === "group-name" ) {
        changeTabs.changeGroupTab(target.parentNode);
    }
    else {
        console.log("trying to view more groups");
    }
});