import { buildElement, hide } from "./dom-manipulator.js";
import { generateAllHelpPages, getHelpPageHeader } from "./help-modal-pages.js";

import closeSvg from "../images/Close.svg";
import leftSvg from "../images/Move-left.svg";
import rightSvg from "../images/Move-right.svg";


function helpModal() {
    const modalCont = buildElement("div", "modal");
    modalCont.tabIndex = 0;

    const helpModalCont = buildElement("div", "modal-cont", "help-modal");

    const closeIcon = buildElement("img", "close-modal-icon");
    closeIcon.src = closeSvg;
    closeIcon.alt = "Exit";

    const pageHeader = buildElement("h2", "help-page-title");
    pageHeader.textContent = getHelpPageHeader(1);

    const contentCont = buildElement("div", "help-page-main-content");

    const pageNavigator = buildElement("div", "help-page-navigator");

    const moveLeft = buildElement("img", "move-page-icon", "move-left-icon");
    const moveRight = buildElement("img", "move-page-icon", "move-right-icon");
    moveLeft.alt = "Previous Page";
    moveLeft.src = leftSvg
    moveRight.alt = "Next Page";
    moveRight.src = rightSvg;

    const pageSelection = buildElement("div", "help-page-selection");

    const helpPages = generateAllHelpPages();
    let count = 1;

    for (let i in helpPages) {
        let page = helpPages[i];
        let pageId = "page-"+count;
        page.id = pageId;

        const pageSelector = buildElement("span", "help-page-selector");
        pageSelector.id = pageId;

        if (count !== 1) {
            hide(page);
        }
        else {
            pageSelector.classList.add("active-page");
        }

        contentCont.appendChild(page);
        pageSelection.appendChild(pageSelector);

        count++;
    }

    pageNavigator.appendChild(moveLeft);
    pageNavigator.appendChild(pageSelection);
    pageNavigator.appendChild(moveRight);

    helpModalCont.appendChild(closeIcon);
    helpModalCont.appendChild(pageHeader);
    helpModalCont.appendChild(contentCont);
    helpModalCont.appendChild(pageNavigator);

    modalCont.appendChild(helpModalCont);

    return modalCont;
}

export function helpModalInteractivity() {
    const helpModalCont = helpModal();

    document.body.prepend(helpModalCont);
    helpModalCont.focus();

    helpModalCont.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("modal")) {
            helpModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { helpModalCont.remove() }, 300);
        }

        else if (target.classList.contains("close-modal-icon")) {
            helpModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { helpModalCont.remove() }, 300);
        }

    });

    helpModalCont.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            helpModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { helpModalCont.remove() }, 300);
        }
    });
}