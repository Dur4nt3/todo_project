// Extracts details from a basic task to be used in a conversion function
function extractBasicTaskDetails(basicTask) {
    return { title: basicTask.title, description: basicTask.description, priority: basicTask.priority };
}

// Extracts details from a dated task to be used in a conversion function
function extractDatedTaskDetails(datedTask) {
    return { 
        title: datedTask.title, description: datedTask.description,  deadline: datedTask.deadline,
        allDay: datedTask.allDay, priority: datedTask.priority
    };
}

// Extracts details from a grouped task to be used in a conversion function
function extractGroupedTaskDetails(groupedTask) {
    return { 
        title: groupedTask.title, description: groupedTask.description,  
        group: groupedTask.group, priority: groupedTask.priority
    };
}

// Extracts details from a dated and grouped task to be used in a conversion function
function extractDatedGroupedTaskDetails(datedGroupedTask) {
    return { 
        title: datedGroupedTask.title, description: datedGroupedTask.description,
        group: datedGroupedTask.group, deadline: datedGroupedTask.deadline,
        allDay: datedGroupedTask.allDay, priority: datedGroupedTask.priority
    };
}

// Convert a basic task to a dated one (with a deadline)
export function basicToDated(basicTask) {

}

// Convert a dated task to a basic one (without a deadline)
export function datedToBasic(datedTask) {

}

// Convert a basic task to grouped one (with a group name)
export function basicToGrouped(basicTask) {

}

// Convert a grouped task to a basic one (without a group name)
export function groupedToBasic(groupedTask) {

}

// Convert a dated task to a grouped task (without a deadline)
export function datedToGrouped(datedTask) {

}

// Convert a dated task to a dated & grouped task (with a deadline)
export function datedToGroupedDated(datedTask) {

}

// Convert a grouped task to a dated one (without a group)
export function groupedToDated(groupedTask) {

}

// Convert a grouped task to a dated one (with a group)
export function groupedToDatedGrouped(groupedTask) {

}

// Convert a dated and grouped task to a grouped one (without a deadline)
export function datedGroupedToGrouped(datedGroupedTask) {

}

// Convert a dated and grouped task to a dated one (without a group)
export function datedGroupedToDated(datedGroupedTask) {
    
}