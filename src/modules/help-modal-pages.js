import { generateWelcomePage } from "./help-modal-welcome-page.js";
import { generateGroupHelpPage } from "./help-modal-groups-page.js";
import { generateFiltersHelpPage } from "./help-modal-filters-page.js";
import { generateRepetitionHelpPage } from "./help-modal-repetitive-page.js";

export function getHelpPageHeader(id) {
    switch (id) {
        case 1:
            return "Welcome:";

        case 2:
            return "Filtering Tasks:";

        case 3:
            return "About Groups:";

        case 4:
            return "Repetitive Tasks";

        default:
            return "Help:";
    }
}

export function generateAllHelpPages() {
    return [generateWelcomePage(), generateFiltersHelpPage(), generateGroupHelpPage(), generateRepetitionHelpPage()];
}