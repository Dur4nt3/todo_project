import { show, hide } from "./dom-manipulator.js";

function basicErrors(validationData, modalCont) {
    if (validationData.includes("general")) {
        show(modalCont.querySelector(".modal-error"));
    }
    if (validationData.includes("name")) {
        show(modalCont.querySelector(".invalid-name"));
    }
}

function groupedErrors(validationData, modalCont) {
    basicErrors(validationData, modalCont);

    if (validationData.includes("group")) {
        show(modalCont.querySelector(".invalid-group-name"));
    }
}

function datedErrors(validationData, modalCont) {
    basicErrors(validationData, modalCont);

    if (validationData.includes("deadline")) {
        show(modalCont.querySelector(".invalid-deadline"));
    }

    if (validationData.includes("time")) {
        show(modalCont.querySelector(".invalid-time"));
    }
}

function datedGroupedErrors(validationData, modalCont) {
    groupedErrors(validationData, modalCont);
    datedErrors(validationData, modalCont);
}

function repetitiveErrors(validationData, modalCont) {
    datedErrors(validationData, modalCont);

    const repetitionPattern = modalCont.querySelector(".task-repetition-pattern-input").value;
    
    if (validationData.includes("hourlyAndAllDay")) {
        show(modalCont.querySelector(".hourly-and-all-day-error"));
    }


    if (validationData.includes("timePattern")) {
        if (repetitionPattern === "time") {
            show(modalCont.querySelector(".invalid-time-pattern"));
        }
        else if (repetitionPattern === "hybrid-weekly") {
            show(modalCont.querySelector(".invalid-hybrid-weekly-frequency"));
        }
        else if (repetitionPattern === "hybrid-monthly") {
            if (modalCont.querySelector(".task-specific-occurrence-option-input").checked === true) {
                show(modalCont.querySelector(".invalid-hybrid-monthly-frequency"));
            }
            else {
                show(modalCont.querySelector(".invalid-hybrid-monthly-end"));
            }
        }
    }

    if (validationData.includes("dayPattern")) {
        if (repetitionPattern === "day") {
            show(modalCont.querySelector(".invalid-day-pattern"));
        }
        else if (repetitionPattern === "hybrid-weekly") {
            show(modalCont.querySelector(".invalid-hybrid-weekly-days"));
        }
    }

    if (validationData.includes("hybridMonthlySelection")) {
        show(modalCont.querySelector(".invalid-hybrid-monthly-selection"));
    }
}

function repetitiveGroupedErrors(validationData, modalCont) {
    groupedErrors(validationData, modalCont);
    repetitiveErrors(validationData, modalCont);
}

function hideAllErrors(modalCont) {
    const errorSpans = Array.from(modalCont.querySelectorAll(".error-span"));

    for (let i in errorSpans) {
        hide(errorSpans[i]);
    }
}

export function displayAddTasksErrors(validationData, taskType, modalCont) {
    hideAllErrors(modalCont);

    switch (taskType) {
        case "basic":
            basicErrors(validationData, modalCont);
            return;
        
        case "grouped":
            groupedErrors(validationData, modalCont);
            return;

        case "dated":
            datedErrors(validationData, modalCont);
            return;

        case "datedGrouped":
            datedGroupedErrors(validationData, modalCont);
            return;

        case "repetitive":
            repetitiveErrors(validationData, modalCont);
            return;
            
        case "repetitiveGrouped":
            repetitiveGroupedErrors(validationData, modalCont);
            return;

        default:
            show(modalCont.querySelector(".modal-error"));
            return;
    }
}