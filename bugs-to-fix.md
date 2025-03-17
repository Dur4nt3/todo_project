# Bugs/Unintended Behavior/Future Patches:

- Add a pop-up for the "refresh" utility explaining it refreshes the current tab - *COMPLETE*

- Refactor code on "createXTabTasks" functions when removing the filter container and setting the no tasks message to ensure DRY - *COMPLETE*

- Refactor filter initial check logic to ensure DRY - *COMPLETE*

- Further refactor filter logic - *COMPLETE*

- Refactor task container build logic to reuse the code without needing to copy and paste it - *COMPLETE*

- Refactor tab header build logic to reuse the code without needing to copy and paste it - *COMPLETE*

- Filter by time: separate filter by time (latest first) and filter by time (earliest first) => either two separate options (easier) or logic - *COMPLETE*

- Add Names/ID to checkboxes - *COMPLETE*

- For tabs with dynamic headers (today & upcoming) make sure the refresh utility refreshes the header of the tab - *COMPLETE*

- Remove box shadow from deletion modal buttons - *COMPLETE*

- Fix upcoming task fetching (utilize the ability to compare dates) - *COMPLETE*

- Ensure originTasks are skipped in all fetching functions - *COMPLETE*

- For all containers with an overflow (with a parent with rounded borders) ensure that the scroll doesn't escape the border radius - *COMPLETE*

- Fix color labels not generating for groups that aren't initially listed (instead of breaking, generate label colors and continue) - *COMPLETE*

- Fix the option to name different groups the same new name, i.e., a name that doesn't exist in taskGroups - *COMPLETE*

- Remove console logs from "index.js"

- Ensure that allDay tasks cannot have an hourly repetition
