import Dispatch from '../../tools/Dispatch.js';

export default class Switcher {

  constructor(domSwitcher) {
    this.refs = {
      switcher: domSwitcher,
    };

    this.findGroupName();
    this.addListener();

    // ToDo: Listener for GROUP_CHANGE dispatcher, being active if necessary 
  }

  findGroupName() {
    let title = this.refs.switcher.querySelector(".marketing-survey__group-shifter__planet__title");
    this.title = title.innerHTML;
  }

  addListener() {
    this.refs.switcher.addEventListener('click', (event) => {
      Dispatch.dispatch('GROUP_SWITCH', {
        groupTitle: this.title,
      });
    });
  }

}