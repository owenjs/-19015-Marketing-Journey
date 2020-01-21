export default class Enhancement {

  constructor() {
    // ToDo
  }

  /**
   * setActiveState - Removes inactive class name and adds active 
   * class name onto the classes dom reference, if there is one
   */
  setActiveState() {
    if (!this.domRef) { return }
    this.domRef.classList.remove("inactive");
    this.domRef.classList.add("active");
  }

  /**
   * removeActiveState - Removes active class name and add inactive 
   * class name onto the classes dom reference, if there is one
   */
  removeActiveState() {
    if (!this.domRef) { return }
    this.domRef.classList.remove("active");
    this.domRef.classList.add("inactive");
  }

}