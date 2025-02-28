import * as filterTask from "./filter-tasks.js"
import { resetChooseOneFilterSelection } from "./ui-task-utilities.js"

export function filterInitialCheck(filterButton, tabCont, tasksCont, noMsgCont, noMsgType, fetchTasksFunction, fetchArgs = null) {
    // Check if there are no tasks
    if (tasksCont === null) {
        // If there are truly no tasks scheduled for today (even completed ones) remove the filter container and display the "no tasks ..." message
        if (fetchArgs === null) {
            if (fetchTasksFunction().length === 0 ) {
                filterButton.parentNode.remove();
                createNoScheduledTasksMsg(tabCont, noMsgType);
                return false;
            }
        }

        // If there are truly no tasks scheduled for today (even completed ones) remove the filter container and display the "no tasks ..." message
        else if (fetchTasksFunction(fetchArgs).length === 0 ) {
            filterButton.parentNode.remove();
            createNoScheduledTasksMsg(tabCont, noMsgType);
            return false;
        }

        // If there are tasks scheduled for today (even completed ones) remove the "no tasks ..." message
        if (noMsgCont !== null) {
            noMsgCont.remove();
        }
    }

    // Preemptively remove the container and prepare to generate a new one
    else if (!(tasksCont === null)) {
        tasksCont.remove();
    }

    return true;
}