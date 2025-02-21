import { generateGroupList } from "./create-groups-cont.js";
import { createTodayTab } from "./create-today-tab.js";

export default function initialLoad() {
    generateGroupList();
    createTodayTab();
}