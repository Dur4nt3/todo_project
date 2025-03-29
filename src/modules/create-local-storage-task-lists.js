export function getBasicTaskList(basicTasks) {
    const taskList = [];
    for (let i in basicTasks) {
        let task = {
            title: basicTasks[i].title,
            description: basicTasks[i].description,
            priority: basicTasks[i].priority,
            completed: basicTasks[i].completionStatus
        }

        taskList.push(task);
    }

    return taskList;
}

export function getGroupedTaskList(groupedTasks) {
    const taskList = [];
    for (let i in groupedTasks) {
        let task = {
            title: groupedTasks[i].title,
            description: groupedTasks[i].description,
            group: groupedTasks[i].group,
            priority: groupedTasks[i].priority,
            completed: groupedTasks[i].completionStatus
        }

        taskList.push(task);
    }

    return taskList;
}

export function getDatedTaskList(datedTasks) {
    const taskList = [];
    for (let i in datedTasks) {
        let task = {
            title: datedTasks[i].title,
            description: datedTasks[i].description,
            deadline: datedTasks[i].deadline,
            allDay: datedTasks[i].allDay,
            priority: datedTasks[i].priority,
            completed: datedTasks[i].completionStatus
        }

        taskList.push(task);
    }

    return taskList;
}

export function getDatedGroupedTaskList(datedGroupedTasks) {
    const taskList = [];
    for (let i in datedGroupedTasks) {
        let task = {
            title: datedGroupedTasks[i].title,
            description: datedGroupedTasks[i].description,
            group: datedGroupedTasks[i].group,
            deadline: datedGroupedTasks[i].deadline,
            allDay: datedGroupedTasks[i].allDay,
            priority: datedGroupedTasks[i].priority,
            completed: datedGroupedTasks[i].completionStatus
        }

        taskList.push(task);
    }

    return taskList;
}

export function getRepetitiveTaskList(repetitiveTasks) {
    const taskList = [];
    for (let i in repetitiveTasks) {
        let task = {
            title: repetitiveTasks[i].title,
            description: repetitiveTasks[i].description,
            deadline: repetitiveTasks[i].deadline,
            allDay: repetitiveTasks[i].allDay,
            repetitionPattern: repetitiveTasks[i].repetitionPattern,
            repetitionValue: repetitiveTasks[i].repetitionValue,
            origin: repetitiveTasks[i].origin,
            clusterID: repetitiveTasks[i].clusterID,
            priority: repetitiveTasks[i].priority,
            completed: repetitiveTasks[i].completionStatus
        }

        taskList.push(task);
    }

    return taskList;
}

export function getRepetitiveGroupedTaskList(repetitiveGroupedTasks) {
    const taskList = [];
    for (let i in repetitiveGroupedTasks) {
        let task = {
            title: repetitiveGroupedTasks[i].title,
            description: repetitiveGroupedTasks[i].description,
            group: repetitiveGroupedTasks[i].group,
            deadline: repetitiveGroupedTasks[i].deadline,
            allDay: repetitiveGroupedTasks[i].allDay,
            repetitionPattern: repetitiveGroupedTasks[i].repetitionPattern,
            repetitionValue: repetitiveGroupedTasks[i].repetitionValue,
            origin: repetitiveGroupedTasks[i].origin,
            clusterID: repetitiveGroupedTasks[i].clusterID,
            priority: repetitiveGroupedTasks[i].priority,
            completed: repetitiveGroupedTasks[i].completionStatus
        }

        taskList.push(task);
    }
    
    return taskList;
}