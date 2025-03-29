import { buildElement } from "./dom-manipulator.js";

export function generateWelcomePage() {
    const pageDetailsCont = buildElement("div", "help-page-details", "welcome-page-details");

    const section1 = buildElement("div", "help-page-section");
    const section2 = buildElement("div", "help-page-section");
    const section3 = buildElement("div", "help-page-section");
    const section4 = buildElement("div", "help-page-section");

    const header1 = buildElement("h3", "welcome-page-header-text");
    const header2 = buildElement("h3", "welcome-page-header-text");
    const header3 = buildElement("h3", "welcome-page-header-text");
    const header4 = buildElement("h3", "welcome-page-header-text");

    header1.textContent = "Welcome to Task Ticker:";
    header2.textContent = "Task Ticker allows you to create the following task types:";
    header3.textContent = "Here's a quick run-down of the task types:";
    header4.textContent = "What's next:";

    const paragraph1section1 = buildElement("p", "welcome-page-text", "help-paragraph");
    const paragraph2section1 = buildElement("p", "welcome-page-text", "help-paragraph");
    const paragraph3section1 = buildElement("p", "welcome-page-text", "help-paragraph");
    const paragraph4section1 = buildElement("p", "welcome-page-text", "help-paragraph");

    paragraph1section1.textContent = "Task Ticker is a task scheduling application design to help you create and monitor tasks.";
    paragraph2section1.textContent = "Task Ticker offers a variety of task types designed to fit your exact requirements!";
    paragraph3section1.textContent = "This help section includes a variety of resources created to assist you with various questions or issues you might encounter.";
    paragraph4section1.textContent = '***Note, you can disable this message by selecting the "Settings" options on the sidebar and toggling-off the "Show Guide On Visit" option.***';

    section1.appendChild(header1);
    section1.appendChild(paragraph1section1);
    section1.appendChild(paragraph2section1);
    section1.appendChild(paragraph3section1);
    section1.appendChild(paragraph4section1);

    const listCont = buildElement("ul", "help-unordered-list", "help-task-types");
    const listItem1 = buildElement("li", "help-unordered-list-item");
    const listItem2 = buildElement("li", "help-unordered-list-item");
    const listItem3 = buildElement("li", "help-unordered-list-item");
    const listItem4 = buildElement("li", "help-unordered-list-item");
    const listItem5 = buildElement("li", "help-unordered-list-item");
    const listItem6 = buildElement("li", "help-unordered-list-item");

    listItem1.textContent = "Basic";
    listItem2.textContent = "Grouped";
    listItem3.textContent = "Dated";
    listItem4.textContent = "Dated & Grouped";
    listItem5.textContent = "Repetitive";
    listItem6.textContent = "Repetitive & Grouped";

    listCont.appendChild(listItem1);
    listCont.appendChild(listItem2);
    listCont.appendChild(listItem3);
    listCont.appendChild(listItem4);
    listCont.appendChild(listItem5);
    listCont.appendChild(listItem6);

    section2.appendChild(header2);
    section2.appendChild(listCont);

    const paragraph1section3 = buildElement("p", "welcome-page-text", "help-paragraph");
    const paragraph2section3 = buildElement("p", "welcome-page-text", "help-paragraph");
    const paragraph3section3 = buildElement("p", "welcome-page-text", "help-paragraph");
    const paragraph4section3 = buildElement("p", "welcome-page-text", "help-paragraph");
    const paragraph5section3 = buildElement("p", "welcome-page-text", "help-paragraph");
    const paragraph6section3 = buildElement("p", "welcome-page-text", "help-paragraph");

    const span1section3 = buildElement("span", "enlarge-text");
    const span2section3 = buildElement("span", "enlarge-text");
    const span3section3 = buildElement("span", "enlarge-text");
    const span4section3 = buildElement("span", "enlarge-text");
    const span5section3 = buildElement("span", "enlarge-text");
    const span6section3 = buildElement("span", "enlarge-text");

    span1section3.textContent = "Basic ";
    span2section3.textContent = "Grouped ";
    span3section3.textContent = "Dated ";
    span4section3.textContent = "Dated & Grouped ";
    span5section3.textContent = "Repetitive ";
    span6section3.textContent = "Repetitive & Grouped ";

    const text1section3 = document.createTextNode("tasks contain only the ability to set a task's title, description, and priority.");
    const text2section3 = document.createTextNode("tasks contain all the functionality of a basic task, and the ability to set a task's group.");
    const text3section3 = document.createTextNode("tasks contain all the functionality of a basic task, and the ability to set a task's deadline.");
    const text4section3 = document.createTextNode("tasks contain all the functionality of both a dated and grouped tasks.");
    const text5section3 = document.createTextNode("tasks contain all the functionality of a dated task, and the ability to make the task reoccur based on a set pattern.");
    const text6section3 = document.createTextNode("tasks contain all the functionality of both a repetitive and grouped tasks.");

    paragraph1section3.appendChild(span1section3);
    paragraph1section3.appendChild(text1section3);

    paragraph2section3.appendChild(span2section3);
    paragraph2section3.appendChild(text2section3);

    paragraph3section3.appendChild(span3section3);
    paragraph3section3.appendChild(text3section3);

    paragraph4section3.appendChild(span4section3);
    paragraph4section3.appendChild(text4section3);

    paragraph5section3.appendChild(span5section3);
    paragraph5section3.appendChild(text5section3);

    paragraph6section3.appendChild(span6section3);
    paragraph6section3.appendChild(text6section3);

    section3.appendChild(header3);
    section3.appendChild(paragraph1section3);
    section3.appendChild(paragraph2section3);
    section3.appendChild(paragraph3section3);
    section3.appendChild(paragraph4section3);
    section3.appendChild(paragraph5section3);
    section3.appendChild(paragraph6section3);

    const paragraph1section4 = buildElement("p", "welcome-page-text", "help-paragraph");
    paragraph1section4.textContent = "The upcoming pages will delve deeper into specific features of Task Ticker."

    section4.appendChild(header4);
    section4.appendChild(paragraph1section4);

    pageDetailsCont.appendChild(section1);
    pageDetailsCont.appendChild(section2);
    pageDetailsCont.appendChild(section3);
    pageDetailsCont.appendChild(section4);

    return pageDetailsCont;
}