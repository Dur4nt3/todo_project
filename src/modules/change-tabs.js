function makeActive(tab) {
    const functionalitiesCont = tab.parentNode;
    const functionalitiesChildrenArray = Array.from(functionalitiesCont.children);

    // Remove the "active-tab" class from the currently active tab
    for (let index in functionalitiesChildrenArray) {
        let functionalityCont = functionalitiesChildrenArray[index];
        if (functionalityCont.classList.contains("active-tab")) {
            functionalityCont.classList.remove("active-tab");
        }
    }

    tab.classList.add("active-tab");
}

export function changeTab(tab) {
    makeActive(tab);
}

function makeGroupTabActive(groupCont) {
    const groupListCont = groupCont.parentNode;
    const groupListChildrenArray = Array.from(groupListCont.children);

    for (let index in groupListChildrenArray) {
        let groupCont = groupListChildrenArray[index];
        if (groupCont.classList.contains("active-group-tab")) {
            groupCont.classList.remove("active-group-tab");
        }
    }

    groupCont.classList.add("active-group-tab");
}

export function changeGroupTab(groupCont) {
    makeGroupTabActive(groupCont);
}