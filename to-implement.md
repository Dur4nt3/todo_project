# Functionalities yet to be implemented:

**Mark as completing**

- **Implement all getter/setter checks as individual functions that run even before the object is created**

- Ability to change task types between: basic, dated, grouped, datedGrouped - *COMPLETE*

- Ability to remove task clusters - *COMPLETE*

- Ability to remove individual tasks via unique ID - *COMPLETE*

- Today tab: 

    1) Ability to show/hide completed tasks - change how you fetch today's tasks from the utility functions - *COMPLETE*

    2) Sort tasks - Either by priority or by time (timed first, allDay later; sort timed by hour) - *COMPLETE*

    3) Filters - Fix "choose-one" filters being disabled when disabling "Show Completed" filter - *COMPLETE*

- Create a confirmation modal when deleting tasks - *COMPLETE*

- Create a "refresh" utility for every tab to regenerate the contents of the tab (without reloading the window) - *COMPLETE*

- Add animation to filter container - *COMPLETE*

- Task modals:

    1) Type 1 - Not Editable: Modals that include a task's information but don't include an option to edit the task's details - *COMPLETE*

    2) Type 2 - Editable: Modal that both include a task's information and include an option to edit the task's details - *COMPLETE*

- Search tab:

    1) Fetch all tasks (completed included) & save in an array specifically made for the search tab (array regenerates on tab refresh) - *COMPLETE*

    2) On button press match search value to tasks title, if a task's title contains the search value, display it - *COMPLETE*

    3) Tune: "Advanced Search" option, allow to search tasks in a given date range, allow to search tasks by groups - *COMPLETE*

- Edit Groups: the initial color of the input label "change-label-color-label" will match the group's color label - *COMPLETE*
 
- Edit Groups: when a user picks a new color via the input the label will change color accordingly - *COMPLETE*

- Custom Scroll-bars - *COMPLETE*

- Edit Groups: Submission: 
    1) execute the process function => if false => raise error => if true continue - *COMPLETE*

    2) Exit the modal - *COMPLETE*

    3) Clear the group list container - *COMPLETE*

    4) Re-generate the group list container - *COMPLETE*

- Help:

    1) A modal with multiple pages that can be scrolled through both via left and right arrow icons and indicators in the middle that represent the page number
    *Page indicators should be rectangles that are enlarged and have a glowing white background when you're on their respective page*
    *Concept - Image Carousel like design*

    2) Information in the modal:

        - Information about task creation- *COMPLETE*

        - Information about groups, listing positions, unlisted groups - *COMPLETE*

        - Information about the filters earliest first and latest first and their interaction with an all-day task - *COMPLETE*

        - Information about repetitive tasks - *COMPLETE*

- Edit Tasks:

**Reuses various functions from the "add tasks" functionality**

Interactions to watch for:

    1) Changing group names: unlike "add tasks" allow for blank group names and treat them as "__unlisted__" - *COMPLETE*

    2) Repetitive Tasks - changing names/descriptions/priorities/group names: have a modal popup asking whether to submit the changes to all tasks or only that task - *COMPLETE*

    3) Repetitive Tasks - changing deadline: if a user changes the deadline for a repetitive task => remove that task from the cluster (this ensures the new date doesn't effect the repetition generation) - *COMPLETE*

    4) Repetitive Tasks - changing repetition pattern/value:  delete all future tasks (i.e., tasks with deadlines after the current day, meaning don't delete the duplicate created on the initialization) and change the repetition pattern to the new one to all remaining tasks in the cluster - *COMPLETE*

**Checks to make:** What happens when a user deletes the origin duplicate and then makes changes to the repetition pattern:

    1) When all listed tasks are deleted due to all of them being in the future - *COMPLETE*

    2) When the latest task is in the past but in a later date than the duplicate - *COMPLETE*

**Pattern Changes Interactions:** 

    1) If the only task remaining after the preparation is the origin => initialize - *COMPLETE*

    2) If there were tasks remaining after the preparation (other than the origin) => no need to initialize - *COMPLETE*

- Repetitive tasks confirmation modals: task deletion => cluster/individual | name/description/group changes => cluster/individual - *COMPLETE*

- Create a function that essentially simulates a page refresh => refreshes all tabs - *COMPLETE*

- Settings:

**Create a settings modal that includes the following options:**

Settings will be saved to the localStorage using a JSON object with settings as properties

    1) Do not show deletion confirmation => for non-repetitive tasks => dismiss the modal

    2) Do not show welcome message => by default a welcome message will appear when visiting the page containing useful information => dismiss the message
    *That same welcome message will appear under the "Help" tab*

    3) Do not show warning when changing the deadline of repetitive tasks

    4) Default Tab => Search/Today/Upcoming/Past Due/All Tasks/Completed

- Local Storage:

    1) Task Storage: store by type

    **For repetitive tasks: create the origin => generate repetition => copy details by comparing dates**

    2) Groups: store only group listing positions and color labels the groups themselves are automatically created when creating a task

    3) Settings: one object for all settings

- Create an initial load modal that displays a loader => once all the initial load functions finish executing => remove the modal