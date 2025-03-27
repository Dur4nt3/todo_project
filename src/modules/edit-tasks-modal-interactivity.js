import { editTasksModal, adjustUnlistedEntry } from "./edit-tasks-modal.js";
import { allDayToggle, revealRepetitivePatternSection, toggleSelectDayInput, revealHybridMonthlyTypeSection } from "./add-tasks-modal.js";
import { determineTaskType } from "./task-utility-functions.js";
import { formatAddTaskSubmissionData } from "./add-tasks-modal-format-data.js";
import { collectAddTasksFormData } from "./add-tasks-modal-data-collection.js";
import { validateTaskDetails } from "./add-tasks-modal-validation.js";
import { displayAddTasksErrors } from "./add-tasks-display-errors.js";
import { editTasksApplyChanges } from "./edit-tasks-modal-apply-changes.js";
import { simulatePageRefresh } from "./simulate-page-refresh.js";

export function editTasksModalInteractivity(taskObj) {
    const editTasksModalCont = editTasksModal(taskObj);

    document.body.prepend(editTasksModalCont);
    editTasksModalCont.focus();

    editTasksModalCont.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("cancel-button") && target.classList.contains("add-tasks-button")) {
            editTasksModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { editTasksModalCont.remove() }, 300);
            return;
        }

        if (target.classList.contains("select-day-input")) {
            toggleSelectDayInput(target);
            return;
        }

        if (target.classList.contains("confirm-button") && target.classList.contains("add-tasks-button")) {
            const taskType = determineTaskType(taskObj);

            const formData = collectAddTasksFormData(editTasksModalCont);
            const taskDataObj = formatAddTaskSubmissionData(taskType, formData);
            adjustUnlistedEntry(taskDataObj);

            const validationData = validateTaskDetails(taskType, taskDataObj);
            if (validationData !== true) {
                displayAddTasksErrors(validationData, taskType, editTasksModalCont);
                return;
            }

            else if (validationData === true) {
                if (editTasksApplyChanges(taskObj, taskDataObj, taskType) === true) {
                    editTasksModalCont.children[0].classList.add("close-modal-animation");
                    setTimeout(() => { editTasksModalCont.remove(); simulatePageRefresh(); }, 300);
                    return;
                }

                return;
            }

            return;
        }
    });

    editTasksModalCont.addEventListener("input", (e) => {
        const target = e.target;
    
        if (target.classList.contains("task-all-day-input")) {
            allDayToggle(target);
            return;
        }

        else if (target.classList.contains("task-repetition-pattern-input")) {
            revealRepetitivePatternSection(target.value, editTasksModalCont);
            return;
        }

        else if (target.classList.contains("task-specific-occurrence-option-input")) {
            revealHybridMonthlyTypeSection("specific", editTasksModalCont);
            return;
        }

        else if (target.classList.contains("task-end-of-month-option-input")) {
            revealHybridMonthlyTypeSection("end", editTasksModalCont);
            return;
        }
    });

    editTasksModalCont.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            editTasksModalCont.children[0].classList.add("close-modal-animation");
            if (editTasksModalCont.children[1] !== undefined) {
                editTasksModalCont.children[1].remove();
            }
            setTimeout(() => { editTasksModalCont.remove() }, 300);
        }
    });
}