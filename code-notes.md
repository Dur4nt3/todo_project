# Notes:

### Basic Information:

- repetitive task: Two types: 1) Grouped | 2) Ungrouped

- On creation create an unlisted origin task: holds all the details that other tasks can fetch from accurately

### Additional Notable Logic:

- Title, Description, Deadline: Two options: 1) Update for this task | 2) Update for all tasks

- Implementing the above:

**Changing all sub tasks:**

1) Generate an "clusterID" => that id will be given to every sub task of a repetitive tasks
*sub tasks will have different IDs but similar cluster IDs*

2) When attempting to apply title and/or description and/or deadline changes to all sub tasks simply apply the changes to the origin task first and then to all sub tasks with the same "clusterID".
*sub tasks with the same clusterID are sub tasks that are a part of a singular  general task that repeats itself*

**Changing only 1 sub task:**

1) simply change based on the task's unique task id
*Don't change the origin task's details*

### Removal Logic:

- Similar if not identical to the logic in ["Additional Notable Logic"](#additional-notable-logic)

- Choose whether to remove a specific sub task in cluster or the whole task

- When deleting the whole task => delete the origin => simulate the deletion of all sub tasks within the cluster

- When removing a specific task => simply remove the sub task via its unique id

### Properties and Methods:

- Properties and methods for repetitive tasks: Basic task functionality + dated task functionality + grouped task functionality (depending on task type)

**originTasK property:**

- Will have a true/false value

- Indicates whether a task is an origin task or a sub task

- Origin tasks are unlisted and solely used to ensure that the sub tasks' information is valid without compromising functionality

- On generation if the task with the latest date is the origin simply recreate a sub task with the same details as the origin just with "originTask" property set to false
*The above ensures we are not missing the first deadline before repetition as origin tasks are unlisted*

**repetitionPattern property:**

- Unique properties and methods for repetitive task: Property: repetitionPattern: "time"|"day"|"hybrid"

- repetitionPattern info: "time": repeat every x (days, weeks, months, etc.) time 

- repetitionPattern info: "day": repeat on day x

- repetitionPattern info: "hybrid": repeat every x time on day y

**repetitionValue property:**

- Value for "time" pattern: the following object structure: { years: x, months: y, weeks: z, ...  }
*The user chooses a repeat pattern and an object is dynamically created, said object can than be used in the date-fns "add" function*

- Value for "day" pattern: the following array structure: ["day1", "day2", ...]
*The user chooses days of the week to repeat the pattern on and an array including those days are dynamically created*
**When generating tasks, increment the latest date by one day until you hit a day that is an element in the array, when you do => create a task with that deadline (after formatting it) and with the same cluster id**

- Value for "hybrid" pattern: the following array structure: [["day1", "day2", ...], { years: x, months: y, weeks: z, ... }]
*Loop count formula: time / (day count) => rounded, e.g., every 2 week on monday and wednesday is 2 weeks / 2 days => 1 week => generate quarterly*
*First iteration: loop until the end of the week and check whether you match the day pattern, if matching the day pattern => generate tasks accordingly*
*After finishing the first iteration, regardless of whether or not tasks were generated, simply increase the date by the specified time and repeat the process in the first iteration starting from monday*

*Example: repeat every 2 week on monday and wednesday: currently tuesday => loop until sunday => when hitting wednesday create a task => continue until sunday without creating any tasks.*
*After iterating through sunday => increase date by two weeks => date should now be monday two weeks from the initial tuesday => again loop until sunday => create tasks when hitting monday and wednesday*
*Repeat the process until the date limit*


**clusterID:**

**Formatting New Deadlines:**

*Getting date without time:*
```
let date = add(new Date(), { months: 3 });

let year = getYear(date).toString();
let month = (getMonth(date) + 1).toString();
let day = getDate(date).toString();

if (month < 10) {
    month = "0" + month;
}
if (day < 10) {
    day = "0" + day;
}

console.log(year+"-"+month+"-"+day);
```
In the actual code, the timing will vary greatly depending on the user's selection but the formatting specifically for the dated portion should remain.

*Getting time:*

let deadline = "2025-03-14T13:45:30"

console.log(deadline.slice(-9));

If the task is time, the above output will be added to the output of the formatted date giving a fully timed deadline.

It is important to note that the time will be fetched from the origin.

### Generating the Tasks:

- Repetitive task generation: generate tasks based on repetition timing => on every page load repeat that generation process

- Generation based on timing: 

    1) up-until 12 hours: generate weekly (i.e., 1 week ahead) >=12 hours

    2) 12 hours to 1 day: generate monthly (i.e., 1 month ahead) 12-24 hours

    3) 1 day to 7 days: generate quarterly (i.e., 3 months ahead) 24-168 hours

    4) 7 days to 14 days: generate 6-months ahead 168-336 hours

    5) 14 days to 30 days: generate 1 years ahead 336-720 hours

    6) 30 days to 90 days: generate 2 years ahead 720-2160 hours

    7) 90 days+: generate 5 years ahead 2160+ hours
