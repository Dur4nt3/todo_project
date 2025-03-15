import { buildElement, hide, show } from "./dom-manipulator.js";
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

function findActivePage() {
    const pageSelection = document.querySelector(".help-page-selection");
    const pageMarkers = Array.from(pageSelection.children);

    for (let i in pageMarkers) {
        if (pageMarkers[i].classList.contains("active-page")) {
            return pageMarkers[i];
        }
    }
}

function getPageNumber(id) {
    return id.slice(id.indexOf("-") + 1);
}

export function helpModalInteractivity() {
    const helpModalCont = helpModal();

    document.body.prepend(helpModalCont);
    helpModalCont.focus();

    helpModalCont.addEventListener("click", (e) => {

        const target = e.target;
        const activePageMarker = findActivePage();
        const pageNumber = Number(getPageNumber(activePageMarker.id));

        const currentPage = document.querySelector(".help-page-details"+"#"+activePageMarker.id);
        const pageHeader = document.querySelector(".help-page-title");

        if (target.classList.contains("modal")) {
            helpModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { helpModalCont.remove() }, 300);
        }

        else if (target.classList.contains("close-modal-icon")) {
            helpModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { helpModalCont.remove() }, 300);
        }

        if (target.classList.contains("move-left-icon")) {
            if (activePageMarker.id === "page-1") {
                return;
            }
            
            // Hide the current page
            hide(currentPage);
            activePageMarker.classList.remove("active-page");

            let previousPageID = "page-"+(pageNumber - 1);
            
            // Show the previous page
            pageHeader.textContent = getHelpPageHeader(pageNumber - 1);
            const previousPage = document.querySelector(".help-page-details"+"#"+previousPageID);
            show(previousPage);

            // Highlight the correct marker
            const previousMarker = document.querySelector(".help-page-selector"+"#"+previousPageID);
            previousMarker.classList.add("active-page");

            return;
        }

        else if (target.classList.contains("move-right-icon")) {
            if (activePageMarker === activePageMarker.parentNode.lastChild) {
                return;
            }
            
            // Hide the current page
            hide(currentPage);
            activePageMarker.classList.remove("active-page");

            let nextPageID = "page-"+(pageNumber + 1);
            
            // Show the next page
            pageHeader.textContent = getHelpPageHeader(pageNumber + 1);
            const nextPage = document.querySelector(".help-page-details"+"#"+nextPageID);
            show(nextPage);

            // Highlight the correct marker
            const nextMarker = document.querySelector(".help-page-selector"+"#"+nextPageID);
            nextMarker.classList.add("active-page");

            return;
        }

        else if (target.classList.contains("help-page-selector")) {
            if (target === activePageMarker) {
                return;
            }

            hide(currentPage);
            activePageMarker.classList.remove("active-page");

            let selectedPageID = target.id;

            pageHeader.textContent = getHelpPageHeader(Number(getPageNumber(target.id)));
            const selectedPage = document.querySelector(".help-page-details"+"#"+selectedPageID);
            show(selectedPage);

            target.classList.add("active-page");

            return;
        }

    });

    helpModalCont.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            helpModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { helpModalCont.remove() }, 300);
        }
    });
}