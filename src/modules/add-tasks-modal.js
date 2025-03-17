import { buildElement, hide, show } from "./dom-manipulator.js";
import { addTasksForm } from "./add-tasks-modal-form.js";
import { se } from "date-fns/locale";

// This module creates the markup for the "add tasks" feature

export function addTasksModal() {
    const modalCont = buildElement("div", "modal");
    modalCont.tabIndex = 0;

    const addTasksModalCont = buildElement("div", "modal-cont", "add-tasks-modal");

    const modalTitle = buildElement("h2", "modal-title");
    modalTitle.textContent = "Create a New Task:";

    const modalForm = addTasksForm();

    const buttonCont = buildElement("div", "add-tasks-button-cont");

    const cancelButton = buildElement("button", "add-tasks-button", "cancel-button");
    const confirmButton = buildElement("button", "add-tasks-button", "confirm-button");

    cancelButton.textContent = "Cancel";
    confirmButton.textContent = "Create";

    buttonCont.appendChild(cancelButton);
    buttonCont.appendChild(confirmButton);

    const generalModalError = buildElement("span", "error-span", "modal-error", "hide");
    generalModalError.textContent = "An error occurred, select cancel and try again."

    addTasksModalCont.appendChild(modalTitle);
    addTasksModalCont.appendChild(modalForm);
    addTasksModalCont.appendChild(buttonCont);
    addTasksModalCont.appendChild(generalModalError);

    modalCont.appendChild(addTasksModalCont);

    return modalCont;
}

function hideOtherFormSections(modalCont) {
    const typeSubsection = modalCont.querySelector(".task-type-form-subsection");
    const allSubsections = Array.from(typeSubsection.children);

    for (let i in allSubsections) {
        hide(allSubsections[i]);
    }

    return;
}

export function revealTaskTypeFormSection(taskType, modalCont) {
    hideOtherFormSections(modalCont);

    const typeSubsection = modalCont.querySelector(".task-type-form-subsection");

    const allSubsections = Array.from(typeSubsection.children);
    const groupedSection = allSubsections[0];
    const datedSection = allSubsections[1];
    const repetitiveSection = allSubsections[2];

    switch (taskType) {
        case "basic":
            return;

        case "grouped":
            show(groupedSection);
            return;

        case "dated":
            show(datedSection);
            return;

        case "datedGrouped":
            show(datedSection);
            show(groupedSection);
            return;

        case "repetitive":
            show(datedSection);
            show(repetitiveSection);
            return;

        case "repetitiveGrouped":
            show(datedSection);
            show(groupedSection);
            show(repetitiveSection);
            return;

        default:
            return;
    }
}

export function allDayToggle(toggleSwitch) {
    const inputCont = toggleSwitch.parentNode.parentNode;

    const timeGrid = inputCont.querySelector(".task-time-input-grid");
    const timeInputs = Array.from(timeGrid.children);

    if (toggleSwitch.checked === false) {
        for (let i in timeInputs) {
            timeInputs[i].disabled = false;
        }
        return;
    }
    else if (toggleSwitch.checked === true) {
        for (let i in timeInputs) {
            timeInputs[i].disabled = true;
        }
        return;
    }
}

function hideRepetitiveSubsections(modalCont) {
    const repetitivePatternSection = modalCont.querySelector(".repetitive-details-form-subsection");

    const sectionChildren = Array.from(repetitivePatternSection.children);

    for (let i in sectionChildren) {
        let sectionClass = sectionChildren[i].classList[0];

        if (!(sectionClass.includes("form-subsection"))) {
            continue;
        }

        hide(sectionChildren[i]);
    }

}

export function revealRepetitivePatternSection(patternType, modalCont) {
    hideRepetitiveSubsections(modalCont);

    const repetitivePatternSection = modalCont.querySelector(".repetitive-details-form-subsection");

    const sectionChildren = Array.from(repetitivePatternSection.children);
    const timeSection = sectionChildren[2];
    const daySection = sectionChildren[3];
    const weeklySection = sectionChildren[4];
    const monthlySection = sectionChildren[5];

    switch (patternType) {
        case "time":
            show(timeSection);
            return;

        case "day":
            show(daySection);
            return;

        case "hybrid-weekly":
            show(weeklySection);
            return;

        case "hybrid-monthly":
            show(monthlySection);
            return;

        default:
            return;
    }
}

export function toggleSelectDayInput(dayInput) {
    if (dayInput.classList.contains("selected-day")) {
        dayInput.classList.remove("selected-day");
        return;
    }
    else {
        dayInput.classList.add("selected-day");
        return;
    }
}

function hybridMonthlyTypeToggleSwitch(type, modalCont) {
    const hybridMonthlySection = modalCont.querySelector(".hybrid-monthly-pattern-details-form-subsection");

    const repetitionTypeRow = hybridMonthlySection.querySelector(".hybrid-monthly-repetition-type-row");

    const specificSwitch = repetitionTypeRow.children[0].lastChild.querySelector(".task-specific-occurrence-option-input");
    const endSwitch = repetitionTypeRow.children[1].lastChild.querySelector(".task-end-of-month-option-input");

    if (type === "specific") {
        endSwitch.checked = false;
        return;
    }
    else if (type === "end") {
        specificSwitch.checked = false;
        return;
    }
}

function hideHybridMonthlyTypeSections(modalCont) {
    const hybridMonthlySection = modalCont.querySelector(".hybrid-monthly-pattern-details-form-subsection");

    hide(hybridMonthlySection.querySelector(".hybrid-monthly-specific-occurrence-row"));
    hide(hybridMonthlySection.querySelector(".hybrid-monthly-end-of-month-row"));
}

export function revealHybridMonthlyTypeSection(type, modalCont) {
    hybridMonthlyTypeToggleSwitch(type, modalCont);
    hideHybridMonthlyTypeSections(modalCont);

    const hybridMonthlySection = modalCont.querySelector(".hybrid-monthly-pattern-details-form-subsection");

    if (type === "specific") {
        show(hybridMonthlySection.querySelector(".hybrid-monthly-specific-occurrence-row"));
        return;
    }
    else if (type === "end") {
        show(hybridMonthlySection.querySelector(".hybrid-monthly-end-of-month-row"));
        return;
    }
}

