import { addTasksModal, revealTaskTypeFormSection, allDayToggle,
    revealRepetitivePatternSection, toggleSelectDayInput, revealHybridMonthlyTypeSection } from "./add-tasks-modal.js";
import { formatAddTaskSubmissionData } from "./add-tasks-modal-format-data.js";

// This module includes the interactivity logic for the "add tasks" feature

export function addTasksModalInteractivity() {
    const addTasksModalCont = addTasksModal();

    document.body.prepend(addTasksModalCont);
    addTasksModalCont.focus();

    addTasksModalCont.addEventListener("click", (e) => {
        const target = e.target;

        if (target === addTasksModalCont) {
            addTasksModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { addTasksModalCont.remove() }, 300);
            return;
        }

        if (target.classList.contains("cancel-button")) {
            addTasksModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { addTasksModalCont.remove() }, 300);
            return;
        }

        if (target.classList.contains("select-day-input")) {
            toggleSelectDayInput(target);
        }
    });

    addTasksModalCont.addEventListener("input", (e) => {
        const target = e.target;

        if (target.classList.contains("task-type-input")) {
            revealTaskTypeFormSection(target.value, addTasksModalCont);
            return;
        }

        else if (target.classList.contains("task-all-day-input")) {
            allDayToggle(target);
            return;
        }

        else if (target.classList.contains("task-repetition-pattern-input")) {
            revealRepetitivePatternSection(target.value, addTasksModalCont);
            return;
        }

        else if (target.classList.contains("task-specific-occurrence-option-input")) {
            revealHybridMonthlyTypeSection("specific", addTasksModalCont);
            return;
        }

        else if (target.classList.contains("task-end-of-month-option-input")) {
            revealHybridMonthlyTypeSection("end", addTasksModalCont);
            return;
        }
    });

    addTasksModalCont.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            addTasksModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { addTasksModalCont.remove() }, 300);
        }
    });
}