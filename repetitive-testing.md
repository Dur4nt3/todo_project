const repetitiveTask = createRepetitiveTask("repetitive task", "checking repetition",
    "2025-02-17T12:30:00", false, "hybrid-weekly", [[1,3,5], {"weeks": 1}], true, 2, null
);
const repetitiveTask2 = createRepetitiveTask("repetitive task2", "checking repetition2",
    "2025-03-11T12:30:00", false, "hybrid-weekly", [[0,2,4], {"weeks": 2}], true, 2, null
);

const repetitiveGroupedTask = createRepetitiveGroupedTask("repetitive & grouped task", "checking repetition & groups",
    "__unlisted__", "2025-02-21", true, "hybrid-monthly", [1,3,{ "months": 1 }], true, 3, null
);

repetitionGenerator.generateRepetition(repetitiveTask, true);
repetitionGenerator.generateRepetition(repetitiveTask2, true);
repetitionGenerator.generateRepetition(repetitiveGroupedTask, true);


console.log(taskUtil.taskCollection);
console.log(taskUtil.taskGroups);

let count = 0;

for (let index in taskUtil.taskCollection.repetitiveGrouped) {
    count++;
    let task = taskUtil.taskCollection.repetitiveGrouped[index];
    console.log(task.title, task.id, task.clusterID, task.origin, task.deadline, task.group);
    console.log("Task on Day:", getDay(Date.parse(task.deadline)));
}

for (let index in taskUtil.taskCollection.repetitive) {
    count++;
    let task = taskUtil.taskCollection.repetitive[index];
    console.log(task.title, task.id, task.clusterID, task.origin, task.deadline);
    console.log("Task on Day:", getDay(Date.parse(task.deadline)));
}

console.log(count);

count = 0;

remove.removeClusterFromTaskCollection(repetitiveTask.clusterID, "repetitive");
remove.removeClusterFromTaskCollection(repetitiveGroupedTask.clusterID, "repetitiveGrouped");
console.log(taskUtil.taskCollection);
console.log(taskUtil.taskGroups);


for (let index in taskUtil.taskCollection.repetitive) {
    count++;
    let task = taskUtil.taskCollection.repetitive[index];
    console.log(task.title, task.id, task.clusterID, task.origin, task.deadline);
    console.log("Task on Day:", getDay(Date.parse(task.deadline)));
}

console.log(count);