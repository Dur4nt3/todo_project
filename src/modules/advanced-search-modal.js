import { buildElement } from "./dom-manipulator.js";

// This module lays the foundation for the "advanced search" modal
// The interactivity logic for the modal is available in the "input-modal.js" file

export class advancedSearchObj {
    constructor(title, group, startDay, startMonth, startYear, endDay, endMonth, endYear, includeCompleted,
    priority, earliest, latest, includeRepetitive, hideNonOrigin) {
        this.title = title;
        this.group = group;
        this.startDay = startDay;
        this.startMonth = startMonth;
        this.startYear = startYear;
        this.endDay = endDay;
        this.endMonth = endMonth;
        this.endYear = endYear;
        this.includeCompleted = includeCompleted;
        this.priority = priority;
        this.earliest = earliest;
        this.latest = latest;
        this.includeRepetitive = includeRepetitive;
        this.hideNonOrigin = hideNonOrigin;
    }
}

function advancedSearchMainDetails() {
    let mainDetailsSection = {};

    const titleFormRow = buildElement("div", "form-row");

    const titleLabel = buildElement("label", "task-title-label", "advanced-search-label");
    titleLabel.htmlFor = "search-task-title";
    titleLabel.textContent = "Task Title";

    const titleInput = buildElement("input", "search-task-title", "advanced-search-input");
    titleInput.type = "text";
    titleInput.name = "search-task-title";
    titleInput.id = "search-task-title";
    titleInput.placeholder = "Task Title";

    titleFormRow.appendChild(titleLabel);
    titleFormRow.appendChild(titleInput);

    mainDetailsSection.titleSearch = titleFormRow;

    const groupFormRow = buildElement("div", "form-row");

    const groupLabel = buildElement("label", "task-group-label", "advanced-search-label");
    groupLabel.htmlFor = "search-task-group";
    groupLabel.textContent = "Task Group";
    
    const groupInput = buildElement("input", "search-task-group", "advanced-search-input");
    groupInput.type = "text";
    groupInput.name = "search-task-group";
    groupInput.id = "search-task-group";
    groupInput.placeholder = "Task Group";

    groupFormRow.appendChild(groupLabel);
    groupFormRow.appendChild(groupInput);

    mainDetailsSection.groupSearch = groupFormRow;

    return mainDetailsSection;
}

function advancedSearchDeadlineDetails() {
    let deadlineDetailsSection = {};

    const startDateFormRow = buildElement("div", "form-row");

    const startDateLabel = buildElement("span", "task-start-date-label", "advanced-search-label");
    startDateLabel.textContent = "From";

    const startDateInputGrid = buildElement("div", "start-date-input-grid", "date-input-grid");

    const startDateDayInput = buildElement("input", "advanced-search-start-day-input", "advanced-search-date-input");
    startDateDayInput.type = "text";
    startDateDayInput.name = "advanced-search-start-day-input";
    startDateDayInput.placeholder = "DD";
    startDateDayInput.maxLength = 2;

    const startDateMonthInput = buildElement("input", "advanced-search-start-month-input", "advanced-search-date-input");
    startDateMonthInput.type = "text";
    startDateMonthInput.name = "advanced-search-start-month-input";
    startDateMonthInput.placeholder = "MM";
    startDateMonthInput.maxLength = 2;

    const startDateYearInput = buildElement("input", "advanced-search-start-year-input", "advanced-search-date-input");
    startDateYearInput.type = "text";
    startDateYearInput.name = "advanced-search-start-year-input";
    startDateYearInput.placeholder = "YYYY";
    startDateYearInput.maxLength = 4;

    startDateInputGrid.appendChild(startDateDayInput);
    startDateInputGrid.appendChild(startDateMonthInput);
    startDateInputGrid.appendChild(startDateYearInput);

    const startDateError = buildElement("span", "input-error", "start-date-error", "hide");
    startDateError.textContent = "Invalid date. Please use the 'DD/MM/YYYY' format or leave blank.";

    startDateFormRow.appendChild(startDateLabel);
    startDateFormRow.appendChild(startDateInputGrid);
    startDateFormRow.appendChild(startDateError);

    deadlineDetailsSection.startDate = startDateFormRow;

    const endDateFormRow = buildElement("div", "form-row");

    const endDateLabel = buildElement("span", "task-end-date-label", "advanced-search-label");
    endDateLabel.textContent = "To";

    const endDateInputGrid = buildElement("div", "end-date-input-grid", "date-input-grid");

    const endDateDayInput = buildElement("input", "advanced-search-end-day-input", "advanced-search-date-input");
    endDateDayInput.type = "text";
    endDateDayInput.name = "advanced-search-end-day-input";
    endDateDayInput.placeholder = "DD";
    endDateDayInput.maxLength = 2;

    const endDateMonthInput = buildElement("input", "advanced-search-end-month-input", "advanced-search-date-input");
    endDateMonthInput.type = "text";
    endDateMonthInput.name = "advanced-search-end-month-input";
    endDateMonthInput.placeholder = "MM";
    endDateMonthInput.maxLength = 2;

    const endDateYearInput = buildElement("input", "advanced-search-end-year-input", "advanced-search-date-input");
    endDateYearInput.type = "text";
    endDateYearInput.name = "advanced-search-end-year-input";
    endDateYearInput.placeholder = "YYYY";
    endDateYearInput.maxLength = 4;

    endDateInputGrid.appendChild(endDateDayInput);
    endDateInputGrid.appendChild(endDateMonthInput);
    endDateInputGrid.appendChild(endDateYearInput);

    const endDateError = buildElement("span", "input-error", "end-date-error", "hide");
    endDateError.textContent = "Invalid date. Please use the 'DD/MM/YYYY' format or leave blank.";

    endDateFormRow.appendChild(endDateLabel);
    endDateFormRow.appendChild(endDateInputGrid);
    endDateFormRow.appendChild(endDateError);

    deadlineDetailsSection.endDate = endDateFormRow;

    return deadlineDetailsSection;
}

function advancedSearchFilterOptions() {
    let filterOptionsSection = {};

    const generalFiltersRow1 = buildElement("div", "filter-options-row", "general-filter-cont");

    const generalSubRow1 = buildElement("div", "form-row");

    const completedLabel = buildElement("label", "include-completed-label", "advanced-search-label");
    completedLabel.htmlFor = "include-completed-tasks";
    completedLabel.textContent = "Include Completed";

    const completedToggleSwitch = buildElement("label", "toggle-switch-label");

    const completedCheckbox = buildElement("input", "toggle-switch-input", "include-completed-tasks");
    completedCheckbox.type = "checkbox";
    completedCheckbox.name = "include-completed-tasks";
    completedCheckbox.id = "include-completed-tasks";
    const completedSlider = buildElement("span", "toggle-switch-slider");

    completedToggleSwitch.appendChild(completedCheckbox);
    completedToggleSwitch.appendChild(completedSlider);

    generalSubRow1.appendChild(completedLabel);
    generalSubRow1.appendChild(completedToggleSwitch);

    const generalSubRow2 = buildElement("div", "form-row");

    const priorityLabel = buildElement("label", "filter-results-priority-label", "advanced-search-label");
    priorityLabel.htmlFor = "filter-results-priority";
    priorityLabel.textContent = "Filter Results by Priority";

    const priorityToggleSwitch = buildElement("label", "toggle-switch-label");

    const priorityCheckbox = buildElement("input", "toggle-switch-input", "filter-results-priority", "choose-one-filter");
    priorityCheckbox.type = "checkbox";
    priorityCheckbox.name = "filter-results-priority";
    priorityCheckbox.id = "filter-results-priority";
    const prioritySlider = buildElement("span", "toggle-switch-slider");

    priorityToggleSwitch.appendChild(priorityCheckbox);
    priorityToggleSwitch.appendChild(prioritySlider);

    generalSubRow2.appendChild(priorityLabel);
    generalSubRow2.appendChild(priorityToggleSwitch);

    generalFiltersRow1.appendChild(generalSubRow1);
    generalFiltersRow1.appendChild(generalSubRow2);
    
    filterOptionsSection.generalFilters1 = generalFiltersRow1;

    const generalFiltersRow2 = buildElement("div", "filter-options-row", "general-filter-cont");

    const generalSubRow3 = buildElement("div", "form-row");

    const earliestLabel = buildElement("label", "filter-results-earliest-label", "advanced-search-label");
    earliestLabel.htmlFor = "filter-results-earliest";
    earliestLabel.textContent = "Filter Results by Earliest";

    const earliestToggleSwitch = buildElement("label", "toggle-switch-label");

    const earliestCheckbox = buildElement("input", "toggle-switch-input", "filter-results-earliest", "choose-one-filter");
    earliestCheckbox.type = "checkbox";
    earliestCheckbox.name = "filter-results-earliest";
    earliestCheckbox.id = "filter-results-earliest";
    const earliestSlider = buildElement("span", "toggle-switch-slider");

    earliestToggleSwitch.appendChild(earliestCheckbox);
    earliestToggleSwitch.appendChild(earliestSlider);

    generalSubRow3.appendChild(earliestLabel);
    generalSubRow3.appendChild(earliestToggleSwitch);

    const generalSubRow4 = buildElement("div", "form-row");

    const latestLabel = buildElement("label", "filter-results-latest-label", "advanced-search-label");
    latestLabel.htmlFor = "filter-results-latest";
    latestLabel.textContent = "Filter Results by Latest";

    const latestToggleSwitch = buildElement("label", "toggle-switch-label");

    const latestCheckbox = buildElement("input", "toggle-switch-input", "filter-results-latest", "choose-one-filter");
    latestCheckbox.type = "checkbox";
    latestCheckbox.name = "filter-results-latest";
    latestCheckbox.id = "filter-results-latest";
    const latestSlider = buildElement("span", "toggle-switch-slider");

    latestToggleSwitch.appendChild(latestCheckbox);
    latestToggleSwitch.appendChild(latestSlider);

    generalSubRow4.appendChild(latestLabel);
    generalSubRow4.appendChild(latestToggleSwitch);

    generalFiltersRow2.appendChild(generalSubRow3);
    generalFiltersRow2.appendChild(generalSubRow4);

    filterOptionsSection.generalFilters2 = generalFiltersRow2;

    const repetitiveFilterRow = buildElement("div", "filter-options-row", "repetitive-tasks-filters-cont");

    const repetitiveSubRow1 = buildElement("div", "form-row");

    const reoccurringLabel = buildElement("label", "include-repetitive-tasks-label", "advanced-search-label");
    reoccurringLabel.htmlFor = "include-repetitive-tasks";
    reoccurringLabel.textContent = "Include Reoccurring Tasks";

    const reoccurringToggleSwitch = buildElement("label", "toggle-switch-label");

    const reoccurringCheckbox = buildElement("input", "toggle-switch-input", "include-repetitive-tasks");
    reoccurringCheckbox.type = "checkbox";
    reoccurringCheckbox.name = "include-repetitive-tasks";
    reoccurringCheckbox.id = "include-repetitive-tasks";
    const reoccurringSlider = buildElement("span", "toggle-switch-slider");

    reoccurringToggleSwitch.appendChild(reoccurringCheckbox);
    reoccurringToggleSwitch.appendChild(reoccurringSlider);

    repetitiveSubRow1.appendChild(reoccurringLabel);
    repetitiveSubRow1.appendChild(reoccurringToggleSwitch);

    const repetitiveSubRow2 = buildElement("div", "form-row");

    const nonOriginLabel = buildElement("label", "only-show-origin-label", "advanced-search-label");
    nonOriginLabel.htmlFor = "only-show-origin";
    nonOriginLabel.textContent = "Hide Non-Origin Tasks";

    const nonOriginToggleSwitch = buildElement("label", "toggle-switch-label");

    const nonOriginCheckbox = buildElement("input", "toggle-switch-input", "only-show-origin");
    nonOriginCheckbox.type = "checkbox";
    nonOriginCheckbox.name = "only-show-origin";
    nonOriginCheckbox.id = "only-show-origin";
    const nonOriginSlider = buildElement("span", "toggle-switch-slider");

    nonOriginToggleSwitch.appendChild(nonOriginCheckbox);
    nonOriginToggleSwitch.appendChild(nonOriginSlider);

    repetitiveSubRow2.appendChild(nonOriginLabel);
    repetitiveSubRow2.appendChild(nonOriginToggleSwitch);

    repetitiveFilterRow.appendChild(repetitiveSubRow1);
    repetitiveFilterRow.appendChild(repetitiveSubRow2);

    filterOptionsSection.repetitiveTasksFilter = repetitiveFilterRow;

    return filterOptionsSection;
}

export function advancedSearchModal() {
    const modalCont = buildElement("div", "modal");
    modalCont.tabIndex = 0;

    const advancedSearchModalCont = buildElement("div", "modal-cont", "advanced-search-modal");

    const modalTitle = buildElement("h3", "advanced-search-title");
    modalTitle.textContent = "Advanced Task Search";

    const formCont = buildElement("form", "advanced-search-form");

    const mainDetailsTitle = buildElement("h4", "form-subsection-title");
    mainDetailsTitle.textContent = "Main Details";
    const mainDetailsSection = advancedSearchMainDetails();

    formCont.appendChild(mainDetailsTitle);
    formCont.appendChild(mainDetailsSection.titleSearch);
    formCont.appendChild(mainDetailsSection.groupSearch);

    const deadlineDetailsTitle = buildElement("h4", "form-subsection-title");
    deadlineDetailsTitle.textContent = "Deadline Details";
    const deadlineDetailsSection = advancedSearchDeadlineDetails();
    
    formCont.appendChild(deadlineDetailsTitle);
    formCont.appendChild(deadlineDetailsSection.startDate);
    formCont.appendChild(deadlineDetailsSection.endDate);

    const filterOptionsTitle = buildElement("h4", "form-subsection-title");
    filterOptionsTitle.textContent = "Filter Options";
    const filterOptionsSection = advancedSearchFilterOptions();

    formCont.appendChild(filterOptionsTitle);
    formCont.appendChild(filterOptionsSection.generalFilters1);
    formCont.appendChild(filterOptionsSection.generalFilters2);
    formCont.appendChild(filterOptionsSection.repetitiveTasksFilter);

    const buttonCont = buildElement("div", "advanced-search-button-cont");

    const cancelButton = buildElement("button", "advanced-search-button", "cancel-button");
    cancelButton.textContent = "Cancel";
    const confirmButton = buildElement("button", "advanced-search-button", "confirm-button");
    confirmButton.textContent = "Confirm";

    buttonCont.appendChild(cancelButton);
    buttonCont.appendChild(confirmButton);

    advancedSearchModalCont.appendChild(modalTitle);
    advancedSearchModalCont.appendChild(formCont);
    advancedSearchModalCont.appendChild(buttonCont);

    modalCont.appendChild(advancedSearchModalCont);

    return modalCont;
}

export function advancedSearchHandleChooseOneFilters(clickedFilter) {
    const allChooseOneFilters = Array.from(document.querySelectorAll(".choose-one-filter"));

    for (let i in allChooseOneFilters) {
        if (allChooseOneFilters[i] !== clickedFilter) {
            allChooseOneFilters[i].checked = false;
        } 
    }
}

export function advancedSearchCheckSubmission() {
    const advancedSearchForm = document.querySelector(".advanced-search-form");

    const taskTitle = advancedSearchForm.querySelector(".search-task-title").value;
    const taskGroup = advancedSearchForm.querySelector(".search-task-group").value;

    const startDateInputs = Array.from(advancedSearchForm.querySelector(".start-date-input-grid").children);
    let startDateInputsEmpty = false;

    for (let i in startDateInputs) {
        if (startDateInputs[i].value === "") {
            startDateInputsEmpty = true;
        }
    }

    const endDateInputs = Array.from(advancedSearchForm.querySelector(".end-date-input-grid").children);
    let endDateInputsEmpty = false;

    for (let i in endDateInputs) {
        if (endDateInputs[i].value === "") {
            endDateInputsEmpty = true;
        }
    }

    // If both the task title field and start and end date fields are empty => return false to indicate that you should exit the modal if attempting to submit
    if (taskTitle === "" && (startDateInputsEmpty && endDateInputsEmpty) && taskGroup === "") {
        return false;
    }

    return true;
}