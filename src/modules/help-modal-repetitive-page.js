import { buildElement } from "./dom-manipulator.js";

export function generateRepetitionHelpPage() {
    const pageDetailsCont = buildElement("div", "help-page-details");

    const section1 = buildElement("div", "help-page-section");
    const section2 = buildElement("div", "help-page-section");
    const section3 = buildElement("div", "help-page-section");
    const section4 = buildElement("div", "help-page-section");

    const header1 = buildElement("h3", "help-section-header");
    const header2 = buildElement("h3", "help-section-header");
    const header3 = buildElement("h3", "help-section-header");
    const header4 = buildElement("h3", "help-section-header");

    header1.textContent = "Introduction:";
    header2.textContent = "Repetition Patterns:";
    header3.textContent = "Additional Information:";
    header4.textContent = "Changing Repetition Patterns/Values:";

    const paragraph1section1 = buildElement("p", "help-paragraph");
    const paragraph2section1 = buildElement("p", "help-paragraph");
    const paragraph3section1 = buildElement("p", "help-paragraph");
    const paragraph4section1 = buildElement("p", "help-paragraph");
    const paragraph5section1 = buildElement("p", "help-paragraph");

    const span1 = buildElement("span", "enlarge-text");
    span1.textContent = "Repetitive Tasks ";
    const p1text1 = document.createTextNode("are tasks that reoccur after a certain amount of time based on a specified pattern.");
    paragraph1section1.appendChild(span1);
    paragraph1section1.appendChild(p1text1);

    paragraph2section1.textContent = 'You\'ll find repetitive tasks helpful when you want to automatically repeat certain task after a certain amount of time rather than manually creating another.';
    paragraph3section1.textContent = 'Task Ticker provide 4 different repetition patterns that you can utilize: "Time", "Day", "Hybrid - Weekly", "Hybrid - Monthly".';
    paragraph4section1.textContent = 'Each of the mentioned patterns will be useful depending on your requirements. The next section will delve deeper into each of the patterns and their usage.';
    paragraph5section1.textContent = 'It should be noted that you might be able to replicate the functionality of one pattern with another, still you should find using dedicate pattern more convenient.';

    section1.appendChild(header1);
    section1.appendChild(paragraph1section1);
    section1.appendChild(paragraph2section1);
    section1.appendChild(paragraph3section1);
    section1.appendChild(paragraph4section1);
    section1.appendChild(paragraph5section1);

    const paragraph1section2 = buildElement("p", "help-paragraph");
    const paragraph2section2 = buildElement("p", "help-paragraph");
    const paragraph3section2 = buildElement("p", "help-paragraph");
    const paragraph4section2 = buildElement("p", "help-paragraph");

    const p1span1 = buildElement("span", "enlarge-text");
    const p2span1 = buildElement("span", "enlarge-text");
    const p3span1 = buildElement("span", "enlarge-text");
    const p4span1 = buildElement("span", "enlarge-text");

    p1span1.textContent = '"Time" ';
    p2span1.textContent = '"Day" ';
    p3span1.textContent = '"Hybrid - Weekly" ';
    p4span1.textContent = '"Hybrid - Monthly" ';

    const s2p1text1 = document.createTextNode("The ");
    const s2p1text2 = document.createTextNode("pattern allows you to repeat tasks based on a static period of time. From a minimum of every 1 hour to a maximum of every 5 years, tasks will repeat based on the specified period of time.");
    const s2p2text1 = document.createTextNode('The ');
    const s2p2text2 = document.createTextNode('pattern allows you to repeat tasks every week on specified day/s.');
    const s2p3text1 = document.createTextNode('The ');
    const s2p3text2 = document.createTextNode('pattern allows you to repeat tasks every specified amount of weeks on specified days. This pattern is a combination of both the "Time" and "Day" pattern and allows you to select a more specific reoccurrence easier.');
    const s2p4text1 = document.createTextNode('The ');
    const s2p4text2 = document.createTextNode('pattern allows you to repeat tasks either on the end of the month every specified amount of months, or on a certain occurrence of a certain day every specified amount of months. One thing to note about this pattern when it comes to selecting a specific occurrence, the "Forth" and "Final" occurrence options might resolve to the same date depending on the number of occurrences a certain day has in a month.');

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

    section2.appendChild(header2);
    section2.appendChild(paragraph1section2);
    section2.appendChild(paragraph2section2);
    section2.appendChild(paragraph3section2);
    section2.appendChild(paragraph4section2);

    const paragraph1section3 = buildElement("p", "help-paragraph");
    const paragraph2section3 = buildElement("p", "help-paragraph");
    const paragraph3section3 = buildElement("p", "help-paragraph");

    paragraph1section3.textContent = 'Repetitive tasks are considered rather "special" when compared to other tasks as various functionalities behave differently with repetitive tasks.';
    paragraph2section3.textContent = 'When changing a repetitive task\'s title/description/group name you will be prompted to either apply the changes to all tasks or this task only. Applying the changes to all tasks will retroactively change the information of all tasks that were created from the initial repetitive task.';
    paragraph3section3.textContent = 'It is also imperative to note that amount of tasks generated are dependent on the repetition pattern, its value, and the current date (compared to the date of the initial task). Therefore, you might need to refresh the application to allow for additional tasks to generate.';

    section3.appendChild(header3);
    section3.appendChild(paragraph1section3);
    section3.appendChild(paragraph2section3);
    section3.appendChild(paragraph3section3);

    const paragraph1section4 = buildElement("p", "help-paragraph");
    const paragraph2section4 = buildElement("p", "help-paragraph");
    const paragraph3section4 = buildElement("p", "help-paragraph");

    paragraph1section4.textContent = 'Changing a repetitive task\'s repetition pattern and/or its value is entirely possible, still some precautions should be displayed.';
    paragraph2section4.textContent = 'When you change a repetitive task\'s repetition pattern and/or its value you will delete all future tasks scheduled and in-turn generate new tasks based on the new information.';
    paragraph3section4.textContent = 'If this is an issue to you, consider creating a new, separate task with your desired repetition pattern and value.';

    section4.appendChild(header4);
    section4.appendChild(paragraph1section4);
    section4.appendChild(paragraph2section4);
    section4.appendChild(paragraph3section4);

    pageDetailsCont.appendChild(section1);
    pageDetailsCont.appendChild(section2);
    pageDetailsCont.appendChild(section3);
    pageDetailsCont.appendChild(section4);

    return pageDetailsCont;
}