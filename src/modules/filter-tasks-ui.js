import { resetChooseOneFilterSelection, createNoScheduledTasksMsg } from "./ui-task-utilities.js"

export function filterInitialCheck(filterInfoObj) {
    // Check if there are no tasks
    if (filterInfoObj.tasksCont === null) {
        // If there are truly no tasks scheduled for today (even completed ones) remove the filter container and display the "no tasks ..." message
        if (filterInfoObj.fetchArgs === null) {
            if (filterInfoObj.fetchTasksFunc().length === 0 ) {
                filterInfoObj.filterButton.parentNode.remove();
                createNoScheduledTasksMsg(filterInfoObj.tabCont, filterInfoObj.noMsgType);
                return;
            }
        }

        // If there are truly no tasks scheduled for today (even completed ones) remove the filter container and display the "no tasks ..." message
        else if (filterInfoObj.fetchTasksFunc(filterInfoObj.fetchArgs).length === 0 ) {
            filterInfoObj.filterButton.parentNode.remove();
            createNoScheduledTasksMsg(filterInfoObj.tabCont, filterInfoObj.noMsgType);
            return;
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
            chooseOneFilterFunc(chooseOneFilter, false, filterInfoObj);
            return;
        }
    }

    filterInfoObj.tabTasksCreationFunc(filterInfoObj.tabCont);
    return;
}

export function deactivateChooseOneFilterWithCompleted(filterInfoObj) {
    filterInfoObj.filterButton.classList.remove("active-filter");

    if (filterInfoObj.completedActive) {
        filterInfoObj.showCompletedFilterFunc(filterInfoObj.filterButton.parentNode.querySelector(".show-completed"), false, filterInfoObj);
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