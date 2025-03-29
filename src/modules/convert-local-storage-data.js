import { settingsValues } from "./settings-modal-interactivity.js";
import { listedGroups, groupsColorLabels } from "./task-utility-functions.js";
import { convertAllTasks } from "./convert-local-storage-tasks.js";

// This module takes data from the localStorage and converts it to data the application can use

function convertSettingsValues() {
    if (!localStorage.getItem("settingsValues") || localStorage.getItem("settingsValues") === 'undefined') {
        return;
    }

    const storedSettings = JSON.parse(localStorage.getItem("settingsValues"));

    for (let i in storedSettings) {
        settingsValues[i] = storedSettings[i];
    }
}

function convertListingPositions() {
    if (!localStorage.getItem("listingPositions") || localStorage.getItem("listingPositions") === 'undefined') {
        return;
    }

    const storedPositions = JSON.parse(localStorage.getItem("listingPositions"));
    for (let i in storedPositions) {
        listedGroups[i] = storedPositions[i];
    }
}

function convertColorLabels() {
    if (!localStorage.getItem("colorLabels") || localStorage.getItem("colorLabels") === 'undefined') {
        return;
    }

    const storedLabels = JSON.parse(localStorage.getItem("colorLabels"));
    for (let i in storedLabels) {
        groupsColorLabels[i] = storedLabels[i];
    }
}

export function convertLocalStorage() {
    convertAllTasks();
    convertSettingsValues();
    convertListingPositions();
    convertColorLabels();
}