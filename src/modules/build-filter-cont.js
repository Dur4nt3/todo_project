import { buildElement, hide, show } from "./dom-manipulator.js";

import filterSvg from "../images/Filter.svg";
import filterOffSvg from "../images/Filter-off.svg";

function addShowFiltersEvent(showIcon, hideIcon) {
    showIcon.addEventListener("click", () => {
        hide(showIcon);
        show(hideIcon);

        const filterTypeCont = showIcon.parentNode.querySelector(".filter-types");
        filterTypeCont.classList.remove("hidden-filters");
        filterTypeCont.classList.remove("hide-filters");
        filterTypeCont.classList.add("show-filters");
    });
}

function addHideFiltersEvent(hideIcon, showIcon) {
    hideIcon.addEventListener("click", () => {
        hide(hideIcon);
        show(showIcon);

        const filterTypeCont = showIcon.parentNode.querySelector(".filter-types");
        filterTypeCont.classList.remove("show-filters");
        filterTypeCont.classList.add("hide-filters");
    });
}

export function priorityAndTimeFilterCont() {
    const filterOptionsCont = buildElement("div", "filter-options");

    const filterOnIcon = buildElement("img", "filter-on-icon");
    const filterOffIcon = buildElement("img", "filter-off-icon", "hide");
    filterOnIcon.src = filterSvg;
    filterOnIcon.alt = "Show Filters";
    filterOffIcon.src = filterOffSvg;
    filterOffIcon.alt = "Hide Filters";
    addShowFiltersEvent(filterOnIcon, filterOffIcon);
    addHideFiltersEvent(filterOffIcon, filterOnIcon);

    const filterTypes = buildElement("div", "filter-types", "hidden-filters");

    const filterPriority = buildElement("p", "filter-priority", "choose-one");
    filterPriority.textContent = "Filter by Priority";

    const filterEarliestFirst = buildElement("p", "filter-earliest-first", "choose-one");
    filterEarliestFirst.textContent = "Filter by Earliest First";

    const filterLatestFirst = buildElement("p", "filter-latest-first", "choose-one");
    filterLatestFirst.textContent = "Filter by Latest First";

    filterTypes.appendChild(filterPriority);
    filterTypes.appendChild(filterEarliestFirst);
    filterTypes.appendChild(filterLatestFirst);

    filterOptionsCont.appendChild(filterOnIcon);
    filterOptionsCont.appendChild(filterOffIcon);
    filterOptionsCont.appendChild(filterTypes);

    return filterOptionsCont;
}

export function completedPriorityAndTimeFilterCont() {
    const filterOptionsCont = buildElement("div", "filter-options");

    const filterOnIcon = buildElement("img", "filter-on-icon");
    const filterOffIcon = buildElement("img", "filter-off-icon", "hide");
    filterOnIcon.src = filterSvg;
    filterOnIcon.alt = "Show Filters";
    filterOffIcon.src = filterOffSvg;
    filterOffIcon.alt = "Hide Filters";
    addShowFiltersEvent(filterOnIcon, filterOffIcon);
    addHideFiltersEvent(filterOffIcon, filterOnIcon);

    const filterTypes = buildElement("div", "filter-types", "hidden-filters");

    const showCompleted = buildElement("p", "show-completed");
    showCompleted.textContent = "Show Completed";

    const filterPriority = buildElement("p", "filter-priority", "choose-one");
    filterPriority.textContent = "Filter by Priority";

    const filterEarliestFirst = buildElement("p", "filter-earliest-first", "choose-one");
    filterEarliestFirst.textContent = "Filter by Earliest First";

    const filterLatestFirst = buildElement("p", "filter-latest-first", "choose-one");
    filterLatestFirst.textContent = "Filter by Latest First";

    filterTypes.appendChild(showCompleted);
    filterTypes.appendChild(filterPriority);
    filterTypes.appendChild(filterEarliestFirst);
    filterTypes.appendChild(filterLatestFirst);

    filterOptionsCont.appendChild(filterOnIcon);
    filterOptionsCont.appendChild(filterOffIcon);
    filterOptionsCont.appendChild(filterTypes);

    return filterOptionsCont;
}
