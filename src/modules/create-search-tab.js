import { getTasksByTitle } from "./fetch-tasks.js";
import { buildElement } from "./dom-manipulator.js";
import { searchTaskCont, generalTaskCont } from "./build-task-cont.js";
import { generalTabHeader } from "./build-tab-header.js";
import { searchBar } from "./build-misc.js";
import { advancedSearchModalInteractivity } from "./input-modals.js";
import { taskContEventListeners, createNoScheduledTasksMsg, hardRefreshTabEvent } from "./ui-task-utilities.js";

function createSearchTabHeader(tabCont) {
    const tabHeaderCont = generalTabHeader("search-tab", "Search Tasks");

    hardRefreshTabEvent(tabHeaderCont.querySelector(".refresh-icon"), ".search-tab-cont", createSearchTab);

    tabCont.appendChild(tabHeaderCont);
}

function searchBarEvent(searchBar, tabCont) {
    searchBar.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("tune-icon")) {
            advancedSearchModalInteractivity(createSearchTabTasks, "search-tab-cont");
        }
    });

    const searchInput = searchBar.querySelector(".search-tasks-input");

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            return;
        }

        const searchValue = searchInput.value + e.key;

        const taskList = getTasksByTitle(searchValue);

        createSearchTabTasks(tabCont, taskList, searchValue);
    });


    // Backspace doesn't trigger "keypress" event therefore using the "keyup" event solely to adjust for backspaces
    searchInput.addEventListener("keyup", (e) => {
        if (!(e.key === "Backspace")) {
            return;
        }
        
        if (searchInput.value === "") {
            createSearchTabTasks(tabCont);
            return;
        }

        else {
            const searchValue = searchInput.value;

            const taskList = getTasksByTitle(searchValue);

            createSearchTabTasks(tabCont, taskList, searchValue);
        }
    });
}

function createSearchTabSearchBar(tabCont) {
    const searchBarCont = searchBar();

    searchBarEvent(searchBarCont, tabCont);

    tabCont.appendChild(searchBarCont);
}

function createSearchTabTasks(tabCont, filter = false, keyword = '') {
    // Preemptively Remove the task container
    if (tabCont.querySelector(".searched-tasks-cont") !== null) {
        tabCont.querySelector(".searched-tasks-cont").remove();
    }


    const noMsg = document.querySelector(".no-found-tasks-msg");

    let foundTasks;
    if (!filter) {
        foundTasks = [];
    }
    else {
        foundTasks = filter;
    }

    if (foundTasks.length === 0) {
        if (noMsg === null) {
            createNoScheduledTasksMsg(tabCont, "search");
            return;
        }
    }

    else {
        if (noMsg !== null) {
            noMsg.remove();
        }
    }

    const searchedTasksCont = buildElement("div", "searched-tasks-cont");

    for (let taskIndex in foundTasks) {
        let task = foundTasks[taskIndex];
        let taskCont;

        if (keyword === '') {
            taskCont = generalTaskCont(task);
        }
        else {
            taskCont = searchTaskCont(task, keyword);
        }

        taskContEventListeners(taskCont);

        searchedTasksCont.appendChild(taskCont);
    }

    tabCont.appendChild(searchedTasksCont);
}

export function createSearchTab() {
    const searchTabCont = document.querySelector(".search-tab-cont");

    createSearchTabHeader(searchTabCont);
    createSearchTabSearchBar(searchTabCont);
    createSearchTabTasks(searchTabCont);
}