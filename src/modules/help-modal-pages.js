import { generateWelcomePage } from "./help-modal-welcome-page.js";
import { generateGroupHelpPage } from "./help-modal-groups-page.js";

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

export function generateAllHelpPages() {
    return [generateWelcomePage(), generateGroupHelpPage()];

    // return [ generateWelcomePage(), generateGroupHelpPage(), generateRepetitiveHelpPage() ];
}