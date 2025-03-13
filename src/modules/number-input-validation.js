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