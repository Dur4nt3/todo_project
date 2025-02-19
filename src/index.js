import "./styles.css";
import "./stylesheets/reset.css";

import * as changeTabs from "./modules/change-tabs.js";
import initialLoad from "./modules/initial-load.js"

document.addEventListener("DOMContentLoaded", () => {
    initialLoad();
});

const sidebarFunctionalities = document.querySelector(".sidebar-functionalities-cont");

sidebarFunctionalities.addEventListener("click", (e) => {
    // Exit if not clicking on icon/label
    if (e.target.parentNode === sidebarFunctionalities || e.target === sidebarFunctionalities) {
        return;
    }

    const target = e.target;

    // Different function for adding tasks as opposed to changing tabs
    if (!target.parentNode.classList.contains("add-cont")) {
        changeTabs.changeTab(target.parentNode);
    }
    else {
        console.log("Trying to add a task");
    }
});