import { buildElement } from "./dom-manipulator.js";

export function getHelpPageHeader(id) {
    switch (id) {
        case 1:
            return "Welcome:";

        case 2:
            return "About Groups:";

        case 3:
            return "Repetitive Tasks:";

        default:
            return "Help:";
    }
}

function generateRepetitiveHelpPage() {

}

function generateGroupHelpPage() {

}

function generateWelcomePage() {

}

export function generateAllHelpPages() {

}