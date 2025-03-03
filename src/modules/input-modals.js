import { isInputSingleDigitNumber } from "./number-input-validation.js";
import { buildElement } from "./dom-manipulator.js";
import { currentUpcomingRange, setUpcomingRange } from "./fetch-tasks.js";
import { forceHardRefresh } from "./ui-task-utilities.js";

function selectUpcomingRangeModal() {
    const modalCont = buildElement("div", "modal");
    modalCont.tabIndex = 0;

    const selectUpcomingRangeModalCont = buildElement("div", "modal-cont", "select-upcoming-range-modal");

    const inputLabel = buildElement("label", "select-upcoming-range-label");
    inputLabel.for = "select-upcoming-range-input";

    const rangeInput = buildElement("input", "select-upcoming-range-input");
    rangeInput.type = "number";
    rangeInput.min = 1;
    rangeInput.max = 4;
    rangeInput.maxLength = 1;
    rangeInput.name = "select-upcoming-range-input";
    rangeInput.placeholder = "1 - 4";

    const labelSpan1 = buildElement("span", "select-upcoming-range-text");
    const labelSpan2 = buildElement("span", "select-upcoming-range-text");
    labelSpan1.textContent = "Display all tasks within the next";
    labelSpan2.textContent = "weeks";

    inputLabel.appendChild(labelSpan1);
    inputLabel.appendChild(rangeInput);
    inputLabel.appendChild(labelSpan2);

    const buttonCont = buildElement("div", "select-upcoming-range-button-cont");

    const cancelButton = buildElement("button", "select-upcoming-range-button", "cancel-button");
    const confirmButton = buildElement("button", "select-upcoming-range-button", "confirm-button");
    cancelButton.textContent = "Cancel";
    confirmButton.textContent = "Confirm";

    buttonCont.appendChild(cancelButton);
    buttonCont.appendChild(confirmButton);

    selectUpcomingRangeModalCont.appendChild(inputLabel);
    selectUpcomingRangeModalCont.appendChild(buttonCont);

    modalCont.appendChild(selectUpcomingRangeModalCont);

    return modalCont;
}

function confirmUpcomingRangeSelection(input) {
    if (!isInputSingleDigitNumber(input, 1, 4)) {
        return false;
    }
    return true;
}

export function selectUpcomingRangeModalInteractivity(tabToDeleteClass, tabGenerationFunction) {
    const selectUpcomingModal = selectUpcomingRangeModal();

    document.body.prepend(selectUpcomingModal);
    selectUpcomingModal.focus();

    selectUpcomingModal.addEventListener("click", (e) => {
        const target = e.target;
        const rangeInput = selectUpcomingModal.querySelector(".select-upcoming-range-input");

        if (target.classList.contains("modal")) {
            selectUpcomingModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { selectUpcomingModal.remove(); }, 300);
            return;
        }

        else if (target.classList.contains("cancel-button")) {
            selectUpcomingModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { selectUpcomingModal.remove(); }, 300);
            return;
        }

        else if (target.classList.contains("confirm-button")) {
            if (!confirmUpcomingRangeSelection(rangeInput)) {
                rangeInput.id = "invalid-range-input";
                return;
            }
            setUpcomingRange(rangeInput.value);
            forceHardRefresh(tabToDeleteClass, tabGenerationFunction);
            selectUpcomingModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { selectUpcomingModal.remove(); }, 300);
            return;
        }
    });

    selectUpcomingModal.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            selectUpcomingModal.children[0].classList.add("close-modal-animation");
            setTimeout(() => { selectUpcomingModal.remove() }, 300);
        }
    });
}