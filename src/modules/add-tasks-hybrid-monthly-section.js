import { buildElement, hide, buildSelectElement, buildImgElement } from "./dom-manipulator.js";

import infoSvg from "../images/More-information.svg";

function repetitionTypeRow(cont) {
    const repetitionTypeCont = buildElement("div", "hybrid-monthly-repetition-type-row");

    const specificOccurrenceSelect = buildElement("div", "repetition-type-cont");
    const endOfMonthSelect = buildElement("div", "repetition-type-cont");

    const occurrenceLabel = buildElement("label", "task-specific-occurrence-option-label", "add-tasks-label");
    occurrenceLabel.htmlFor = "task-specific-occurrence-option-input";
    
    const occurrenceText = document.createTextNode("Specific Occurrence ");
    const occurrenceInfo = buildImgElement(infoSvg, "Additional Information", "information-icon");
        
    occurrenceLabel.appendChild(occurrenceText);
    occurrenceLabel.appendChild(occurrenceInfo);

    const toggleSwitchLabel1 = buildElement("label", "toggle-switch-label");

    const toggleSwitchInput1 = buildElement("input", "toggle-switch-input", "task-specific-occurrence-option-input");
    toggleSwitchInput1.type = "checkbox";
    toggleSwitchInput1.id = "task-specific-occurrence-option-input";

    const toggleSwitchSpan1 = buildElement("span", "toggle-switch-slider");

    toggleSwitchLabel1.appendChild(toggleSwitchInput1);
    toggleSwitchLabel1.appendChild(toggleSwitchSpan1);

    specificOccurrenceSelect.appendChild(occurrenceLabel);
    specificOccurrenceSelect.appendChild(toggleSwitchLabel1);

    const endOfMonthLabel = buildElement("label", "task-end-of-month-option-label", "add-tasks-label");
    endOfMonthLabel.htmlFor = "task-end-of-month-option-input";
    
    const endOfMonthText = document.createTextNode("End of Month ");
    const endOfMonthInfo = buildImgElement(infoSvg, "Additional Information", "information-icon");
        
    endOfMonthLabel.appendChild(endOfMonthText);
    endOfMonthLabel.appendChild(endOfMonthInfo);
    
    const toggleSwitchLabel2 = buildElement("label", "toggle-switch-label");

    const toggleSwitchInput2 = buildElement("input", "toggle-switch-input", "task-end-of-month-option-input");
    toggleSwitchInput2.type = "checkbox";
    toggleSwitchInput2.id = "task-end-of-month-option-input";

    const toggleSwitchSpan2 = buildElement("span", "toggle-switch-slider");

    toggleSwitchLabel2.appendChild(toggleSwitchInput2);
    toggleSwitchLabel2.appendChild(toggleSwitchSpan2);

    endOfMonthSelect.appendChild(endOfMonthLabel);
    endOfMonthSelect.appendChild(toggleSwitchLabel2);

    repetitionTypeCont.appendChild(specificOccurrenceSelect);
    repetitionTypeCont.appendChild(endOfMonthSelect);

    const errorSpan = buildElement("span", "error-span", "invalid-hybrid-monthly-selection", "hide");
    errorSpan.textContent = "Please select an option.";

    cont.appendChild(repetitionTypeCont);
    cont.appendChild(errorSpan);

    return;
}

function specificOccurrenceRow(cont) {
    const specificOccurrenceCont = buildElement("div", "hybrid-monthly-specific-occurrence-row", "hide");

    const formRow = buildElement("div", "form-row");

    const occurrenceLabel = buildElement("label", "task-specific-occurrence-more-label", "add-tasks-label");
    occurrenceLabel.textContent = "Additional Details";

    const inputCont1 = buildElement("div", "hybrid-monthly-input-cont");
    const inputCont2 = buildElement("div", "hybrid-monthly-input-cont");

    const paragraph1 = buildElement("p", "hybrid-monthly-pattern-paragraph");
    const paragraph2 = buildElement("p", "hybrid-monthly-pattern-paragraph");
    const paragraph3 = buildElement("p", "hybrid-monthly-pattern-paragraph");
    paragraph1.textContent = "Repeat on the";
    paragraph2.textContent = "Every";
    paragraph3.textContent = "months.";

    const selectCont1 = buildSelectElement("task-specific-occurrence-input",
        ["1", "First"], ["2", "Second"], ["3", "Third"], ["4", "Fourth"], ["f", "Final"]);
    selectCont1.classList.add("in-row");
    const selectCont2 = buildSelectElement("task-specific-day-input",
        ["1", "Monday"], ["2", "Tuesday"], ["3", "Wednesday"], ["4", "Thursday"], ["5", "Friday"], ["6", "Saturday"], ["0", "Sunday"]);
    selectCont2.classList.add("in-row");

    inputCont1.appendChild(paragraph1);
    inputCont1.appendChild(selectCont1);
    inputCont1.appendChild(selectCont2);

    const frequencyInput = buildElement("input", "task-hybrid-monthly-specific-frequency-input", "add-tasks-input");
    frequencyInput.type = "number";
    frequencyInput.placeholder = "X";
    frequencyInput.id = "task-hybrid-monthly-specific-frequency-input";
    frequencyInput.min = 1;

    inputCont2.appendChild(paragraph2);
    inputCont2.appendChild(frequencyInput);
    inputCont2.appendChild(paragraph3);

    const errorSpan = buildElement("span", "error-span", "invalid-hybrid-monthly-frequency", "hide");
    errorSpan.textContent = "The value you entered is invalid.";

    formRow.appendChild(occurrenceLabel);
    formRow.appendChild(inputCont1);
    formRow.appendChild(inputCont2);
    formRow.appendChild(errorSpan);

    specificOccurrenceCont.appendChild(formRow);

    cont.appendChild(specificOccurrenceCont);

    return;
}

function endOfMonthRow(cont) {
    const endOfMonthCont = buildElement("div", "hybrid-monthly-end-of-month-row", "hide");

    const endOfMonthLabel = buildElement("label", "task-end-of-month-more-label", "add-tasks-label");
    endOfMonthLabel.textContent = "Additional Details";

    const inputCont = buildElement("div", "hybrid-monthly-input-cont");

    const paragraph1 = buildElement("p", "hybrid-monthly-pattern-paragraph");
    const paragraph2 = buildElement("p", "hybrid-monthly-pattern-paragraph");
    paragraph1.textContent = "Repeat every";
    paragraph2.textContent = "months.";

    const frequencyInput = buildElement("input", "task-hybrid-monthly-end-frequency-input", "add-tasks-input");
    frequencyInput.type = "number";
    frequencyInput.placeholder = "X";
    frequencyInput.id = "task-hybrid-monthly-end-frequency-input";
    frequencyInput.min = 1;

    inputCont.appendChild(paragraph1);
    inputCont.appendChild(frequencyInput);
    inputCont.appendChild(paragraph2);

    const errorSpan = buildElement("span", "error-span", "invalid-hybrid-monthly-end", "hide");
    errorSpan.textContent = "The value you entered is invalid.";

    endOfMonthCont.appendChild(endOfMonthLabel);
    endOfMonthCont.appendChild(inputCont);
    endOfMonthCont.appendChild(errorSpan);

    cont.appendChild(endOfMonthCont);

    return;
}

export function hybridMonthlyPatternSection(cont) {

    const monthlyPatternSectionCont = buildElement("div", "hybrid-monthly-pattern-details-form-subsection", "hide");
    repetitionTypeRow(monthlyPatternSectionCont);
    specificOccurrenceRow(monthlyPatternSectionCont);
    endOfMonthRow(monthlyPatternSectionCont);

    cont.appendChild(monthlyPatternSectionCont);

    return;
}