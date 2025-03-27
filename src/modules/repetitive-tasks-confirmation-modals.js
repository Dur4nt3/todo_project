import { buildElement } from "./dom-manipulator.js";
import { capitalizeFirstLetter, getTaskDateTextFormat, formatTime } from "./misc-utilities.js";

export function informationChangeModal(title, changes) {
    const hideBelow = buildElement("div", "hide-below");
    const confirmationModal = buildElement("div", "extra-confirmation-modal", "repetitive-changes-confirmation-modal");

    const modalTitle = buildElement("h3", "confirmation-modal-title");
    modalTitle.textContent = "Details Change Scope:";

    const paragraph1 = buildElement("p", "confirmation-paragraph");
    const paragraph2 = buildElement("p", "confirmation-paragraph");
    const paragraph3 = buildElement("p", "confirmation-paragraph");
    const paragraph4 = buildElement("p", "confirmation-paragraph");
    const paragraph5 = buildElement("p", "confirmation-paragraph");

    const p1text1 = document.createTextNode("You've chosen to change the following details for the ");
    const p1text2 = document.createTextNode(" task:");
    const p1span = buildElement("span", "task-title-span", "enlarge-text");
    p1span.textContent = title;

    paragraph1.appendChild(p1text1);
    paragraph1.appendChild(p1span);
    paragraph1.appendChild(p1text2);

    const p2span = buildElement("span", "selected-changes", "enlarge-text");
    for (let i in changes) {
        if (i == (changes.length - 1)) {
            p2span.textContent += capitalizeFirstLetter(changes[i]) + ".";
            break;
        }

        p2span.textContent += capitalizeFirstLetter(changes[i]) + ", ";
    }

    paragraph2.appendChild(p2span);

    paragraph3.textContent = "As this is a repetitive task, you can choose to apply these changes to this task only or to all tasks within the cluster.";
    paragraph4.textContent = "If any changes were made to the repetition pattern and/or value, they were already applied.";
    paragraph5.textContent = "Please select the scope of the changes.";

    const buttonCont = buildElement("div", "repetitive-changes-button-cont");

    const cancelButton = buildElement("button", "repetitive-changes-button", "cancel-button");
    const thisTaskButton = buildElement("button", "repetitive-changes-button", "this-task-button");
    const allTasksButton = buildElement("button", "repetitive-changes-button", "all-tasks-button");

    cancelButton.textContent = "Cancel";
    thisTaskButton.textContent = "This Task Only";
    allTasksButton.textContent = "All Tasks";

    buttonCont.appendChild(cancelButton);
    buttonCont.appendChild(thisTaskButton);
    buttonCont.appendChild(allTasksButton);

    confirmationModal.appendChild(modalTitle);
    confirmationModal.appendChild(paragraph1);
    confirmationModal.appendChild(paragraph2);
    confirmationModal.appendChild(paragraph3);
    confirmationModal.appendChild(paragraph4);
    confirmationModal.appendChild(paragraph5);
    confirmationModal.appendChild(buttonCont);

    hideBelow.appendChild(confirmationModal)

    return hideBelow;
}

export function repetitiveDeletionConfirmation(title) {
    const confirmationModal = buildElement("div", "extra-confirmation-modal", "repetitive-deletion-confirmation-modal");

    const modalTitle = buildElement("h3", "confirmation-modal-title");
    modalTitle.textContent = "Deletion Scope:";

    const paragraph1 = buildElement("p", "confirmation-paragraph");
    const paragraph2 = buildElement("p", "confirmation-paragraph");
    const paragraph3 = buildElement("p", "confirmation-paragraph");

    const p1text1 = document.createTextNode("You've chosen to delete the task ");
    const p1span = buildElement("span", "task-title-span", "enlarge-text");
    p1span.textContent = title;

    paragraph1.appendChild(p1text1);
    paragraph1.appendChild(p1span);

    paragraph2.textContent = "As this is a repetitive task, you can choose to delete this task only or all tasks within the cluster.";
    paragraph3.textContent = "Please select the scope of the deletion.";

    const buttonCont = buildElement("div", "repetitive-deletion-button-cont");

    const cancelButton = buildElement("button", "repetitive-deletion-button", "cancel-button");
    const thisTaskButton = buildElement("button", "repetitive-deletion-button", "this-task-button");
    const allTasksButton = buildElement("button", "repetitive-deletion-button", "all-tasks-button");

    cancelButton.textContent = "Cancel";
    thisTaskButton.textContent = "This Task Only";
    allTasksButton.textContent = "All Tasks";

    buttonCont.appendChild(cancelButton);
    buttonCont.appendChild(thisTaskButton);
    buttonCont.appendChild(allTasksButton);

    confirmationModal.appendChild(modalTitle);
    confirmationModal.appendChild(paragraph1);
    confirmationModal.appendChild(paragraph2);
    confirmationModal.appendChild(paragraph3);
    confirmationModal.appendChild(buttonCont);

    return confirmationModal;
}

export function deadlineChangeModal(task) {
    const hideBelow = buildElement("div", "hide-below");
    const confirmationModal = buildElement("div", "extra-confirmation-modal", "repetitive-deadline-confirmation-modal");

    const modalTitle = buildElement("h3", "confirmation-modal-title");
    modalTitle.textContent = "Details Change Scope:";

    const paragraph1 = buildElement("p", "confirmation-paragraph");
    const paragraph2 = buildElement("p", "confirmation-paragraph");
    const paragraph3 = buildElement("p", "confirmation-paragraph");
    const paragraph4 = buildElement("p", "confirmation-paragraph");
    const paragraph5 = buildElement("p", "confirmation-paragraph");

    const p1text1 = document.createTextNode("You've chosen to change the deadline for the ");
    const p1text2 = document.createTextNode(" task to:");
    const p1span = buildElement("span", "task-title-span", "enlarge-text");
    p1span.textContent = task.name;

    paragraph1.appendChild(p1text1);
    paragraph1.appendChild(p1span);
    paragraph1.appendChild(p1text2);

    const p2span = buildElement("span", "task-deadline-span", "enlarge-text");
    p2span.textContent = getTaskDateTextFormat(task.deadline);
    // This means that a time is specified
    if (!(task.allDay)) {
        p2span.textContent += " at " + formatTime(task.timedDeadline);
    }

    paragraph2.appendChild(p2span);
    
    paragraph3.textContent = "As this is a repetitive task, changing this task's deadline will remove it from its cluster.";
    paragraph4.textContent = "This will not affect other tasks within the cluster nor the repetition pattern of the original task.";
    paragraph5.textContent = "Note that although the repetition pattern of the original task will persist, the next generated pool of tasks might be different.";

    const buttonCont = buildElement("div", "repetitive-deadline-button-cont");

    const cancelButton = buildElement("button", "repetitive-deadline-button", "cancel-button");
    const thisTaskButton = buildElement("button", "repetitive-deadline-button", "confirm-button");

    cancelButton.textContent = "Cancel";
    thisTaskButton.textContent = "Change";

    buttonCont.appendChild(cancelButton);
    buttonCont.appendChild(thisTaskButton);

    confirmationModal.appendChild(modalTitle);
    confirmationModal.appendChild(paragraph1);
    confirmationModal.appendChild(paragraph2);
    confirmationModal.appendChild(paragraph3);
    confirmationModal.appendChild(paragraph4);
    confirmationModal.appendChild(paragraph5);
    confirmationModal.appendChild(buttonCont);

    hideBelow.appendChild(confirmationModal)

    return hideBelow;
}