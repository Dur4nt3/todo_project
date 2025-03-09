import { isInputSingleDigitNumber } from "./number-input-validation.js";
import { isValidDate3Inputs } from "./date-input-validation.js";
import { buildElement, show, hide } from "./dom-manipulator.js";
import { setUpcomingRange, getTasksAdvanced } from "./fetch-tasks.js";
import { priorityFirst, earliestFirst, latestFirst } from "./filter-tasks.js";
import { forceHardRefresh } from "./ui-task-utilities.js";
import { advancedSearchModal, advancedSearchHandleChooseOneFilters, advancedSearchCheckSubmission, advancedSearchObj } from "./advanced-search-modal.js"

// This module includes the interactivity logic for modals that are used to gather user input
// This module doesn't include all modals that are used to gather user input

function selectUpcomingRangeModal() {
    const modalCont = buildElement("div", "modal");
    modalCont.tabIndex = 0;

    const selectUpcomingRangeModalCont = buildElement("div", "modal-cont", "select-upcoming-range-modal");

    const inputLabel = buildElement("label", "select-upcoming-range-label");
    inputLabel.for = "select-upcoming-range-input";

    const rangeInput = buildElement("input", "select-upcoming-range-input");
    rangeInput.type = "number";
    rangeInput.min = 1;
    rangeInput.max = 4;
    rangeInput.maxLength = 1;
    rangeInput.name = "select-upcoming-range-input";
    rangeInput.placeholder = "1 - 4";

    const labelSpan1 = buildElement("span", "select-upcoming-range-text");
    const labelSpan2 = buildElement("span", "select-upcoming-range-text");
    labelSpan1.textContent = "Display all tasks within the next";
    labelSpan2.textContent = "weeks";

    inputLabel.appendChild(labelSpan1);
    inputLabel.appendChild(rangeInput);
    inputLabel.appendChild(labelSpan2);

    const buttonCont = buildElement("div", "select-upcoming-range-button-cont");

    const cancelButton = buildElement("button", "select-upcoming-range-button", "cancel-button");
    const confirmButton = buildElement("button", "select-upcoming-range-button", "confirm-button");
    cancelButton.textContent = "Cancel";
    confirmButton.textContent = "Confirm";

    buttonCont.appendChild(cancelButton);
    buttonCont.appendChild(confirmButton);

    selectUpcomingRangeModalCont.appendChild(inputLabel);
    selectUpcomingRangeModalCont.appendChild(buttonCont);

    modalCont.appendChild(selectUpcomingRangeModalCont);

    return modalCont;
}

function confirmUpcomingRangeSelection(input) {
    if (!isInputSingleDigitNumber(input, 1, 4)) {
        return false;
    }
    return true;
}

export function selectUpcomingRangeModalInteractivity(tabToDeleteClass, tabGenerationFunction) {
    const selectUpcomingModal = selectUpcomingRangeModal();

    document.body.prepend(selectUpcomingModal);
    selectUpcomingModal.focus();

    selectUpcomingModal.addEventListener("click", (e) => {
        const target = e.target;
        const rangeInput = selectUpcomingModal.querySelector(".select-upcoming-range-input");

        if (target.classList.contains("modal")) {
            selectUpcomingModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { selectUpcomingModal.remove(); }, 300);
            return;
        }

        else if (target.classList.contains("cancel-button")) {
            selectUpcomingModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { selectUpcomingModal.remove(); }, 300);
            return;
        }

        else if (target.classList.contains("confirm-button")) {
            if (!confirmUpcomingRangeSelection(rangeInput)) {
                rangeInput.id = "invalid-range-input";
                return;
            }
            setUpcomingRange(rangeInput.value);
            forceHardRefresh(tabToDeleteClass, tabGenerationFunction);
            selectUpcomingModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { selectUpcomingModal.remove(); }, 300);
            return;
        }
    });

    selectUpcomingModal.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            selectUpcomingModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { selectUpcomingModal.remove() }, 300);
        }
    });
}

export function advancedSearchModalInteractivity(tabTasksCreationFunc, tabContClass) {
    const advancedSearchModalCont = advancedSearchModal();

    document.body.prepend(advancedSearchModalCont);
    advancedSearchModalCont.focus();

    advancedSearchModalCont.addEventListener("click", (e) => {
        const target = e.target;
        const form = advancedSearchModalCont.querySelector(".advanced-search-form");

        if (target.classList.contains("modal")) {
            advancedSearchModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { advancedSearchModalCont.remove(); }, 300);
            return;
        }

        else if (target.classList.contains("cancel-button")) {
            advancedSearchModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { advancedSearchModalCont.remove(); }, 300);
            return;
        }

        if (target.classList.contains("choose-one-filter")) {
            advancedSearchHandleChooseOneFilters(target);
        }

        if (target.classList.contains("confirm-button")) {
            // If this test passes it means that sufficient inputs were entered in order to perform a search
            // This doesn't mean that the inputs entered for dates are valid
            if (!advancedSearchCheckSubmission()) {
                advancedSearchModalCont.children[0].classList.add("close-modal-animation");
                setTimeout(() => { advancedSearchModalCont.remove() }, 300);
                return;
            }

            const searchParameters = new advancedSearchObj(form.querySelector(".search-task-title").value, form.querySelector(".search-task-group").value,
                form.querySelector(".advanced-search-start-day-input").value, form.querySelector(".advanced-search-start-month-input").value,
                form.querySelector(".advanced-search-start-year-input").value, form.querySelector(".advanced-search-end-day-input").value,
                form.querySelector(".advanced-search-end-month-input").value, form.querySelector(".advanced-search-end-year-input").value,
                form.querySelector(".include-completed-tasks").checked, form.querySelector(".filter-results-priority").checked,
                form.querySelector(".filter-results-earliest").checked, form.querySelector(".filter-results-latest").checked,
                form.querySelector(".include-repetitive-tasks").checked, form.querySelector(".only-show-origin").checked);

            if (!isValidDate3Inputs(searchParameters.startDay, searchParameters.startMonth, searchParameters.startYear)) {
                show(form.querySelector(".start-date-error"));
                return;
            }
            else {
                hide(form.querySelector(".start-date-error"));
            }
            if (!isValidDate3Inputs(searchParameters.endDay, searchParameters.endMonth, searchParameters.endYear)) {
                show(form.querySelector(".end-date-error"));
                return;
            }
            else {
                hide(form.querySelector(".end-date-error"));
            }

            let taskList = getTasksAdvanced(searchParameters);

            if (searchParameters.priority) {
                taskList = priorityFirst(taskList);
            }
            else if (searchParameters.earliest) {
                taskList = earliestFirst(taskList);
            }
            else if (searchParameters.latest) {
                taskList = latestFirst(taskList);
            }

            tabTasksCreationFunc(document.querySelector("."+tabContClass), taskList, '');
            advancedSearchModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { advancedSearchModalCont.remove() }, 300);
            return;
        }

    });

    advancedSearchModalCont.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            advancedSearchModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { advancedSearchModalCont.remove() }, 300);
        }
    });
}