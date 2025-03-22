// This module is used to validate number inputs/inputs that should be numbers

export function isSingleDigitNumber(value) {
    if (value.length > 1) {
        return false;
    }
    const numberValue = Number(value);
    if (numberValue === NaN) {
        return false;
    }
    return true;
}

export function isNumberInRange(number, min, max) {
    if (number < min || number > max) {
        return false;
    }
    return true;
}

export function isInputSingleDigitNumber(input, min, max) {
    if (!isSingleDigitNumber(input.value)) {
        return false;
    }
    if (!isNumberInRange(Number(input.value), min, max)) {
        return false;
    }

    if (!Number.isInteger(Number(input.value))) {
        return false;
    }

    return true;
}

export function canConvertToInteger(value) {
    if (Number(value) === NaN) {
        return false;
    }

    const num = Number(value);

    if (!(Number.isInteger(num))) {
        return false;
    }

    return true;
}

export function noBlanksOrExponentsInteger(value) {
    if (!(canConvertToInteger(value))) {
        return false;
    }

    if (value.includes("e") || value.includes("E") || value === "") {
        return false;
    }

    return true;
}

export function isPositiveInteger(value) {
    if (!(canConvertToInteger(value))) {
        return false;
    }

    if (Number(value) <= 0) {
        return false;
    }

    return true;
}

export function isInputValidPositiveInteger(value) {
    if (!(noBlanksOrExponentsInteger(value)) || !(isPositiveInteger(value))) {
        return false;
    }

    return true;
}