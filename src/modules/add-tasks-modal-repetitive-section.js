import { buildElement, buildSelectElement, buildImgElement } from "./dom-manipulator.js";
import { hybridMonthlyPatternSection } from "./add-tasks-hybrid-monthly-section.js";

import infoSvg from "../images/More-information.svg";

// This module creates the repetitive task section of the form for the "add tasks" feature

function timePatternSection(cont) {
    const timePatternSectionCont = buildElement("div", "time-pattern-details-form-subsection");

    const formRow = buildElement("div", "form-row");

    const repetitionFrequencyLabel = buildElement("label", "task-time-pattern-label", "add-tasks-label");
    repetitionFrequencyLabel.htmlFor = "task-time-pattern-input";
    
    const frequencyText = document.createTextNode("Frequency ");
    const frequencyInfo = buildImgElement(infoSvg, "Additional Information", "information-icon");
    
    repetitionFrequencyLabel.appendChild(frequencyText);
    repetitionFrequencyLabel.appendChild(frequencyInfo);

    const timePatternInputCont = buildElement("div", "time-pattern-input-cont");

    const paragraph = buildElement("p", "time-pattern-paragraph");
    paragraph.textContent = "Repeat every";

    const timePatternInput = buildElement("input", "task-time-pattern-input", "add-tasks-input");
    timePatternInput.type = "number";
    timePatternInput.placeholder = "X";
    timePatternInput.id = "task-time-pattern-input";
    timePatternInput.min = 1;

    const frequencySelect = buildSelectElement("task-time-type-input", ["hours", "Hour/s"],
        ["days", "Day/s"], ["weeks", "Week/s"], ["months", "Month/s"], ["years", "Year/s"]);
    frequencySelect.classList.add("in-row");

    timePatternInputCont.appendChild(paragraph);
    timePatternInputCont.appendChild(timePatternInput);
    timePatternInputCont.appendChild(frequencySelect);

    const errorSpan1 = buildElement("span", "error-span", "invalid-time-pattern", "hide");
    errorSpan1.textContent = "The value you entered is invalid.";

    const errorSpan2 = buildElement("span", "error-span", "hourly-and-all-day-error", "hide");
    errorSpan2.textContent = "All-day tasks cannot repeat on an hourly basis.";

    formRow.appendChild(repetitionFrequencyLabel);
    formRow.appendChild(timePatternInputCont);
    formRow.appendChild(errorSpan1);
    formRow.appendChild(errorSpan2);

    timePatternSectionCont.appendChild(formRow);

    cont.appendChild(timePatternSectionCont);

    return;
}

function dayPatternSection(cont) {
    const dayPatternSectionCont = buildElement("div", "day-pattern-details-form-subsection", "hide");

    const formRow = buildElement("div", "form-row");

    const repetitionDayLabel = buildElement("label", "task-day-pattern-label", "add-tasks-label");
    
    const dayText = document.createTextNode("Repeat Days ");
    const dayInfo = buildImgElement(infoSvg, "Additional Information", "information-icon");
    
    repetitionDayLabel.appendChild(dayText);
    repetitionDayLabel.appendChild(dayInfo);

    const dayPatternInputCont = buildElement("div", "day-pattern-input-cont");

    const select1 = buildElement("p", "select-day-input");
    const select2 = buildElement("p", "select-day-input");
    const select3 = buildElement("p", "select-day-input");
    const select4 = buildElement("p", "select-day-input");
    const select5 = buildElement("p", "select-day-input");
    const select6 = buildElement("p", "select-day-input");
    const select0 = buildElement("p", "select-day-input");

    select1.id = "1";
    select1.textContent = "M";
    select2.id = "2";
    select2.textContent = "T";
    select3.id = "3";
    select3.textContent = "W";
    select4.id = "4";
    select4.textContent = "T";
    select5.id = "5";
    select5.textContent = "F";
    select6.id = "6";
    select6.textContent = "S";
    select0.id = "0";
    select0.textContent = "S";

    dayPatternInputCont.appendChild(select1);
    dayPatternInputCont.appendChild(select2);
    dayPatternInputCont.appendChild(select3);
    dayPatternInputCont.appendChild(select4);
    dayPatternInputCont.appendChild(select5);
    dayPatternInputCont.appendChild(select6);
    dayPatternInputCont.appendChild(select0);

    const errorSpan = buildElement("span", "error-span", "invalid-day-pattern", "hide");
    errorSpan.textContent = "Please select at least one day.";

    formRow.appendChild(repetitionDayLabel);
    formRow.appendChild(dayPatternInputCont);
    formRow.appendChild(errorSpan);

    dayPatternSectionCont.appendChild(formRow);

    cont.appendChild(dayPatternSectionCont);

    return;
}

function hybridWeeklyPatternSection(cont) {
    const weeklyPatternSectionCont = buildElement("div", "hybrid-weekly-pattern-details-form-subsection", "hide");

    const formRow1 = buildElement("div", "form-row");
    const formRow2 = buildElement("div", "form-row");

    const daysLabel = buildElement("label", "task-hybrid-weekly-days-label", "add-tasks-label");

    const daysText = document.createTextNode("Repeat Days ");
    const daysInfo = buildImgElement(infoSvg, "Additional Information", "information-icon");
    
    daysLabel.appendChild(daysText);
    daysLabel.appendChild(daysInfo);

    const daysPatternInputCont = buildElement("div", "hybrid-weekly-days-input-cont");

    const select1 = buildElement("p", "select-day-input");
    const select2 = buildElement("p", "select-day-input");
    const select3 = buildElement("p", "select-day-input");
    const select4 = buildElement("p", "select-day-input");
    const select5 = buildElement("p", "select-day-input");
    const select6 = buildElement("p", "select-day-input");
    const select0 = buildElement("p", "select-day-input");

    select1.id = "1";
    select1.textContent = "M";
    select2.id = "2";
    select2.textContent = "T";
    select3.id = "3";
    select3.textContent = "W";
    select4.id = "4";
    select4.textContent = "T";
    select5.id = "5";
    select5.textContent = "F";
    select6.id = "6";
    select6.textContent = "S";
    select0.id = "0";
    select0.textContent = "S";

    daysPatternInputCont.appendChild(select1);
    daysPatternInputCont.appendChild(select2);
    daysPatternInputCont.appendChild(select3);
    daysPatternInputCont.appendChild(select4);
    daysPatternInputCont.appendChild(select5);
    daysPatternInputCont.appendChild(select6);
    daysPatternInputCont.appendChild(select0);

    const errorSpan = buildElement("span", "error-span", "invalid-hybrid-weekly-days", "hide");
    errorSpan.textContent = "Please select at least one day.";

    formRow1.appendChild(daysLabel);
    formRow1.appendChild(daysPatternInputCont);
    formRow1.appendChild(errorSpan);

    const frequencyLabel = buildElement("label", "task-hybrid-weekly-frequency-label", "add-tasks-label");

    const frequencyText = document.createTextNode("Frequency ");
    const frequencyInfo = buildImgElement(infoSvg, "Additional Information", "information-icon");
    
    frequencyLabel.appendChild(frequencyText);
    frequencyLabel.appendChild(frequencyInfo);

    const frequencyInputCont = buildElement("div", "hybrid-weekly-frequency-input-cont");

    const paragraph1 = buildElement("p", "hybrid-weekly-pattern-paragraph");
    const paragraph2 = buildElement("p", "hybrid-weekly-pattern-paragraph");

    paragraph1.textContent = "Repeat every";
    paragraph2.textContent = "weeks.";

    const frequencyInput = buildElement("input", "task-hybrid-weekly-frequency-input", "add-tasks-input");
    frequencyInput.type = "number";
    frequencyInput.placeholder = "X"
    frequencyInput.id = "task-hybrid-weekly-frequency-input";
    frequencyInput.min = 1;

    frequencyInputCont.appendChild(paragraph1);
    frequencyInputCont.appendChild(frequencyInput);
    frequencyInputCont.appendChild(paragraph2);

    const errorSpan2 = buildElement("span", "error-span", "invalid-hybrid-weekly-frequency", "hide");
    errorSpan2.textContent = "The value you entered is invalid.";

    formRow2.appendChild(frequencyLabel);
    formRow2.appendChild(frequencyInputCont);
    formRow2.appendChild(errorSpan2);

    weeklyPatternSectionCont.appendChild(formRow1);
    weeklyPatternSectionCont.appendChild(formRow2);

    cont.appendChild(weeklyPatternSectionCont);

    return;
}

export function addTasksRepetitiveSection(cont) {
    const repetitiveSectionCont = buildElement("div", "repetitive-details-form-subsection", "hide");
    repetitiveSectionCont.id = "repetitive";

    const sectionHeader = buildElement("h4", "form-subsection-title");
    sectionHeader.textContent = "Repetition Details";

    const formRow = buildElement("div", "form-row");

    const repetitionPatternLabel = buildElement("label", "task-repetition-pattern-label", "add-tasks-label");
    repetitionPatternLabel.htmlFor = "task-repetition-pattern-input";
    
    const patternText = document.createTextNode("Repetition Pattern ");
    const patternInfo = buildImgElement(infoSvg, "Additional Information", "information-icon");
    
    repetitionPatternLabel.appendChild(patternText);
    repetitionPatternLabel.appendChild(patternInfo);

    const repetitionPatternInputCont = buildSelectElement("task-repetition-pattern-input", ["time", "Time"],
        ["day", "Day"], ["hybrid-weekly", "Hybrid - Weekly"], ["hybrid-monthly", "Hybrid - Monthly"]);

    formRow.appendChild(repetitionPatternLabel);
    formRow.appendChild(repetitionPatternInputCont);

    repetitiveSectionCont.appendChild(sectionHeader);
    repetitiveSectionCont.appendChild(formRow);
    timePatternSection(repetitiveSectionCont);
    dayPatternSection(repetitiveSectionCont);
    hybridWeeklyPatternSection(repetitiveSectionCont);
    hybridMonthlyPatternSection(repetitiveSectionCont);

    cont.appendChild(repetitiveSectionCont);

    return;
}