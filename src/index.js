import "./styles.css";
import "./stylesheets/reset.css";

import * as changeTabs from "./modules/change-tabs.js";
import initialLoad from "./modules/initial-load.js";
import { moreGroupsModalInteractivity } from "./modules/more-groups-modal.js";
import { editGroupsModalInteractivity } from "./modules/misc-modals.js";
import { helpModalInteractivity } from "./modules/help-modal.js";


import { taskCollection  } from "./modules/task-utility-functions.js";
import * as createTask from "./modules/create-task-objects.js";
import * as repetitionGenerator from "./modules/repetition-generator.js"

const basicTask = createTask.createBasicTask("testing basic", "basic task");
const basicTask2 = createTask.createBasicTask("basic 2", "basic task 2", 2);
const basicTask3 = createTask.createBasicTask("basic 3", "basic task 3", 3);
const basicTask4 = createTask.createBasicTask("basic 4", "basic task 4", 1);
basicTask3.complete();

const groupedTask1 = createTask.createGroupedTask("testing groups", "grouped task 1", "group1");
const groupedTask2 = createTask.createGroupedTask("more groups", "grouped task 2", "group2", 3);
const groupedTask3 = createTask.createGroupedTask("grouped 3", "grouped task 3", "group3", 2);
const groupedTask4 = createTask.createGroupedTask("grouped 4", "grouped task 4", "group1", 3);
const groupedTask5 = createTask.createGroupedTask("grouped 5", "grouped task 5", "group6", 2);
const groupedTask6 = createTask.createGroupedTask("grouped 6", "grouped task 6", "group1", 3);
const groupedTask7 = createTask.createGroupedTask("grouped 7", "grouped task 7", "group1", 2);
const groupedTask8 = createTask.createGroupedTask("grouped 8", "grouped task 8", "group1", 3);
const groupedTask9 = createTask.createGroupedTask("grouped 9", "grouped task 9", "group7", 3);
const groupedTask10 = createTask.createGroupedTask("grouped 10", "grouped task 10", "group5", 3);
const groupedTask11 = createTask.createGroupedTask("grouped 11", "grouped task 11", "group5", 3);
groupedTask1.complete();
groupedTask9.removeListing();


const originallyAllDay = createTask.createDatedTask("testing all day", "all day task", "2024-03-21T12:30:00", false, 3);
const originallyTimed = createTask.createDatedTask("testing dated", "dated task", "2025-03-12T23:35:00", false);
const dated1 = createTask.createDatedTask("dated 1", "dated task 1", "2025-03-19T23:35:00", false, 2);
const dated2 = createTask.createDatedTask("dated 2", "dated task 2", "2025-03-10", true);
const dated3 = createTask.createDatedTask("dated 3", "dated task 3", "2025-02-27T13:35:00", false, 2);
const dated4 = createTask.createDatedTask("dated 4", "dated task 4", "2025-03-11", true, 2);
const dated5 = createTask.createDatedTask("dated 5", "dated task 5", "2025-03-09T16:30:00", false, 3);
const dated6 = createTask.createDatedTask("dated 6", "dated task 6", "2025-03-05", true, 3);
const todayTask1 = createTask.createDatedTask("today 1", "today task 1", "2025-03-17", true, 2);
const todayTask2 = createTask.createDatedTask("today 2", "today task 2", "2025-03-17T13:45:00", false, 3);
const todayTask3 = createTask.createDatedTask("today 3", "today task 3", "2025-03-17T21:22:00", false, 1);
const todayTask4 = createTask.createDatedTask("today 4", "today task 4", "2025-03-17", true, 2);
dated4.complete();
dated5.complete();
todayTask4.complete();


const datedGroupedTask1 = createTask.createDatedGroupedTask("dated & grouped", "timed grouped", "group1", "2025-01-26T02:59:00", false, 2);
const datedGroupedTask2 = createTask.createDatedGroupedTask("dated & grouped 2", "all-day grouped", "group3", "2025-02-03", true, 2);
const datedGroupedTask3 = createTask.createDatedGroupedTask("dated & grouped 3", "dated & grouped task 3", "group4", "2025-03-26", true, 2);
const datedGroupedTask4 = createTask.createDatedGroupedTask("dated & grouped 4", "dated & grouped task 4", "group5", "2025-02-03T13:30:00", false, 3);
const datedGroupedTask5 = createTask.createDatedGroupedTask("dated & grouped 5", "dated & grouped task 5", "group2", "2025-02-03T13:30:00", false, 3);
const datedGroupedTask6 = createTask.createDatedGroupedTask("dated & grouped 6", "dated & grouped task 6", "group2", "2025-02-03T14:30:00", false, 3);
const datedGroupedTask7 = createTask.createDatedGroupedTask("dated & grouped 7", "dated & grouped task 7", "group2", "2025-02-03T16:30:00", false, 3);
datedGroupedTask1.complete();
datedGroupedTask4.complete();

// const repetitiveTask = createTask.createRepetitiveTask("repetitive task", "checking repetition",
//     "2025-03-06T12:30:00", false, "time", {"hours": 1}, true, 2, null
// );

// const repetitiveTask2 = createTask.createRepetitiveTask("repetitive task2", "checking repetition2",
//     "2025-03-11T12:30:00", false, "hybrid-weekly", [[0,2,4], {"weeks": 2}], true, 2, null
// );

// repetitionGenerator.generateRepetition(repetitiveTask, true);
// repetitionGenerator.generateRepetition(repetitiveTask2, true);




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
        console.log("Trying to add a task");
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
        console.log("trying to open settings");
    }
    if (target.classList.contains("help-icon") || target.classList.contains("help-label")) {
        helpModalInteractivity();
    }
})
