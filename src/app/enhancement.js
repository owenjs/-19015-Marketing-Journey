export default class Enhancement {

  constructor() {
    // ToDo
  }

  /**
   * setActiveState - Removes inactive class name and adds active 
   * class name onto the classes dom reference, if there is one
   */
  setActiveState(direction) {
    if (!this.domRef) { return }
    this.domRef.classList.remove("inactive--rev");
    this.domRef.classList.remove("inactive");

    this.domRef.classList.add("active" + ((direction == -1) ? '--rev' : ''));
  }

  /**
   * removeActiveState - Removes active class name and add inactive 
   * class name onto the classes dom reference, if there is one
   */
  removeActiveState(direction) {
    if (!this.domRef) { return }
    this.domRef.classList.remove("active--rev");
    this.domRef.classList.remove("active");
    this.domRef.classList.add("inactive" + ((direction == -1) ? '--rev' : ''));
  }

}