import Option from './option.js';
import Frag from '../../tools/Frag.js';

const questionMarkup = "<section class='c2form_slider'><div class='c2form_slider__range'>$frag_RANGES$</div></section>";

export default class Question {

  constructor(domQuestion, classInfo) {
    this.classInfo = classInfo;

    // Find the Options for this Question
    this.container = domQuestion;
    this.options = this.findOptions(domQuestion);
    this.activeOption = 0;
    // ToDo: Find the Min and Max for the Question
  }

  get render() {
    let questionFragment = new Frag(questionMarkup),
      optionFrags = [];
    
    // Render each Option
    this.options.forEach((option) => {
      optionFrags.push(option.render);
    });
    // Replace the ranges frag with the options
    questionFragment.replace("$frag_RANGES$", optionFrags);

    // Append the newly built ranges into the question container
    let inputCont = this.container.findChildrenByClassName("c2form_input")[0];
    inputCont.appendChild(questionFragment.print);

    return this.container;
  }

  findOptions(domQuestion) {
    // Get the radio Buttons out of the markup
    let radioBtns = domQuestion.findChildrenByClassName("c2form_radio")[0].children,
      options = [];
    
    radioBtns.forEach((radioBtn, id) => {
      // ToDo: Dynamic Ranges, not always starting from 0
      let option = new Option(id, {
        fnUpdateActive: (option) => {this.updateActive(option)},
      });
      // This contains the Input and Label, wrapped in Spans
      let container = radioBtn.children[0].children;
      // Get the Input and Label Out, always in the same place
      option.input = container[0].firstChild;
      option.label = container[1].firstChild;
      options.push(option);
    });
    return options;
  }

  setRefs(domQuestion) {
    this.domRef = domQuestion;
    let domOptions = domQuestion.findChildrenByClassName("c2form_slider__range")[0].children;
    domOptions.forEach((domOption, id) => {
      this.options[id].setRefs(domOption);
    });
  }

  setActiveState() {
    this.domRef.classList.remove("inactive");
    this.domRef.classList.add("active");
  }

  removeActiveState() {
    this.domRef.classList.remove("active");
    this.domRef.classList.add("inactive");
  }

  next() {
    this.removeActiveState();
    // Notify the Group Parent
    this.classInfo.fnUpdateActive();
  }

  updateActive(option) {
    // Uncheck the Previous Option
    if (this.activeOption) {
      this.activeOption.unCheck();
    }
    // Update the Active Option
    this.activeOption = option;
    // Move onto the Next Question
    this.next();
  }

}