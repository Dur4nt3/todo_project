import { resetChooseOneFilterSelection, createNoScheduledTasksMsg } from "./ui-task-utilities.js"

// This module manages the UI portion for task filtering
// Specifically it manages how individual tabs react when selecting and unselecting various filters

export class filterInfoWithCompleted {
    constructor(filterButton, tabClass, taskContClass, noMsgContClass, noMsgType, fetchTasksFunc, tabTasksCreationFunc, chooseOneFilterFuncs, showCompletedFilterFunc) {
        this.directClick = false;
        this.filterButton = filterButton;
        this.tabCont = document.querySelector("." + tabClass);
        this.tasksCont = document.querySelector("." + taskContClass);
        this.noMsgCont = document.querySelector("." + noMsgContClass);
        this.noMsgType = noMsgType;
        this.fetchTasksFunc = fetchTasksFunc;
        this.fetchArgs = null;
        this.completedActive = filterButton.parentNode.querySelector(".show-completed").classList.contains("active-filter");
        this.tabTasksCreationFunc = tabTasksCreationFunc;
        this.chooseOneFilterButtons = [filterButton.parentNode.querySelector(".filter-priority"), filterButton.parentNode.querySelector(".filter-earliest-first"),
            filterButton.parentNode.querySelector(".filter-latest-first")];
        this.chooseOneFilterFuncs = chooseOneFilterFuncs;
        this.showCompletedFilterFunc = showCompletedFilterFunc;
    }
}

export class filterInfoWithoutCompleted {
    constructor(filterButton, tabClass, taskContClass, noMsgContClass, noMsgType, fetchTasksFunc, tabTasksCreationFunc) {
        this.directClick = false;
        this.filterButton = filterButton;
        this.tabCont = document.querySelector("." + tabClass);
        this.tasksCont = document.querySelector("." + taskContClass);
        this.noMsgCont = document.querySelector("." + noMsgContClass);
        this.noMsgType = noMsgType;
        this.fetchTasksFunc = fetchTasksFunc;
        this.fetchArgs = null;
        this.tabTasksCreationFunc = tabTasksCreationFunc;;
    }
}

export function filterInitialCheck(filterInfoObj) {
    // Check if there are no tasks
    if (filterInfoObj.tasksCont === null) {
        // If there are truly no tasks scheduled for today (even completed ones) remove the filter container and display the "no tasks ..." message
        if (filterInfoObj.fetchArgs === null) {

            if (filterInfoObj.secondaryArgs !== undefined) {
                if (filterInfoObj.fetchTasksFunc(filterInfoObj.secondaryArgs).length === 0 ) {
                    filterInfoObj.filterButton.parentNode.remove();
                    if (filterInfoObj.noMsg === null) {
                        createNoScheduledTasksMsg(filterInfoObj.tabCont, filterInfoObj.noMsgType);
                    }
                    return;
                }
            }

            else if (filterInfoObj.fetchTasksFunc().length === 0 ) {
                filterInfoObj.filterButton.parentNode.remove();
                if (filterInfoObj.noMsg === null) {
                    createNoScheduledTasksMsg(filterInfoObj.tabCont, filterInfoObj.noMsgType);
                }
                return;
            }
        }

        // If there are truly no tasks scheduled for today (even completed ones) remove the filter container and display the "no tasks ..." message
        else {
            if (filterInfoObj.secondaryArgs !== undefined) {
                if (filterInfoObj.fetchTasksFunc(filterInfoObj.secondaryArgs, filterInfoObj.fetchArgs).length === 0) {
                    filterInfoObj.filterButton.parentNode.remove();
                    if (filterInfoObj.noMsgCont === null) {
                        createNoScheduledTasksMsg(filterInfoObj.tabCont, filterInfoObj.noMsgType);
                    }
                    return;
                }
            }

            else if (filterInfoObj.fetchTasksFunc(filterInfoObj.fetchArgs).length === 0) {
                filterInfoObj.filterButton.parentNode.remove();
                if (filterInfoObj.noMsgCont === null) {
                    createNoScheduledTasksMsg(filterInfoObj.tabCont, filterInfoObj.noMsgType);
                }
                return;
            }
        }

        // If there are tasks scheduled for today (even completed ones) remove the "no tasks ..." message
        if (filterInfoObj.noMsgCont !== null) {
            filterInfoObj.noMsgCont.remove();
        }
    }

    // Preemptively remove the container and prepare to generate a new one
    else if (!(filterInfoObj.tasksCont === null)) {
        filterInfoObj.tasksCont.remove();
    }

    return;
}

export function deactivateCompletedFilter(filterInfoObj) {    
    filterInfoObj.filterButton.classList.remove("active-filter");
    
    for (let i in filterInfoObj.chooseOneFilterButtons) {
        let chooseOneFilter = filterInfoObj.chooseOneFilterButtons[i];
        let chooseOneFilterFunc = filterInfoObj.chooseOneFilterFuncs[i];

        if (chooseOneFilter.classList.contains("active-filter")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.fetchArgs = true;
            filterInfoCopy.directClick = false;
            filterInfoCopy.filterButton = chooseOneFilter;

            chooseOneFilterFunc(filterInfoCopy);
            return;
        }
    }

    if (filterInfoObj.secondaryArgs !== undefined) {
        filterInfoObj.tabTasksCreationFunc(filterInfoObj.tabCont, filterInfoObj.secondaryArgs);
        return;
    }

    filterInfoObj.tabTasksCreationFunc(filterInfoObj.tabCont);
    return;
}

export function deactivateChooseOneFilterWithCompleted(filterInfoObj) {
    filterInfoObj.filterButton.classList.remove("active-filter");

    if (filterInfoObj.completedActive) {
        let filterInfoCopy = filterInfoObj;
        filterInfoCopy.fetchArgs = true;
        filterInfoCopy.directClick = false;
        filterInfoCopy.filterButton = filterInfoObj.filterButton.parentNode.querySelector(".show-completed");

        filterInfoObj.showCompletedFilterFunc(filterInfoCopy);
        return;
    }

    if (filterInfoObj.secondaryArgs !== undefined) {
        filterInfoObj.tabTasksCreationFunc(filterInfoObj.tabCont, filterInfoObj.secondaryArgs);
        return;
    }

    filterInfoObj.tabTasksCreationFunc(filterInfoObj.tabCont);
    return;
}

export function deactivateChooseOneFilter(filterInfoObj) {
    filterInfoObj.filterButton.classList.remove("active-filter");

    filterInfoObj.tabTasksCreationFunc(filterInfoObj.tabCont);
    return;
}

export function activateShowCompletedFilter(filterInfoObj) {
    filterInfoObj.filterButton.classList.add("active-filter");

    let taskList;
    if (filterInfoObj.fetchArgs === null) {
        if (filterInfoObj.secondaryArgs !== undefined) {
            taskList = filterInfoObj.fetchTasksFunc(filterInfoObj.secondaryArgs);
        }
        else {
            taskList = filterInfoObj.fetchTasksFunc();
        }
    }
    else {
        if (filterInfoObj.secondaryArgs !== undefined) {
            taskList = filterInfoObj.fetchTasksFunc(filterInfoObj.secondaryArgs, filterInfoObj.fetchArgs);
        }
        else {
            taskList = filterInfoObj.fetchTasksFunc(filterInfoObj.fetchArgs);
        }
    }

    for (let i in filterInfoObj.chooseOneFilterButtons) {
        let chooseOneFilter = filterInfoObj.chooseOneFilterButtons[i];
        let chooseOneFilterFunc = filterInfoObj.chooseOneFilterFuncs[i];

        if (chooseOneFilter.classList.contains("active-filter")) {
            let filterInfoCopy = filterInfoObj;
            filterInfoCopy.fetchArgs = false;
            filterInfoCopy.directClick = false;
            filterInfoCopy.filterButton = chooseOneFilter;

            chooseOneFilterFunc(filterInfoCopy);
            return;
        }
    }

    if (filterInfoObj.secondaryArgs !== undefined) {
        filterInfoObj.tabTasksCreationFunc(filterInfoObj.tabCont, filterInfoObj.secondaryArgs, taskList);
        return;
    }

    filterInfoObj.tabTasksCreationFunc(filterInfoObj.tabCont, taskList);
    return;
}

export function activateChooseOneFilter(filterInfoObj, taskList) {
    resetChooseOneFilterSelection(filterInfoObj.filterButton.parentNode);

    filterInfoObj.filterButton.classList.add("active-filter");

    if (filterInfoObj.secondaryArgs !== undefined) {
        filterInfoObj.tabTasksCreationFunc(filterInfoObj.tabCont, filterInfoObj.secondaryArgs, taskList);
        return;
    }

    filterInfoObj.tabTasksCreationFunc(filterInfoObj.tabCont, taskList);
}