import Frag from '../../tools/Frag.js';

const optionMarkup = "<span>$VALUE$</span>";

export default class Option {

  constructor(value, callBacks) {
    this.value = value;
    this.callBacks = callBacks;
  }

  get render() {
    let optionFrag = new Frag(optionMarkup);
    optionFrag.replace("$VALUE$", this.value);

    let optionRender = optionFrag.print;
    optionRender.firstElementChild.addEventListener('click', (e) => {
      this.handleClick(e.currentTarget);
    });
    return optionRender;
  }

  handleClick(option) {
    // Check the radio button we are representing
    this.check();

    // Notify the question parent so it can update the current answer
    this.callBacks.fnUpdateActive(this);
  }

  check() {
    this.input.checked = true;
    this.domRef.classList.add("c2form_slider__range__current");
  }

  unCheck() {
    // No need to Uncheck the Radio Button, HTML already does this
    // But do update the Class List
    this.domRef.classList.remove("c2form_slider__range__current");
  }

  setRefs(domOption) {
    this.domRef = domOption;
  }

}