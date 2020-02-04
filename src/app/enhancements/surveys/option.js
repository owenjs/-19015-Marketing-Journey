import Frag from '../../tools/Frag.js';

const optionMarkup = "<span>$VALUE$</span>";

export default class Option {

  constructor(value, callBacks) {
    this.value = value;
    this.callBacks = callBacks;
  }

  /**
   * render - Renders this class from a DOMFragment
   */
  render() {
    // Create the Fragment from the Markup
    let optionFrag = new Frag(optionMarkup);
    // Replace the Value with this option value
    optionFrag.replace("$VALUE$", this.value);
    // Render the Frag
    let optionRender = optionFrag.render;
    // Add the click handler
    optionRender.firstChild.addEventListener('click', () => {
      this.handleClick();
    });
    return optionRender;
  }

  /**
   * handleClick - Click handle for the Question Option
   */
  handleClick() {
    // Check the radio button we are representing
    this.check();

    // Notify the question parent so it can update the current answer
    this.callBacks.fnUpdateActive(this);
  }

  /**
   * check - Checks the Radio button, and adds class name on the dom ref
   */
  check() {
    this.input.checked = true;
    this.domRef.classList.add("c2form_row__range__current");
  }

  /**
   * unCheck - Removes the current class name on this span
   * No need to Uncheck the Radio Button though, HTML already does this
   */
  unCheck() {
    this.domRef.classList.remove("c2form_row__range__current");
  }

  /**
   * setRefs - Sets relevant references for this class 
   * @param {HTMLElement} domOption: The Rendered DOM reference for this option
   */
  setRefs(domOption) {
    this.domRef = domOption;
  }

}