import { buildElement, buildImgElement, buildSelectElement } from "./dom-manipulator.js";

import infoSvg from "../images/More-information.svg";

function confirmDeletionOption() {
    const settingsOption = buildElement("div", "settings-option");

    const label = buildElement("label", "confirm-deletion-option-label", "settings-option-label");
    label.htmlFor = "confirm-deletion-option";

    const Text = document.createTextNode("Confirm Deletion ");
    const Info = buildImgElement(infoSvg, "Additional Information", "information-icon");

    label.appendChild(Text);
    label.appendChild(Info);

    const toggleSwitch = buildElement("label", "toggle-switch-label");
    const toggleSwitchInput = buildElement("input", "toggle-switch-input", "confirm-deletion-option");
    toggleSwitchInput.type = "checkbox";
    toggleSwitchInput.id = "confirm-deletion-option";
    toggleSwitchInput.checked = true;
    const toggleSwitchSpan = buildElement("span", "toggle-switch-slider");
    
    toggleSwitch.appendChild(toggleSwitchInput);
    toggleSwitch.appendChild(toggleSwitchSpan);

    settingsOption.appendChild(label);
    settingsOption.appendChild(toggleSwitch);

    return settingsOption;
}

function showWelcomeOption() {
    const settingsOption = buildElement("div", "settings-option");
    
    const label = buildElement("label", "show-welcome-option-label", "settings-option-label");
    label.htmlFor = "show-welcome-option";

    const Text = document.createTextNode("Show Guide On Visit ");
    const Info = buildImgElement(infoSvg, "Additional Information", "information-icon");

    label.appendChild(Text);
    label.appendChild(Info);

    const toggleSwitch = buildElement("label", "toggle-switch-label");
    const toggleSwitchInput = buildElement("input", "toggle-switch-input", "show-welcome-option");
    toggleSwitchInput.type = "checkbox";
    toggleSwitchInput.id = "show-welcome-option";
    toggleSwitchInput.checked = true;
    const toggleSwitchSpan = buildElement("span", "toggle-switch-slider");
    
    toggleSwitch.appendChild(toggleSwitchInput);
    toggleSwitch.appendChild(toggleSwitchSpan);

    settingsOption.appendChild(label);
    settingsOption.appendChild(toggleSwitch);

    return settingsOption;
}

function showDeadlineOption() {
    const settingsOption = buildElement("div", "settings-option");
    
    const label = buildElement("label", "deadline-warning-option-label", "settings-option-label");
    label.htmlFor = "deadline-warning-option";

    const Text = document.createTextNode("Show Deadline Warning ");
    const Info = buildImgElement(infoSvg, "Additional Information", "information-icon");

    label.appendChild(Text);
    label.appendChild(Info);

    const toggleSwitch = buildElement("label", "toggle-switch-label");
    const toggleSwitchInput = buildElement("input", "toggle-switch-input", "deadline-warning-option");
    toggleSwitchInput.type = "checkbox";
    toggleSwitchInput.id = "deadline-warning-option";
    toggleSwitchInput.checked = true;
    const toggleSwitchSpan = buildElement("span", "toggle-switch-slider");
    
    toggleSwitch.appendChild(toggleSwitchInput);
    toggleSwitch.appendChild(toggleSwitchSpan);

    settingsOption.appendChild(label);
    settingsOption.appendChild(toggleSwitch);

    return settingsOption;
}

function defaultTabOption() {
    const settingsOption = buildElement("div", "settings-option");
    
    const label = buildElement("label", "default-tab-option-label", "settings-option-label");
    label.htmlFor = "default-tab-option";

    const Text = document.createTextNode("Default Tab ");
    const Info = buildImgElement(infoSvg, "Additional Information", "information-icon");

    label.appendChild(Text);
    label.appendChild(Info);

    const selectDefault = buildSelectElement("default-tab-option",
        ["today", "Today"], ["upcoming", "Upcoming"], ["past-due", "Past Due"], ["all-tasks", "All Tasks"], ["completed", "Completed"])

    settingsOption.appendChild(label);
    settingsOption.appendChild(selectDefault);

    return settingsOption;
}

export function settingsModal() {
    const modalCont = buildElement("div", "modal");
    modalCont.tabIndex = 0;

    const settingsModalCont = buildElement("div", "modal-cont", "settings-modal");

    const modalTitle = buildElement("h2", "settings-title");
    modalTitle.textContent = "Settings:"

    const settingsOptionsCont = buildElement("div", "settings-options-cont");

    const optionsRow1 = buildElement("div", "options-row");
    const optionsRow2 = buildElement("div", "options-row");

    optionsRow1.appendChild(confirmDeletionOption());
    optionsRow1.appendChild(showWelcomeOption());

    optionsRow2.appendChild(showDeadlineOption());
    optionsRow2.appendChild(defaultTabOption());

    const buttonCont = buildElement("div", "settings-button-cont");

    const cancelButton = buildElement("button", "settings-button", "cancel-button");
    const confirmButton = buildElement("button", "settings-button", "confirm-button");
    cancelButton.textContent = "Cancel";
    confirmButton.textContent = "Apply";

    buttonCont.appendChild(cancelButton);
    buttonCont.appendChild(confirmButton);

    settingsOptionsCont.appendChild(optionsRow1);
    settingsOptionsCont.appendChild(optionsRow2);

    settingsModalCont.appendChild(modalTitle);
    settingsModalCont.appendChild(settingsOptionsCont);
    settingsModalCont.appendChild(buttonCont);

    modalCont.appendChild(settingsModalCont);

    return modalCont;
}

export function validateSettingsValues(...values) {
    const toggleValues = [true, false];
    const defaultTabValues = ["today", "upcoming", "past-due", "all-tasks", "completed"];

    for (let i in values) {
        let value = values[i];
        if (value[0] === "toggle") {
            if (!(toggleValues.includes(value[1]))) {
                return false;
            }
            continue;
        }

        if (value[0] === "defaultTab") {
            if (!(defaultTabValues.includes(value[1]))) {
                return false;
            }
            continue;
        }
    }

    return true;
}