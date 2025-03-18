// This module is used to perform various manipulations on DOM elements (and various other DOM-related operations)

export function hide(element) {
    element.classList.add("hide");
}

export function show(element) {
    element.classList.remove("hide");
}

export function buildElement(type, ...classNames) {
    const createdElement = document.createElement(type);
    createdElement.classList.add(...classNames);
    
    return createdElement;
}

export function buildSelectElement(id, ...options) {
    const inputCont = buildElement("div", "select-input-cont");

    const selectElement = buildElement("select", id);
    selectElement.id = id;

    // options is an array of options, each option is an array with the value name and the display text [value, display]
    for (let i in options) {
        let option = document.createElement("option");
        option.value = options[i][0];
        option.textContent = options[i][1];

        selectElement.appendChild(option);
    }

    const focusSpan = buildElement("span", "focus-select");

    inputCont.appendChild(selectElement);
    inputCont.appendChild(focusSpan);

    return inputCont;
}

export function buildImgElement(src, alt, ...classNames) {
    const imgElement = buildElement("img", ...classNames);
    imgElement.src = src;
    imgElement.alt = alt;

    return imgElement;
}