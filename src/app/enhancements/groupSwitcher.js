import Frag from '../tools/Frag.js';
import Dispatch from '../tools/Dispatch.js';
import Switcher from './groupSwitchers/switcher.js';


export default class GroupSwitcher {

  constructor(domGroupSwitcher) {
    this.refs = {
      container: domGroupSwitcher,
      switchers: domGroupSwitcher.querySelectorAll(".marketing-survey__group-shifter__planet"),
    };

    this.init();
  }

  init() {
    // Add Listner for Each Switcher
    this.refs.switchers.forEach((domSwitcher) => {new Switcher(domSwitcher)});
  }

}