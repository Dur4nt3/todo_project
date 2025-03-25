import { addTasksModal } from "./add-tasks-modal.js";
import { buildElement, show, hide } from "./dom-manipulator.js";
import { determineTaskType } from "./task-utility-functions.js";
import { formatTaskType, getTaskDateObject } from "./misc-utilities.js";

function populateBasicDetails(modalCont, taskObj) {
    modalCont.querySelector(".task-name-input").value = taskObj.title;
    modalCont.querySelector(".task-description-input").value = taskObj.description;

    const prioritySelect = Array.from(modalCont.querySelector(".task-priority-input").children);
    for (let i in prioritySelect) {
        if (Number(prioritySelect[i].value) === taskObj.priority) {
            prioritySelect[i].selected = true;
        }
    }

    return;
}

function populateGroupDetails(modalCont, taskObj) {
    modalCont.querySelector(".task-group-input").value = taskObj.group;
}

function populateDeadlineDetails(modalCont, taskObj) {
    const dateObject = getTaskDateObject(taskObj.deadline);

    modalCont.querySelector(".add-tasks-day-input").value = dateObject.day;
    modalCont.querySelector(".add-tasks-month-input").value = dateObject.month;
    modalCont.querySelector(".add-tasks-year-input").value = dateObject.year;

    let hourInput = modalCont.querySelector(".add-tasks-hour-input");
    let minuteInput = modalCont.querySelector(".add-tasks-minute-input");

    if (taskObj.allDay) {
        modalCont.querySelector(".task-all-day-input").checked = true;
        hourInput.disabled = true;
        minuteInput.disabled = true;
        return;
    }
    else {
        hourInput.value = dateObject.hours;
        minuteInput.value = dateObject.minutes;
    }

    return;
}

function populateTimePatternDetails(modalCont, taskObj) {
    const period = Object.keys(taskObj.repetitionValue);
    const frequency = taskObj.repetitionValue[period];

    modalCont.querySelector(".task-time-pattern-input").value = frequency;

    const periodValue = period[0]

    const periodSelect = Array.from(modalCont.querySelector(".task-time-type-input").children);
    for (let i in periodSelect) {
        if (periodSelect[i].value === periodValue) {
            periodSelect[i].selected = true;
        }
    }

    return;
}

function populateDayPatternDetails(modalCont, taskObj) {
    const daySelect = Array.from(modalCont.querySelector(".day-pattern-input-cont").children);

    for (let i in daySelect) {
        if (taskObj.repetitionValue.includes(Number(daySelect[i].id))) {
            daySelect[i].classList.add("selected-day");
        }
    }

    return;
}

function populateHybridWeeklyPatternDetails(modalCont, taskObj) {
    const repetitionDays = taskObj.repetitionValue[0];
    const daySelect = Array.from(modalCont.querySelector(".hybrid-weekly-days-input-cont").children);

    for (let i in daySelect) {
        if (repetitionDays.includes(Number(daySelect[i].id))) {
            daySelect[i].classList.add("selected-day");
        }
    }

    const frequency = taskObj.repetitionValue[1]["weeks"];

    modalCont.querySelector(".task-hybrid-weekly-frequency-input").value = frequency;

    return;
}

function populateHybridMonthlyPatternDetails(modalCont, taskObj) {
    if (taskObj.repetitionValue[0] === "e") {
        const frequency = taskObj.repetitionValue[1]["months"];
        modalCont.querySelector(".task-hybrid-monthly-end-frequency-input").value = frequency;
    }

    else {
        const occurrenceSelect = Array.from(modalCont.querySelector(".task-specific-occurrence-input").children);

        for (let i in occurrenceSelect) {
            if (occurrenceSelect[i].value === String(taskObj.repetitionValue[0])) {
                occurrenceSelect[i].selected = true;
            }
        }

        const daySelect = Array.from(modalCont.querySelector(".task-specific-day-input").children);

        for (let i in daySelect) {
            if (daySelect[i].value === String(taskObj.repetitionValue[1])) {
                daySelect[i].selected = true;
            }
        }

        const frequency = taskObj.repetitionValue[2]["months"];
        modalCont.querySelector(".task-hybrid-monthly-specific-frequency-input").value = frequency;
    }
}

function populateRepetitiveDetails(modalCont, taskObj) {
    switch (taskObj.repetitionPattern) {
        case "time":
            populateTimePatternDetails(modalCont, taskObj);
            break;
        
        case "day":
            populateDayPatternDetails(modalCont, taskObj);
            break;
        
        case "hybrid-weekly":
            populateHybridWeeklyPatternDetails(modalCont, taskObj);
            break;

        case "hybrid-monthly":
            populateHybridMonthlyPatternDetails(modalCont, taskObj);
            break;
    }
}

function populateInputFields(modalCont, taskObj) {
    const taskType = determineTaskType(taskObj);

    switch (taskType) {
        case "basic":
            populateBasicDetails(modalCont, taskObj);
            break;
        
        case "grouped":
            populateBasicDetails(modalCont, taskObj);
            populateGroupDetails(modalCont, taskObj);
            break;
        
        case "dated":
            populateBasicDetails(modalCont, taskObj);
            populateDeadlineDetails(modalCont, taskObj);
            break;

        case "datedGrouped":
            populateBasicDetails(modalCont, taskObj);
            populateDeadlineDetails(modalCont, taskObj);
            populateGroupDetails(modalCont, taskObj);
            break;

        case "repetitive":
            populateBasicDetails(modalCont, taskObj);
            populateDeadlineDetails(modalCont, taskObj);
            populateRepetitiveDetails(modalCont, taskObj);
            break;

        case "repetitiveGrouped":
            populateBasicDetails(modalCont, taskObj);
            populateDeadlineDetails(modalCont, taskObj);
            populateGroupDetails(modalCont, taskObj);
            populateRepetitiveDetails(modalCont, taskObj);
            break;
    }
}

function showRepetitiveTypeSection(modalCont, repetitionPattern, repetitionValue) {
    hide(modalCont.querySelector(".time-pattern-details-form-subsection"));

    const patternSelect = Array.from(modalCont.querySelector(".task-repetition-pattern-input").children);
    for (let i in patternSelect) {
        if (patternSelect[i].value === repetitionPattern) {
            patternSelect[i].selected = true;
        }
    }

    switch (repetitionPattern) {
        case "time":
            show(modalCont.querySelector(".time-pattern-details-form-subsection"));
            break;
        
        case "day":
            show(modalCont.querySelector(".day-pattern-details-form-subsection"));
            break;
        
        case "hybrid-weekly":
            show(modalCont.querySelector(".hybrid-weekly-pattern-details-form-subsection"));
            break;

        case "hybrid-monthly":
            show(modalCont.querySelector(".hybrid-monthly-pattern-details-form-subsection"));
            if (repetitionValue[0] === "e") {
                modalCont.querySelector(".task-end-of-month-option-input").checked = true;
                show(modalCont.querySelector(".hybrid-monthly-end-of-month-row"));
            }
            else {
                modalCont.querySelector(".task-specific-occurrence-option-input").checked = true;
                show(modalCont.querySelector(".hybrid-monthly-specific-occurrence-row"));
            }

            break;
    }
}

function showTypeSection(modalCont, taskType, taskObj) {
    switch (taskType) {
        case "basic":
            break;
        
        case "grouped":
            show(modalCont.querySelector(".group-details-form-subsection"));
            break;
        
        case "dated":
            show(modalCont.querySelector(".deadline-details-form-subsection"));
            break;

        case "datedGrouped":
            show(modalCont.querySelector(".deadline-details-form-subsection"));
            show(modalCont.querySelector(".group-details-form-subsection"));
            break;

        case "repetitive":
            show(modalCont.querySelector(".deadline-details-form-subsection"));
            show(modalCont.querySelector(".repetitive-details-form-subsection"));
            showRepetitiveTypeSection(modalCont, taskObj.repetitionPattern, taskObj.repetitionValue);
            break;

        case "repetitiveGrouped":
            show(modalCont.querySelector(".deadline-details-form-subsection"));
            show(modalCont.querySelector(".group-details-form-subsection"));
            show(modalCont.querySelector(".repetitive-details-form-subsection"));
            showRepetitiveTypeSection(modalCont, taskObj.repetitionPattern, taskObj.repetitionValue);
            break;
    }

    return;
}

function alterAddModal(modalCont, taskObj) {
    modalCont.querySelector(".modal-cont").classList.remove("add-tasks-modal");
    modalCont.querySelector(".modal-cont").classList.add("edit-tasks-modal");

    modalCont.querySelector(".modal-title").textContent = "Modify Task:";

    const taskTypeSelectCont = modalCont.querySelector(".task-type-input").parentNode;
    const taskTypeRow = taskTypeSelectCont.parentNode;
    taskTypeSelectCont.remove();
    taskTypeRow.lastChild.removeAttribute("for");
    
    const taskTypePlaceholder = buildElement("p", "task-type-placeholder");
    taskTypePlaceholder.textContent = formatTaskType(determineTaskType(taskObj));

    taskTypeRow.appendChild(taskTypePlaceholder);

    showTypeSection(modalCont, determineTaskType(taskObj), taskObj);

    modalCont.querySelector(".confirm-button").textContent = "Edit";
}

export function editTasksModal(taskObj) {
    const editTaskModal = addTasksModal();

    alterAddModal(editTaskModal, taskObj);
    populateInputFields(editTaskModal, taskObj);

    return editTaskModal;
}

export function adjustUnlistedEntry(taskDataObj) {
    if (taskDataObj.group !== undefined) {
        if (taskDataObj.group === "") {
            taskDataObj.group = ["__unlisted__"];
        }
    }

    return;
}