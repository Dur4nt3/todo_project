export function isSingleDigitNumber(value) {
    console.log(value.length);
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