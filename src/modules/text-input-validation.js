const specialCharsRegex = /^[0-9a-z -]+$/i;

export function whiteSpacesAndDashesOnly(value) {
    if (!(specialCharsRegex.test(value))) {
        return false;
    }
    return true;
}