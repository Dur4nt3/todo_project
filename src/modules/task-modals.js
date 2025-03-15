import { buildElement } from "./dom-manipulator.js";
import { getTaskDateTextFormat, getTaskTime } from "./misc-utilities.js";
import { taskGroups } from "./task-utility-functions.js";

import closeSvg from "../images/Close.svg";
import clockSvg from "../images/Clock.svg";

// This module both builds and includes the interactivity logic for task modals
// *This is in-fact the module that is used for the modals that pop-up when clicking tasks*

function taskInformationModal(task) {
    const modalCont = buildElement("div", "modal");
    modalCont.tabIndex = 0;

    let priorityClass = "priority-one";

    if (task.priority === 2) {
        priorityClass = "priority-two";
    }
    else if (task.priority === 3) {
        priorityClass = "priority-three";
    }

    const infoModalCont = buildElement("div", "task-info-modal", "modal-cont", priorityClass);

    const closeIcon = buildElement("img", "close-modal-icon");
    closeIcon.src = closeSvg;
    closeIcon.alt = "Close";

    infoModalCont.appendChild(closeIcon);

    const taskInfoTitle = buildElement("h2", "task-info-title");
    taskInfoTitle.textContent = task.title;

    infoModalCont.appendChild(taskInfoTitle);

    if (task.group !== undefined) {
        const taskInfoGroup = buildElement("p", "task-info-group");

        if (!(taskGroups["__unlisted__"].includes(task))) {
            taskInfoGroup.textContent = "~ " + task.group;
        }
        else {
            taskInfoGroup.textContent = "Unlisted";
        }

        infoModalCont.appendChild(taskInfoGroup);
    }

    if (task.deadline !== undefined) {
        const taskDeadlineCont = buildElement("div", "task-info-deadline-cont");

        const taskInfoDate = buildElement("p", "task-info-date");
        taskInfoDate.textContent = getTaskDateTextFormat(task.deadline);

        taskDeadlineCont.appendChild(taskInfoDate);

        if (!task.allDay) {
            const taskTimeCont = buildElement("div", "task-info-time-cont");

            const taskInfoTime = buildElement("p", "task-info-time");
            taskInfoTime.textContent = getTaskTime(task);

            const clockIcon = buildElement("img", "clock-icon");
            clockIcon.src = clockSvg;
            clockIcon.alt = "Due Time";

            taskTimeCont.appendChild(taskInfoTime);
            taskTimeCont.appendChild(clockIcon);

            taskDeadlineCont.appendChild(taskTimeCont);
        }

        infoModalCont.appendChild(taskDeadlineCont);
    }

    const taskInfoDescription = buildElement("p", "task-info-description");
    taskInfoDescription.textContent = task.description;

    infoModalCont.appendChild(taskInfoDescription);

    modalCont.appendChild(infoModalCont);

    return modalCont;
}

export function taskInformationModalInteractivity(task) {
    const modalCont = taskInformationModal(task);

    document.body.prepend(modalCont);
    modalCont.focus();

    modalCont.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("modal")) {
            modalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { modalCont.remove() }, 300);
        }

        else if (target.classList.contains("close-modal-icon")) {
            modalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { modalCont.remove() }, 300);
        }

    });

    modalCont.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            modalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { modalCont.remove() }, 300);
        }
    });
}