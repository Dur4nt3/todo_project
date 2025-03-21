// This module takes a task creation/edit form and compiles all the data in the form into an object
// That object is then used to format the data before validation

function collectRepetitionValueData(modalCont) {
    const timePattern = { frequency: modalCont.querySelector(".task-time-pattern-input").value,
        period: modalCont.querySelector(".task-time-type-input").value  };

    const dayPatternSelections = Array.from(modalCont.querySelector(".day-pattern-input-cont").children);

    const dayPattern = []

    for (let i in dayPatternSelections) {
        if (dayPatternSelections[i].classList.contains("selected-day")) {
            dayPattern.push(dayPatternSelections[i].id);
        }
    }

    const weeklyPatternSelections = Array.from(modalCont.querySelector(".hybrid-weekly-days-input-cont").children);

    const weeklyPatternDays = [];

    for (let i in weeklyPatternSelections) {
        if (weeklyPatternSelections[i].classList.contains("selected-day")) {
            weeklyPatternDays.push(weeklyPatternSelections[i].id);
        }
    }

    const weeklyPattern = { days: weeklyPatternDays, frequency: modalCont.querySelector(".task-hybrid-weekly-frequency-input").value };

    const monthlyPattern = { 
        occurrence: modalCont.querySelector(".task-specific-occurrence-option-input").checked, 
        end: modalCont.querySelector(".task-end-of-month-option-input").checked,
        specificOccurrence: modalCont.querySelector(".task-specific-occurrence-input").value,
        occurrenceDay: modalCont.querySelector(".task-specific-day-input").value,
        occurrenceFrequency: modalCont.querySelector(".task-hybrid-monthly-specific-frequency-input").value,
        endFrequency: modalCont.querySelector(".task-hybrid-monthly-end-frequency-input").value 
    };

    return { time: timePattern, day: dayPattern, "hybrid-weekly": weeklyPattern, "hybrid-monthly": monthlyPattern };
}

export function collectAddTasksFormData(modalCont) {
    const taskName = modalCont.querySelector(".task-name-input").value;
    const taskDescription = modalCont.querySelector(".task-description-input").value;
    const taskPriority = modalCont.querySelector(".task-priority-input").value;

    const taskGroup = modalCont.querySelector(".task-group-input").value;

    const taskDeadline = { day: modalCont.querySelector(".add-tasks-day-input").value,
        month: modalCont.querySelector(".add-tasks-month-input").value, year: modalCont.querySelector(".add-tasks-year-input").value };
    const allDay = modalCont.querySelector(".task-all-day-input").checked
    const taskTime = { hours: modalCont.querySelector(".add-tasks-hour-input").value, minutes: modalCont.querySelector(".add-tasks-minute-input").value };

    const repetitionPattern = modalCont.querySelector(".task-repetition-pattern-input").value

    const repetitionValue = collectRepetitionValueData(modalCont);

    return { name: taskName, description: taskDescription, priority: taskPriority, 
        group: taskGroup, deadline: taskDeadline, allDay: allDay, time: taskTime,
        repetitionPattern: repetitionPattern, repetitionValue: repetitionValue};
}