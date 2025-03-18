import { buildElement } from "./dom-manipulator.js";

import filterSvg from "../images/Filter.svg";
import filterOffSvg from "../images/Filter-off.svg";

export function generateFiltersHelpPage() {
    const pageDetailsCont = buildElement("div", "help-page-details");

    const section1 = buildElement("div", "help-page-section");
    const section2 = buildElement("div", "help-page-section");

    const header1 = buildElement("h3", "help-section-header");
    const header2 = buildElement("h3", "help-section-header");

    header1.textContent = "Introduction:";
    header2.textContent = "How Filters Work:";

    const paragraph1section1 = buildElement("p", "help-paragraph");
    const paragraph2section1 = buildElement("p", "help-paragraph");
    const paragraph3section1 = buildElement("p", "help-paragraph");
    const paragraph4section1 = buildElement("p", "help-paragraph");
    const paragraph5section1 = buildElement("p", "help-paragraph");
    const paragraph6section1 = buildElement("p", "help-paragraph");

    paragraph1section1.textContent = "Filters can significantly enhance productivity by allowing you to order/list tasks based on certain parameters."

    const p2text1 = document.createTextNode("If a tab includes a");
    const p2text2 = document.createTextNode("icon you can safely assume you are able to filter tasks within that tab.");

    const filter1 = buildElement("img", "demo-filter");
    const filter2 = buildElement("img", "demo-filter");
    const filterOff = buildElement("img", "demo-filter");

    filter1.src = filterSvg;
    filter2.src = filterSvg;
    filter1.alt = "Show Filters";
    filter2.alt = "Show Filters";
    filterOff.src = filterOffSvg;
    filterOff.alt = "Hide Filters";

    paragraph2section1.appendChild(p2text1);
    paragraph2section1.appendChild(filter1);
    paragraph2section1.appendChild(p2text2);

    const p3text1 = document.createTextNode("You can click the");
    const p3text2 = document.createTextNode("icon to show the available filters and click the ");
    const p3text3 = document.createTextNode("icon to hide the available filters.");

    paragraph3section1.appendChild(p3text1);
    paragraph3section1.appendChild(filter2);
    paragraph3section1.appendChild(p3text2);
    paragraph3section1.appendChild(filterOff);
    paragraph3section1.appendChild(p3text3);

    paragraph4section1.textContent = 'Task Ticker offers four different filters: "Show Completed", "Filter by Priority", "Filter by Earliest First", "Filter by Latest First".';
    paragraph5section1.textContent = "Note that not all tabs will include all four filters, some may include only three, others may include none.";
    paragraph6section1.textContent = "This section will clarify the logic behind filters.";

    section1.appendChild(header1);
    section1.appendChild(paragraph1section1);
    section1.appendChild(paragraph2section1);
    section1.appendChild(paragraph3section1);
    section1.appendChild(paragraph4section1);
    section1.appendChild(paragraph5section1);
    section1.appendChild(paragraph6section1);

    const paragraph1section2 = buildElement("p", "help-paragraph");
    const paragraph2section2 = buildElement("p", "help-paragraph");
    const paragraph3section2 = buildElement("p", "help-paragraph");
    const paragraph4section2 = buildElement("p", "help-paragraph");
    const paragraph5section2 = buildElement("p", "help-paragraph");

    const p1span1 = buildElement("span", "enlarge-text");
    const p2span1 = buildElement("span", "enlarge-text");
    const p3span1 = buildElement("span", "enlarge-text");
    const p4span1 = buildElement("span", "enlarge-text");

    p1span1.textContent = '"Show Completed" ';
    p2span1.textContent = '"Filter by Priority" ';
    p3span1.textContent = '"Filter by Earliest First ';
    p4span1.textContent = '"Filter by Latest First" ';

    const s2p1text1 = document.createTextNode("By applying ");
    const s2p1text2 = document.createTextNode("in eligible tabs you can view tasks that you already marked as completed; this filter works in conjunction with other filters.");
    const s2p2text1 = document.createTextNode('By applying ');
    const s2p2text2 = document.createTextNode('in eligible tabs you can order the tasks in the tab by their priority; this filter can only work with the "Show Completed" filter.');
    const s2p3text1 = document.createTextNode('By applying ');
    const s2p3text2 = document.createTextNode('in eligible tabs you can order the tasks in the tab by their date, tasks with an earlier date will be shown higher up; this filter can only work with the "Show Completed" filter.');
    const s2p4text1 = document.createTextNode('By applying ');
    const s2p4text2 = document.createTextNode('in eligible tabs you can order the tasks in the tab by their date, tasks with a later date will be shown higher up; this filter can only work with the "Show Completed" filter.');

    paragraph1section2.appendChild(s2p1text1);
    paragraph1section2.appendChild(p1span1);
    paragraph1section2.appendChild(s2p1text2);

    paragraph2section2.appendChild(s2p2text1);
    paragraph2section2.appendChild(p2span1);
    paragraph2section2.appendChild(s2p2text2);

    paragraph3section2.appendChild(s2p3text1);
    paragraph3section2.appendChild(p3span1);
    paragraph3section2.appendChild(s2p3text2);

    paragraph4section2.appendChild(s2p4text1);
    paragraph4section2.appendChild(p4span1);
    paragraph4section2.appendChild(s2p4text2);

    paragraph5section2.textContent = 'It should be noted that an "All-day" task (i.e., a task with a set date but without a specific time of the day) is considered as later than non "All-day" task. Moreover, tasks without dates will always be listed at the bottom when filtering by either "Earliest" or "Latest".';

    section2.appendChild(header2);
    section2.appendChild(paragraph1section2);
    section2.appendChild(paragraph2section2);
    section2.appendChild(paragraph3section2);
    section2.appendChild(paragraph4section2);
    section2.appendChild(paragraph5section2);

    pageDetailsCont.appendChild(section1);
    pageDetailsCont.appendChild(section2);

    return pageDetailsCont;
}