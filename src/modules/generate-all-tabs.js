import { createTodayTab } from "./create-today-tab.js";
import { createPastDueTab } from "./create-past-due-tab.js";
import { createCompletedTab } from "./create-completed-tab.js";
import { createAllTab } from "./create-all-tab.js";

export default function generateAllTabs() {
    createTodayTab();
    createPastDueTab();
    createCompletedTab();
    createAllTab();
}