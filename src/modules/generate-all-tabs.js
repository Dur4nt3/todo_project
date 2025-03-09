import { createTodayTab } from "./create-today-tab.js";
import { createPastDueTab } from "./create-past-due-tab.js";
import { createCompletedTab } from "./create-completed-tab.js";
import { createAllTab } from "./create-all-tab.js";
import { createUpcomingTab } from "./create-upcoming-tab.js";
import { createSearchTab } from "./create-search-tab.js";

// This module executes all tab generation functions
// This is mainly used on the initial page load to ensure all tabs are populated with content

export default function generateAllTabs() {
    createTodayTab();
    createPastDueTab();
    createCompletedTab();
    createAllTab();
    createUpcomingTab();
    createSearchTab();
}