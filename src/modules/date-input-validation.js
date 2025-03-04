import { isValid, getYear } from "../../node_modules/date-fns";

// Validator for three different inputs: day, month, year
export function isValidDate3Inputs(day, month, year) {
    if (day === "" && month === "" && year === "") {
        return true;
    }

    if (day !== "" && (month === "" || year === "")) {
        return false;
    }

    else if (month !== "" && (day === "" || year === "")) {
        return false;
    }

    else if (year !== "" && (month === "" || day === "")) {
        return false;
    }

    // Ensures proper "DD", "MM", "YYYY" format
    if (Number(day) < 10 && !(day[0] === "0")) {
        return false;
    }
    else if (Number(month) < 10 && !(month[0] === "0")) {
        return false;
    }
    else if (year.length !== 4) {
        return false;
    }

    const fullDate = year + "-" + month + "-" + day;
    return true;
}