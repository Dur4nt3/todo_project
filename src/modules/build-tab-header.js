import { buildElement } from "./dom-manipulator.js";
import { getTaskDateTextFormat, getTaskDateRegular } from "./misc-utilities.js";
import { add as increaseDate } from "../../node_modules/date-fns";
import { currentUpcomingRange } from "./fetch-tasks.js";
import { selectUpcomingRangeModalInteractivity } from "./input-modals.js";

import refreshSvg from "../images/Refresh.svg";
import editSmallSvg from "../images/Edit-small.svg";


export function todayTabHeader() {
    const todayDate = getTaskDateTextFormat(new Date());
    
    const tabHeaderCont = buildElement("div", "today-tab-header-cont", "tab-header-cont");

    const tabHeader = buildElement("h1", "today-tab-header", "tab-header");
    tabHeader.textContent = "Today: " + todayDate;

    const refreshIconCont = buildElement("div", "refresh-icon-cont");
    const refreshIcon = buildElement("img", "refresh-icon");
    refreshIcon.src = refreshSvg;
    refreshIcon.alt = "Refresh";
    refreshIconCont.appendChild(refreshIcon);

    tabHeaderCont.appendChild(tabHeader);
    tabHeaderCont.appendChild(refreshIconCont);

    return tabHeaderCont;
}

export function generalTabHeader(tabName, headerText) {
    const headerContClassName = tabName + "-header-cont";
    const headerClassName = tabName + "-header";


    const tabHeaderCont = buildElement("div", headerContClassName, "tab-header-cont");

    const tabHeader = buildElement("h1", headerClassName, "tab-header");
    tabHeader.textContent = headerText;

    const refreshIconCont = buildElement("div", "refresh-icon-cont");
    const refreshIcon = buildElement("img", "refresh-icon");
    refreshIcon.src = refreshSvg;
    refreshIcon.alt = "Refresh";
    refreshIconCont.appendChild(refreshIcon);

    tabHeaderCont.appendChild(tabHeader);
    tabHeaderCont.appendChild(refreshIconCont);

    return tabHeaderCont;
}

export function upcomingTabHeader(tabClass, tabGenerationFunction) {
    const todayDate = getTaskDateRegular(new Date());
    const upcomingEndDate = getTaskDateRegular(increaseDate(new Date(), { "weeks": currentUpcomingRange }));
    
    const tabHeaderCont = buildElement("div", "upcoming-tab-header-cont", "tab-header-cont");

    const tabHeader = buildElement("h1", "upcoming-tab-header", "tab-header");
    tabHeader.textContent = "Upcoming: " + todayDate + " - " + upcomingEndDate;

    const editUpcoming = buildElement("img", "edit-upcoming-range");
    editUpcoming.src = editSmallSvg;
    editUpcoming.alt = "Edit Range";

    editUpcoming.addEventListener("click", () => {
        selectUpcomingRangeModalInteractivity(tabClass, tabGenerationFunction);
    });

    const refreshIconCont = buildElement("div", "refresh-icon-cont");
    const refreshIcon = buildElement("img", "refresh-icon");
    refreshIcon.src = refreshSvg;
    refreshIcon.alt = "Refresh";
    refreshIconCont.appendChild(refreshIcon);

    tabHeaderCont.appendChild(tabHeader);
    tabHeader.appendChild(editUpcoming);
    tabHeaderCont.appendChild(refreshIconCont);

    return tabHeaderCont;
}