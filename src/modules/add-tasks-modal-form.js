import { buildElement, hide, buildSelectElement, buildImgElement } from "./dom-manipulator.js";
import { addTasksRepetitiveSection } from "./add-tasks-modal-repetitive-section.js";

import infoSvg from "../images/More-information.svg";

// This module creates the form for the "add tasks" feature

function addTasksGroupedSection(cont) {
    const groupSectionCont = buildElement("div", "group-details-form-subsection", "hide");
    groupSectionCont.id = "grouped";

    const sectionHeader = buildElement("h4", "form-subsection-title");
    sectionHeader.textContent = "Group Details";

    const formRow = buildElement("div", "form-row");

    const taskGroupLabel = buildElement("label", "task-group-label", "add-tasks-label");
    taskGroupLabel.htmlFor = "task-group-input";

    const groupText = document.createTextNode("Group Name ");
    const groupInfo = buildImgElement(infoSvg, "Additional Information", "information-icon");

    taskGroupLabel.appendChild(groupText);
    taskGroupLabel.appendChild(groupInfo);

    const taskGroupInput = buildElement("input", "task-group-input", "add-tasks-input");
    taskGroupInput.id = "task-group-input";
    taskGroupInput.placeholder = "Group Name";
    taskGroupInput.maxLength = 30;

    const errorSpan = buildElement("span", "error-span", "invalid-group-name", "hide");
    errorSpan.textContent = "The group name you entered is invalid.";

    formRow.appendChild(taskGroupLabel);
    formRow.appendChild(taskGroupInput);
    formRow.appendChild(errorSpan);

    groupSectionCont.appendChild(sectionHeader);
    groupSectionCont.appendChild(formRow);

    cont.appendChild(groupSectionCont);

    return;
}

function addTasksDatedSection(cont) {
    const deadlineSectionCont = buildElement("div", "deadline-details-form-subsection", "hide");
    deadlineSectionCont.id = "dated";

    const sectionHeader = buildElement("h4", "form-subsection-title");
    sectionHeader.textContent = "Deadline Details";

    const formRow1 = buildElement("div", "form-row");
    const formRow2 = buildElement("div", "form-row");

    const taskDateLabel = buildElement("span", "task-date-label", "add-tasks-label");

    const dateText = document.createTextNode("Task Deadline ");
    const dateInfo = buildImgElement(infoSvg, "Additional Information", "information-icon");

    taskDateLabel.appendChild(dateText);
    taskDateLabel.appendChild(dateInfo);

    const dateInputGrid = buildElement("div", "task-date-input-grid", "date-input-grid");

    const dayInput = buildElement("input", "add-tasks-date-input", "add-tasks-day-input");
    const monthInput = buildElement("input", "add-tasks-date-input", "add-tasks-month-input");
    const yearInput = buildElement("input", "add-tasks-date-input", "add-tasks-year-input");

    dayInput.id = "add-tasks-day-input";
    monthInput.id = "add-tasks-month-input";
    yearInput.id = "add-tasks-year-input";

    dayInput.placeholder = "DD";
    monthInput.placeholder = "MM";
    yearInput.placeholder = "YYYY";

    dayInput.maxLength = 2;
    monthInput.maxLength = 2;
    yearInput.maxLength = 4;

    dateInputGrid.appendChild(dayInput);
    dateInputGrid.appendChild(monthInput);
    dateInputGrid.appendChild(yearInput);

    const errorSpan1 = buildElement("span", "error-span", "invalid-deadline", "hide");
    errorSpan1.textContent = "The deadline you entered is invalid.";

    formRow1.appendChild(taskDateLabel);
    formRow1.appendChild(dateInputGrid);
    formRow1.appendChild(errorSpan1);

    const taskAllDayLabel = buildElement("label", "task-all-day-label", "add-tasks-label");
    taskAllDayLabel.htmlFor = "task-all-day-input";

    const allDayText = document.createTextNode("All Day ");
    const allDayInfo = buildImgElement(infoSvg, "Additional Information", "information-icon");

    taskAllDayLabel.appendChild(allDayText);
    taskAllDayLabel.appendChild(allDayInfo);

    const allDayInputCont = buildElement("div", "all-day-input-cont");

    const taskTimeInputGrid = buildElement("div", "task-time-input-grid", "date-input-grid");

    const hourInput = buildElement("input", "add-tasks-date-input", "add-tasks-hour-input");
    const minuteInput = buildElement("input", "add-tasks-date-input", "add-tasks-minute-input");
    
    hourInput.id = "add-tasks-hour-input";
    minuteInput.id = "add-tasks-minute-input";

    hourInput.placeholder = "HH";
    minuteInput.placeholder = "MM";

    hourInput.maxLength = 2;
    minuteInput.maxLength = 2;

    taskTimeInputGrid.appendChild(hourInput);
    taskTimeInputGrid.appendChild(minuteInput);

    const taskTimeToggleSwitch = buildElement("label", "toggle-switch-label");
    const toggleSwitchInput = buildElement("input", "toggle-switch-input", "task-all-day-input");
    toggleSwitchInput.type = "checkbox";
    toggleSwitchInput.id = "task-all-day-input";
    const toggleSwitchSpan = buildElement("span", "toggle-switch-slider");
    
    taskTimeToggleSwitch.appendChild(toggleSwitchInput);
    taskTimeToggleSwitch.appendChild(toggleSwitchSpan);

    allDayInputCont.appendChild(taskTimeInputGrid);
    allDayInputCont.appendChild(taskTimeToggleSwitch);

    const errorSpan2 = buildElement("span", "error-span", "invalid-time", "hide");
    errorSpan2.textContent = "The time you entered is invalid.";

    formRow2.appendChild(taskAllDayLabel);
    formRow2.appendChild(allDayInputCont);
    formRow2.appendChild(errorSpan2);

    deadlineSectionCont.appendChild(sectionHeader);
    deadlineSectionCont.appendChild(formRow1);
    deadlineSectionCont.appendChild(formRow2);

    cont.appendChild(deadlineSectionCont);

    return;
}

function primaryDetailsSection(modalForm) {
    const sectionHeader = buildElement("h4", "form-subsection-title");
    sectionHeader.textContent = "Primary Details";

    const formRow1 = buildElement("div", "form-row");
    const formRow2 = buildElement("div", "form-row");
    const formRow3 = buildElement("div", "form-row");
    const formRow4 = buildElement("div", "form-row");

    const taskNameLabel = buildElement("label", "task-name-label", "add-tasks-label");
    taskNameLabel.htmlFor = "task-name-input";
    taskNameLabel.textContent = "Task Name";

    const taskNameInput = buildElement("input", "task-name-input", "add-tasks-input");
    taskNameInput.id = "task-name-input";
    taskNameInput.placeholder = "Task Name";
    taskNameInput.maxLength = 30;

    const errorSpan = buildElement("span", "error-span", "invalid-name", "hide");
    errorSpan.textContent = "Select a name between 1 and 30 characters, and without any special characters (apart from spaces and dashes).";

    formRow1.appendChild(taskNameLabel);
    formRow1.appendChild(taskNameInput);
    formRow1.appendChild(errorSpan)

    const taskDescriptionLabel = buildElement("label", "task-description-label", "add-tasks-label");
    taskDescriptionLabel.htmlFor = "task-description-input";
    taskDescriptionLabel.textContent = "Task Description";

    const taskDescriptionInput = buildElement("textarea", "task-description-input", "add-tasks-input");
    taskDescriptionInput.id = "task-description-input";
    
    formRow2.appendChild(taskDescriptionLabel);
    formRow2.appendChild(taskDescriptionInput);

    const taskPriorityLabel = buildElement("label", "task-priority-label", "add-tasks-label");
    taskPriorityLabel.htmlFor = "task-priority-input";
    taskPriorityLabel.textContent = "Task Priority";

    const taskPriorityInputCont = buildSelectElement("task-priority-input", ["1", "1 (Lowest Priority)"], ["2", "2"], ["3", "3 (Highest Priority"]);

    formRow3.appendChild(taskPriorityLabel);
    formRow3.appendChild(taskPriorityInputCont);

    const taskTypeLabel = buildElement("label", "task-type-label", "add-tasks-label");
    taskTypeLabel.htmlFor = "task-type-input";

    const typeText = document.createTextNode("Task Type ");
    const typeInfo = buildImgElement(infoSvg, "Additional Information", "information-icon");

    taskTypeLabel.appendChild(typeText);
    taskTypeLabel.appendChild(typeInfo);

    const taskTypeInputCont = buildSelectElement("task-type-input", ["basic", "Basic"], ["grouped", "Grouped"],
        ["dated", "Dated"], ["datedGrouped", "Dated & Grouped"], ["repetitive", "Repetitive"], ["repetitiveGrouped", "Repetitive & Grouped"]);

    formRow4.appendChild(taskTypeLabel);
    formRow4.appendChild(taskTypeInputCont);

    modalForm.appendChild(sectionHeader);
    modalForm.appendChild(formRow1);
    modalForm.appendChild(formRow2);
    modalForm.appendChild(formRow3);
    modalForm.appendChild(formRow4);

    return;
}

export function addTasksForm() {
    const modalForm = buildElement("form", "add-tasks-form");

    primaryDetailsSection(modalForm);

    const taskTypesSections = buildElement("div", "task-type-form-subsection");
    addTasksGroupedSection(taskTypesSections);
    addTasksDatedSection(taskTypesSections);
    addTasksRepetitiveSection(taskTypesSections);

    modalForm.appendChild(taskTypesSections);

    return modalForm;
}