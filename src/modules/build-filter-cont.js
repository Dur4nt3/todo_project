import { buildElement } from "./dom-manipulator.js";

export function priorityAndTimeFilterCont() {
    const filterOptionsCont = buildElement("div", "filter-options");

    const filterPriority = buildElement("p", "filter-priority", "choose-one");
    filterPriority.textContent = "Filter by Priority";

    const filterTime = buildElement("p", "filter-time", "choose-one");
    filterTime.textContent = "Filter by Time";

    filterOptionsCont.appendChild(filterPriority);
    filterOptionsCont.appendChild(filterTime);

    return filterOptionsCont;
}

export function completedPriorityAndTimeFilterCont() {
    const filterOptionsCont = buildElement("div", "filter-options");

    const showCompleted = buildElement("p", "show-completed");
    showCompleted.textContent = "Show Completed";

    const filterPriority = buildElement("p", "filter-priority", "choose-one");
    filterPriority.textContent = "Filter by Priority";

    const filterTime = buildElement("p", "filter-time", "choose-one");
    filterTime.textContent = "Filter by Time";

    filterOptionsCont.appendChild(showCompleted);
    filterOptionsCont.appendChild(filterPriority);
    filterOptionsCont.appendChild(filterTime);

    return filterOptionsCont;
}
