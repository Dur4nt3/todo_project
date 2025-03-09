import { buildElement } from "./dom-manipulator.js";

import search2Svg from "../images/Search-type2.svg";
import tuneSvg from "../images/Tune.svg";

// This module is used to build misc components
// Mainly use this module when you want to separate the component building logic from a certain module

export function searchBar() {
    const searchBarCont = buildElement("div", "search-bar-cont");

    const searchIcon = buildElement("img", "search-tasks-icon");
    const tuneIcon = buildElement("img", "tune-icon");
    searchIcon.src = search2Svg;
    tuneIcon.src = tuneSvg;
    searchIcon.alt = "Search Tasks";
    tuneIcon.alt = "Tune Search";

    const searchBarInput = buildElement("input", "search-tasks-input");
    searchBarInput.type = "text";
    searchBarInput.placeholder = "Task Title...";
    searchBarInput.name = "search-tasks-input";

    searchBarCont.appendChild(searchIcon);
    searchBarCont.appendChild(searchBarInput);
    searchBarCont.appendChild(tuneIcon);

    return searchBarCont;
}