import { buildElement } from "./dom-manipulator.js";
import { getTaskDateTextFormat } from "./misc-utilities.js";

import refreshSvg from "../images/Refresh.svg";

export function todayTabHeader() {
    const todayDate = getTaskDateTextFormat(new Date());
    
    const tabHeaderCont = buildElement("div", "today-tab-header-cont", "tab-header-cont");

    const tabHeader = buildElement("h1", "today-tab-header", "tab-header");
    tabHeader.textContent = "Today - " + todayDate;

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