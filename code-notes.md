# Notes:

### Basic Information:

- repetitive task: Two types: 1) Grouped | 2) Ungrouped

### Additional Notable Logic:

- Title & Description: Two options: 1) Update for this task | 2) Update for all tasks

**Possibly add an "originTask" property to discern the first task of the cluster from the cloned tasks**

- Implementing the above:

**Changing all sub tasks:**

1) Generate an "clusterID" => that id will be given to every sub task of a repetitive tasks
*sub tasks will have different IDs but similar cluster IDs*

2) When attempting to apply title and/or description changes to all sub tasks simply apply the changes to all sub tasks with the same "clusterID".
*sub tasks with the same clusterID are sub tasks that are a part of a singular task that repeats itself*

**Changing only 1 sub task:**

1) simply change based on the task's unique task id

### Properties and Methods:

- Properties and methods for repetitive tasks: Basic task functionality + dated task functionality + grouped task functionality (depending on task type) 

**repetitionPattern property:**

- Unique properties and methods for repetitive task: Property: repetitionPattern: "time"|"day"|"hybrid"

- repetitionPattern info: "time": repeat every x (days, weeks, months, etc.) time 

- repetitionPattern info: "day": repeat on day x

- repetitionPattern info: "hybrid": repeat every x time on day y

**repetitionValue property:**

**clusterID:**


### Generating the Tasks:

- Repetitive task generation: generate tasks based on repetition timing => on every page load repeat that generation process

- Generation based on timing: 

    1) up-until 12 hours: generate weekly (i.e., 1 week ahead)

    2) 12 hours to 1 day: generate monthly (i.e., 1 month ahead)

    3) 1 day to 7 days: generate quarterly (i.e., 3 months ahead)

    4) 7 days to 14 days: generate 6-months ahead

    5) 14 days to 30 days: generate 1 years ahead

    6) 30 days to 90 days: generate 2 years ahead

    7) 90 days+: generate 5 years ahead
