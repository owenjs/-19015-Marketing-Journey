import Dispatch from './Dispatch.js';

// {
//    looping
//    process
// }

class State {

  constructor(domElement) {
    this.ref = domElement;
  }

  setActive() {
    this.ref.classList.remove("inactive");
    this.ref.classList.add("active");
  }

  removeActive() {
    this.ref.classList.remove("active");
    this.ref.classList.add("inactive");
  }

}

export default class ActiveStateMachine {

  constructor(domElements, callBacks) {
    this.elements = [];
    this.looping = false;
  }

  setElements(domElements, callBacks) {
    this.callBacks = callBacks;
    domElements.forEach((domEl) => {
      this.elements.push(new State(domEl))
    });
    this.elements = domElements;
    this.max = this.elements.length - 1;
    // Make the First Element Active
    this.moveTo(0);
  }

  moveTo(id) {
    if (id > this.max) {
      console.log(`Can't jump to id ${id}`);
    }
    if (this.activeId) {
      this.elements[this.activeId].removeActive();
    }
    this.activeId = id;
    this.elements[this.activeId].setActive();
  }

  next() {
    if (!this.activeId) {
      console.log(`No Elements have been set for this State Machine`);
    }
    this.elements[this.activeId].removeActive();
    this.activeId++;
    this.elements[this.activeId].setActive();
  }

}