import { buildElement } from "./dom-manipulator.js";

export function generateGroupHelpPage() {
    const pageDetailsCont = buildElement("div", "help-page-details");

    const section1 = buildElement("div", "help-page-section");
    const section2 = buildElement("div", "help-page-section");
    const section3 = buildElement("div", "help-page-section");
    const section4 = buildElement("div", "help-page-section");
    const section5 = buildElement("div", "help-page-section");

    const header1 = buildElement("h3", "help-section-header");
    const header2 = buildElement("h3", "help-section-header");
    const header3 = buildElement("h3", "help-section-header");
    const header4 = buildElement("h3", "help-section-header");
    const header5 = buildElement("h3", "help-section-header");

    header1.textContent = "Introduction:";
    header2.textContent = "Listing Positions:";
    header3.textContent = "Technical Details:";
    header4.textContent = "Editing Groups:";
    header5.textContent = "Unlisted Tasks:";

    const paragraph1section1 = buildElement("p", "help-paragraph");
    const paragraph2section1 = buildElement("p", "help-paragraph");
    const paragraph3section1 = buildElement("p", "help-paragraph");

    const span1 = buildElement("span", "enlarge-text");
    span1.textContent = "Groups "
    const text1 = document.createTextNode("allows users to organize related tasks into cohesive units, making it easier to track and manage them.");
    paragraph1section1.appendChild(span1);
    paragraph1section1.appendChild(text1);

    paragraph2section1.textContent = "Whether its work-related tasks, event planning or personal productivity, groups allow you to improve your task organization.";
    paragraph3section1.textContent = "To create a new group, simply assign the desired group name to a task with group capabilities, either by creating a new task with group capabilities, or by editing an existing task with group capabilities.";

    section1.appendChild(header1);
    section1.appendChild(paragraph1section1);
    section1.appendChild(paragraph2section1);
    section1.appendChild(paragraph3section1);

    const paragraph1section2 = buildElement("p", "help-paragraph");
    const paragraph2section2 = buildElement("p", "help-paragraph");
    const paragraph3section2 = buildElement("p", "help-paragraph");
    const paragraph4section2 = buildElement("p", "help-paragraph");
    const paragraph5section2 = buildElement("p", "help-paragraph");
    const paragraph6section2 = buildElement("p", "help-paragraph");

    const span2 = buildElement("span", "enlarge-text");
    span2.textContent = "Listing positions "
    const text2 = document.createTextNode('refer to whether the group is displayed under the "My Groups" sub-section in the sidebar, and their order.');
    paragraph1section2.appendChild(span2);
    paragraph1section2.appendChild(text2);

    paragraph2section2.textContent = "Depending on how many groups you have, you might find that between 0 and up to 5 groups are displayed in the sidebar.";
    paragraph3section2.textContent = 'Listing positions will always adjust according to the number of groups you have, that means, if you have 5 or more groups, you will always have 5 groups under the "My Groups" sub-section.';
    paragraph4section2.textContent = 'You may use the "Edit Groups" utility to change the listing order of groups to ensure that the desired groups are displayed on the sidebar.';
    paragraph5section2.textContent = "To reiterate, you can NOT, display less groups than you have (up to a limit of 5) on the sidebar.";
    paragraph6section2.textContent = 'For the rest of the groups, you can find and access them via the "More Groups" utility.';

    section2.appendChild(header2);
    section2.appendChild(paragraph1section2);
    section2.appendChild(paragraph2section2);
    section2.appendChild(paragraph3section2);
    section2.appendChild(paragraph4section2);
    section2.appendChild(paragraph5section2);
    section2.appendChild(paragraph6section2);

    const listCont = buildElement("ul", "help-unordered-list", "group-technical-details-list");
    const listItem1 = buildElement("li", "help-unordered-list-item", "information-list-item");
    const listItem2 = buildElement("li", "help-unordered-list-item", "information-list-item");
    const listItem3 = buildElement("li", "help-unordered-list-item", "information-list-item");
    const listItem4 = buildElement("li", "help-unordered-list-item", "information-list-item");
    const listItem5 = buildElement("li", "help-unordered-list-item", "invalid-list-item");
    const listItem6 = buildElement("li", "help-unordered-list-item", "invalid-list-item");
    const listItem7 = buildElement("li", "help-unordered-list-item", "invalid-list-item");
    const listItem8 = buildElement("li", "help-unordered-list-item", "invalid-list-item");

    listItem1.textContent = "Group names can be up to 30 characters";
    listItem2.textContent = "Groups with no tasks are automatically deleted";
    listItem3.textContent = 'Groups may be listed on the sidebar or in the "More Groups" interface';
    listItem4.textContent = "Group names may include letters, numbers, spaces or dashes";
    listItem5.textContent = "Group names may not include any other special characters";
    listItem6.textContent = "Groups may not share the same name";
    listItem7.textContent = 'Groups may not use the name: "__unlisted__"';
    listItem8.textContent = "Groups may not have a listing position higher than 5";

    listCont.appendChild(listItem1);
    listCont.appendChild(listItem2);
    listCont.appendChild(listItem3);
    listCont.appendChild(listItem4);
    listCont.appendChild(listItem5);
    listCont.appendChild(listItem6);
    listCont.appendChild(listItem7);
    listCont.appendChild(listItem8);

    section3.appendChild(header3);
    section3.appendChild(listCont);

    const paragraph1section4 = buildElement("p", "help-paragraph");
    const paragraph2section4 = buildElement("p", "help-paragraph");
    const paragraph3section4 = buildElement("p", "help-paragraph");
    const paragraph4section4 = buildElement("p", "help-paragraph");

    paragraph1section4.textContent = 'Hovering on the "My Groups" sub-section header on the sidebar will reveal a utility that allows you to edit groups (i.e., the aforementioned "Edit Groups" utility).';
    paragraph2section4.textContent = 'Clicking on said utility will reveal an interface that will allow you to customize groups.';
    paragraph3section4.textContent = 'The interface allows you to change a group\'s color label (i.e., the color of the "~" marker), change the group\'s name, and its listing order.'; 
    paragraph4section4.textContent = "It should be noted that to change a group's name to an already existing name you will need to: find the group with the existing name and change its name to a unique one, submit the changes, and then, and only then, change the selected name to the initially desired name.";

    section4.appendChild(header4);
    section4.appendChild(paragraph1section4);
    section4.appendChild(paragraph2section4);
    section4.appendChild(paragraph3section4);
    section4.appendChild(paragraph4section4);

    const paragraph1section5 = buildElement("p", "help-paragraph");
    const paragraph2section5 = buildElement("p", "help-paragraph");
    const paragraph3section5 = buildElement("p", "help-paragraph");

    paragraph1section5.textContent = 'You might encounter a scenario where you no longer want a task or a collection of tasks to be a part of any group.';
    paragraph2section5.textContent = ' In those cases, you can opt-out of the grouping utility and "un-list" tasks. You can achieve that by editing the task and selecting the "un-list" option.';
    paragraph3section5.textContent = 'Unlisted tasks will not be found under the "My Groups" sub-section, but can be found via the search utility. Specifically, click the "Search" tab and select the advanced search utility (by clicking the icon on the right side of the search bar), then search for tasks with the group name "__unlisted__".'; 

    section5.appendChild(header5);
    section5.appendChild(paragraph1section5);
    section5.appendChild(paragraph2section5);
    section5.appendChild(paragraph3section5);

    pageDetailsCont.appendChild(section1);
    pageDetailsCont.appendChild(section2);
    pageDetailsCont.appendChild(section3);
    pageDetailsCont.appendChild(section4);
    pageDetailsCont.appendChild(section5);

    return pageDetailsCont;
}