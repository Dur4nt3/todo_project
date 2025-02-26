import "./styles.css";
import "./stylesheets/reset.css";

import * as changeTabs from "./modules/change-tabs.js";
import initialLoad from "./modules/initial-load.js";


import { taskCollection  } from "./modules/task-utility-functions.js";
import * as createTask from "./modules/create-task-objects.js";

const basicTask = createTask.createBasicTask("testing basic", "basic task");
const groupedTask1 = createTask.createGroupedTask("testing groups", "grouped task 1", "group1");
const groupedTask2 = createTask.createGroupedTask("more groups", "grouped task 2", "group2", 3);

const originallyAllDay = createTask.createDatedTask("testing all day", "all day task", "2024-03-21T12:30:00", false, 3);
const originallyTimed = createTask.createDatedTask("testing dated", "dated task", "2025-02-25T23:35:00", false);
const dated1 = createTask.createDatedTask("dated 1", "dated task 1", "2025-02-27T23:35:00", false, 2);
const dated2 = createTask.createDatedTask("dated 2", "dated task 2", "2025-02-27", true);
const dated3 = createTask.createDatedTask("dated 3", "dated task 3", "2025-02-27T13:35:00", false, 2);
const dated4 = createTask.createDatedTask("dated 4", "dated task 4", "2025-02-27T16:30:00", false, 2);
const dated5 = createTask.createDatedTask("dated 5", "dated task 5", "2025-02-14T16:30:00", false, 3);
const dated6 = createTask.createDatedTask("dated 6", "dated task 6", "2025-02-14T18:30:00", false, 3);

const datedGroupedTask1 = createTask.createDatedGroupedTask("dated & grouped", "timed grouped", "group1", "2025-01-26T02:59:00", false, 2);
const datedGroupedTask2 = createTask.createDatedGroupedTask("dated & grouped 2", "all-day grouped", "group3", "2025-02-03", true, 2);

datedGroupedTask1.complete();
dated4.complete();


document.addEventListener("DOMContentLoaded", () => {
    initialLoad();
});

const sidebarFunctionalities = document.querySelector(".sidebar-functionalities-cont");
const groupListCont = document.querySelector(".group-list-cont");

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
        console.log("Trying to add a task");
    }
});


// Event listener for group container
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