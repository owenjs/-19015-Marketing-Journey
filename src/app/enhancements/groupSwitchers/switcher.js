import Dispatch from '../../tools/Dispatch.js';
import Enhancement from '../../enhancement.js';

export default class Switcher extends Enhancement {

  constructor(domSwitcher, id, classInfo) {
    super(); // Creates 'this'
    this.domRef = domSwitcher;
    this.id = id;
    this.classInfo = classInfo;

    this.findGroupName();
    this.addListener();

    // ToDo: Listener for GROUP_CHANGE dispatcher, become active if necessary 
  }

  findGroupName() {
    let title = this.domRef.querySelector(".marketing-survey__group-shifter__planet__title");
    this.title = title.innerHTML.replace('&amp;', 'and');
  }

  addListener() {
    this.domRef.addEventListener('click', (event) => {
      Dispatch.dispatch('GROUP_SWITCH', {
        groupTitle: this.title,
      });
      this.classInfo.fnSetActive(this.id);
    });
  }

}