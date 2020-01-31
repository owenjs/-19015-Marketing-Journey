import Dispatch from '../../tools/Dispatch.js';
import Enhancement from '../../enhancement.js';

export default class Switcher extends Enhancement {

  constructor(domSwitcher, id, classInfo) {
    super(); // Creates 'this'
    this.domRef = domSwitcher;
    this.id = id;
    this.classInfo = classInfo;

    this.findGroupName();

    Dispatch.addToDispatchGroup('GROUP_CHANGE', (info) => { this.handleGroupSwitch(info) });
  }

  findGroupName() {
    let title = this.domRef.querySelector(".marketing-survey__group-shifter__planet__title");
    this.title = title.innerHTML.replace('&amp;', 'and');
  }

  handleGroupSwitch(info) {
    if (this.title == info.groupTitle) {
      this.classInfo.fnSetActive(this.id);
    }
  }

}