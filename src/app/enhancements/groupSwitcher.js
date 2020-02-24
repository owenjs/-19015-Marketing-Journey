import Switcher from './groupSwitchers/switcher.js';

export default class GroupSwitcher {

  constructor(domGroupSwitcher) {
    this.refs = {
      container: domGroupSwitcher,
      drag: domGroupSwitcher.querySelector(".marketing-survey__group-shifter__drag"),
      switchers: domGroupSwitcher.querySelectorAll(".marketing-survey__group-shifter__planet"),
      progressBar: domGroupSwitcher.querySelector(".marketing-survey__group-shifter__progress"),
    };
    this.activeGroupSwitcher = 0;
    this.groupSwitchers = [];

    this.init();
  }

  init() {
    // Add Listner for Each Switcher
    this.refs.switchers.forEach((domSwitcher, id) => {
      this.groupSwitchers.push(new Switcher(domSwitcher, id, {
        fnSetActive: (id) => { this.setActive(id) },
        fnHandleGroupSwitch: (id) => { this.handleGroupSwitch(id) },
      }));
    });
    // Set the First Switcher as the Active one
    this.groupSwitchers[this.activeGroupSwitcher].setActiveState();

    // Find the Value to move left by for each Group Switch
    this.range = this.refs.drag.clientWidth / this.groupSwitchers.length;
  }

  // Sets given id as the active group switcher
  setActive(id) {
    // Make Current Inactive
    this.groupSwitchers[this.activeGroupSwitcher].removeActiveState();
    this.activeGroupSwitcher = id;
    // Make Next Active
    this.groupSwitchers[this.activeGroupSwitcher].setActiveState();
    this.handleGroupSwitch(id);

    // Update the Progress Bar
    let progressPercent = (100 / this.groupSwitchers.length) * id;
    this.refs.progressBar.style.width = progressPercent + "vw";
  }

  handleGroupSwitch(id) {
    if (!this.refs.drag.GS_LEFT) {
      this.refs.drag.GS_LEFT = 110;
    }
    this.refs.drag.GS_LEFT -= this.range;

    this.refs.drag.style.left = this.refs.drag.GS_LEFT + "px";
  }

}