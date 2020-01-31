export default class LoadingPanel {

  constructor(domRef) {
    this.domRef = domRef;
    this.buffer = true;
    this.done = false;
    setTimeout(() => {
      this.buffer = false;
      this.addClass();
    }, 1500);
  }

  setDone() {
    this.done = true;
    if (!this.buffer) {
      this.addClass();
    }
  }

  addClass() {
    if (this.done) {
      this.domRef.classList.add("done");
    }
  }

}