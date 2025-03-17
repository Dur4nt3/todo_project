# Functionalities yet to be implemented:

**Mark as completing**

- **Implement all getter/setter checks as individual functions that run even before the object is created**

- Ability to change task types between: basic, dated, grouped, datedGrouped - *COMPLETE*

- Ability to change tasks into repetitive ones (use the given task as a template for the origin)

- Ability to change task clusters' title/description/group

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

    2) Type 2 - Editable: Modal that both include a task's information and include an option to edit the task's details

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

        - Information about task creation

        - Information about groups, listing positions, unlisted groups - *COMPLETE*

        - Information about the filters earliest first and latest first and their interaction with an all-day task

        - Information about repetitive tasks

- Settings:

**Create a settings modal that includes the following options:**

Settings will be saved to the localStorage using a JSON object with settings as properties

    1) Do not show deletion confirmation => for non-repetitive tasks => dismiss the modal

    2) Do not show welcome message => by default a welcome message will appear when visiting the page containing useful information => dismiss the message
    *That same welcome message will appear under the "Help" tab*

    3) Modal Coloring: Based on priority | light gray regardless of priority

- Create an initial load modal that displays a loader => once all the initial load functions finish executing => remove the modal

- Edit Tasks:

**Reuses various functions from the "add tasks" functionality**

Interactions to watch for:

    1) Changing group names: unlike "add tasks" allow for blank group names and treat them as "__unlisted__"

    2) Repetitive Tasks - changing names/descriptions/priorities/group names: have a modal popup asking whether to submit the changes to all tasks or only that task

    3) Repetitive Tasks - changing deadline: if a user changes the deadline for a repetitive task => remove that task from the cluster (this ensures the new date doesn't effect the repetition generation)

    4) Repetitive Tasks - changing repetition pattern/value:  delete all future tasks (i.e., tasks with deadlines after the current day) and change the repetition pattern to the new one to all remaining tasks in the cluster