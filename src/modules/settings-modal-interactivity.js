import { settingsModal, validateSettingsValues } from "./settings-modal.js";

const settingsValues = {
    'deletionConfirmation': true,
    'showGuide': true,
    'deadlineConfirmation': true,
    'defaultTab': 'today'
}

export { settingsValues };

export function settingsModalInteractivity() {
    const settingsModalCont = settingsModal();
    
    document.body.prepend(settingsModalCont);
    settingsModalCont.focus();

    settingsModalCont.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("cancel-button")) {
            settingsModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { settingsModalCont.remove() }, 300);
            return;
        }

        if (target.classList.contains("confirm-button")) {
            const deletionConfirmationValue = settingsModalCont.querySelector(".confirm-deletion-option").checked;
            const showGuideValue = settingsModalCont.querySelector(".show-welcome-option").checked;
            const deadlineConfirmationValue = settingsModalCont.querySelector(".deadline-warning-option").checked;
            const defaultTabValue = settingsModalCont.querySelector(".default-tab-option").value;

            const validSelections = validateSettingsValues(["toggle", deletionConfirmationValue],
                ["toggle", showGuideValue], ["toggle", deadlineConfirmationValue], ["defaultTab", defaultTabValue])

            if (validSelections) {
                settingsValues['deletionConfirmation'] = deletionConfirmationValue;
                settingsValues['showGuide'] = showGuideValue;
                settingsValues['deadlineConfirmation'] = deadlineConfirmationValue;
                settingsValues['defaultTab'] = defaultTabValue;
            }

            console.log(settingsValues);

            settingsModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { settingsModalCont.remove() }, 300);
            return;
        }

    });

    settingsModalCont.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            settingsModalCont.children[0].classList.add("close-modal-animation");
            setTimeout(() => { settingsModalCont.remove() }, 300);
        }
    });
}