# Notes:

### Basic Information:

- repetitive task: Two types: 1) Grouped | 2) Ungrouped

- On creation create an unlisted origin task: holds all the details that other tasks can fetch from accurately

### Additional Notable Logic:

- Title, Description: Two options: 1) Update for this task | 2) Update for all tasks

- Implementing the above:

**Changing all sub tasks:**

1) Generate a "clusterID" => that id will be given to every sub task of a repetitive tasks
*sub tasks will have different IDs but the same cluster IDs*

2) When attempting to apply title and/or description changes to all sub tasks simply apply the changes to the origin task first and then to all sub tasks with the same "clusterID".
*sub tasks with the same clusterID are sub tasks that are a part of a singular  general task that repeats itself*

**Changing only 1 sub task:**

1) simply change based on the task's unique task id
*Don't change the origin task's details*

### Deadline Changes:

- The user either changes a specific sub task's deadline or changes the origin repetition pattern and/or repetition pattern value:

    1) Changes for specific deadline => change based on unique task ID
    *The same goes for deadline overrides, simply override the deadline to a specific sub task*

    2) Changes for origin repetition pattern and/or repetition pattern value: from the present day => delete all scheduled sub tasks => using the cluster ID change the repetition pattern and/or repetition pattern values to all sub tasks within the cluster (including and most importantly the origin) => generate tasks using the origin

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

- repetitionPattern info: "hybrid-weekly": repeat on certain days every x weeks

- repetitionPattern info: "hybrid-monthly": repeat on the 1st/2nd/3rd/4th x-day of the month every y months || repeat on the end of each month

*Disclaimer: using the "time" pattern and repeating on the 30th of the month is an issue => after getting to february, because february doesn't have a 30th it will automatically retroactively change all tasks to repeat on the 28th*
*This is still essentially respecting the pattern but the user might want something more nuanced, therefore, "hybrid-monthly" can be a good solution*
*Additional disclaimer: hybrid monthly on the start of each month might be redundant as setting pattern "time" with {"months": 1} to a deadline set on the 1st of each month will not pose an issue*

**repetitionValue property:**

- Value for "time" pattern: the following object structure: { years: x, months: y, weeks: z, ...  }
*The user chooses a repeat pattern and an object is dynamically created, said object can than be used in the date-fns "add" function*

- Value for "day" pattern: the following array structure: ["day1", "day2", ...]
*The user chooses days of the week to repeat the pattern on and an array including those days are dynamically created*
**When generating tasks, increment the latest date by one day until you hit a day that is an element in the array, when you do => create a task with that deadline (after formatting it) and with the same cluster id**

- Value for "hybrid-weekly" pattern: the following array structure: [["day1", "day2", ...], { weeks: x }]
*Simply repeat every x weeks on the specified days*
*After reaching the final day in the rotation, jump to the first day mentioned in the pattern and jump x weeks forward as specified*

- Value for "hybrid-monthly" pattern: the following array structure: [1|2|3|4|f, 0|1|2|3|4|5|6, { months: x }] || [e, { months: x }]
*1 - First occurrence of specified day; 2 - Second occurrence of specified day; 3 - third occurrence of specified day; 4 - forth occurrence of specified day; f - final occurrence of specified day; e - the last day of the month*

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

**On page load: run the above for every origin task**

- Generation based on timing: 

    1) up-until 12 hours: generate weekly (i.e., 1 week ahead) >=12 hours

    2) 12 hours to 1 day: generate monthly (i.e., 1 month ahead) 12-24 hours

    3) 1 day to 7 days: generate quarterly (i.e., 3 months ahead) 24-168 hours

    4) 7 days to 14 days: generate 6-months ahead 168-336 hours

    5) 14 days to 30 days: generate 1 years ahead 336-720 hours

    6) 30 days to 90 days: generate 2 years ahead 720-2160 hours

    7) 90 days+: generate 5 years ahead 2160+ hours


# ------------------- To Do 1 - Fixed ---------------

- When creating tasks with the "time" pattern ensure to clone the origin task as it isn't listed and therefore the first intended task will be missed

- A similar bug occurs for the "day" pattern, if the deadline of the origin task is on a day specified by the pattern value, the first intended task will be missed as the origin isn't listed

**Possible fixes: On the initial generation (i.e., post creation) simply clone the origin**

*Fix side-effect:*

- For the "day" pattern, if the user chooses an initial deadline that isn't on a day specified by the pattern value, the initial task will be listed on a day not specified by the pattern value.

**This isn't necessarily bad:**

- For example, if the user sets a repeat for monday and wednesday and the initial task is set for tuesday it gives the user the ability to start the repetition cycle from a date the user chose.
This prevents assuming the user's desires, e.g., maybe the user intends to start the above cycle on a tuesday.
If the user doesn't intend to do such, they can simply choose an appropriate deadline that is on a day the is in the pattern value.

*This gives the user more freedom when it comes to task configuration*

**Update: This was fixed via an initialization function that simply cloned the origin**

# ------------------- To Do 2 - Implemented ---------------

- "hybrid-monthly": 

    1) for repeat on the 1st of x day every y months: simply fetch the start of the month and increase the date by 1 day until hitting the specified day

    2) repeat every 2nd/3rd/4th of x day every y months: fetch the first occurrence of the day via the above function => increase the date by 1/2/3 weeks accordingly

    3) repeat on the final occurrence of x day every y months: fetch the end of the month and decrease the date by 1 day until hitting the specified day

    4) repeat on the final day of the month every y months: fetch the end of the month

- Helpful functions: date-fns: endOfMonth => returns the end of the month from a given date | startOfMonth => similar to "endOfMonth" but returns the start of the month

# ------------------- To Do 3 - Fixed ---------------

- Change schedulingLimit to a const

- Change import from repetitive task utilities to import * (no need to specify individual functions)

# ------------------- To Do 4 ---------------

- Re-use the "jumpTo..." functions in "day" pattern generation to optimize the algorithm