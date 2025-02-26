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

- Add a pop-up for the "refresh" utility explaining it refreshes the current tab

- Decide whether to incorporate a custom scrollbar

- Task modals:

    1) Type 1 - Not Editable: Modals that include a task's information but don't include an option to edit the task's details - *COMPLETE*

    2) Type 2 - Editable: Modal that both include a task's information and include an option to edit the task's details

- Settings:

**Create a settings tab that includes the following options:**

Settings will be saved to the localStorage using a JSON object with settings as properties

    1) Do not show deletion confirmation => for non-repetitive tasks => dismiss the modal

    2) Do not show welcome message => by default a welcome message will appear when visiting the page containing useful information => dismiss the message
    *That same welcome message will appear under the "Help" tab*

    3) Modal Coloring: Based on priority | light gray regardless of priority


