import { generateWelcomePage } from "./help-modal-welcome-page.js";

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



export function generateAllHelpPages() {
    return [generateWelcomePage()];

    // return [ generateWelcomePage(), generateGroupHelpPage(), generateRepetitiveHelpPage() ];
}