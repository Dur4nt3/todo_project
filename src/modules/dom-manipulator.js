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