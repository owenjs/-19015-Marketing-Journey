import Frag from '../tools/Frag.js';
import Dispatch from '../tools/Dispatch.js';
import Switcher from './groupSwitchers/switcher.js';


export default class GroupSwitcher {

  constructor(domGroupSwitcher) {
    this.refs = {
      container: domGroupSwitcher,
      switchers: domGroupSwitcher.querySelectorAll(".marketing-survey__group-shifter__planet"),
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
      }));
    });
    // Set the First Switcher as the Active one
    this.groupSwitchers[this.activeGroupSwitcher].setActiveState();
  }

  // Sets given id as the active group switcher
  setActive(id) {
    // Make Current Inactive
    this.groupSwitchers[this.activeGroupSwitcher].removeActiveState();
    this.activeGroupSwitcher = id;
    // Make Next Active
    this.groupSwitchers[this.activeGroupSwitcher].setActiveState();
  }

}