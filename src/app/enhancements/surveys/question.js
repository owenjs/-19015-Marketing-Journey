import Option from './option.js';
import Frag from '../../tools/Frag.js';
import Enhancement from '../../enhancement.js';

const questionMarkup = "<div class='c2form_row__range'>$frag_OPTIONS$</div>";

export default class Question extends Enhancement {

  constructor(domQuestion, classInfo) {
    super(); // Create 'this'
    this.classInfo = classInfo;

    // Find the Options for this Question
    this.container = domQuestion;
    this.options = this.findOptions(domQuestion);
    this.activeOption = 0;
    // ToDo: Find the Min and Max for the Question
  }

  /**
   * render - Renders this class from a DOMFragment
   * @return {DOMElement} this.container: Render DOMFragment for this class
   */
  render() {
    let questionFragment = new Frag(questionMarkup), optionFrags = [];
    
    // Render each Option
    this.options.forEach((option) => {
      optionFrags.push(option.render());
    });
    // Replace the option frag macro with the options we have rendered
    questionFragment.replace("$frag_OPTIONS$", optionFrags);

    // Append the newly built ranges into the question container
    let inputCont = this.container.findChildrenByClassName("c2form_input")[0];
    inputCont.appendChild(questionFragment.render);

    return this.container;
  }

  /**
   * findOptions - Find the available options in the DOM element given
   * @param {HTMLElement} domQuestion: The DOM element for this question
   * @return {array} options: An array of option classes
   */
  findOptions(domQuestion) {
    // Get the radio Buttons out of the DOM Element
    let radioBtns = domQuestion.findChildrenByClassName("c2form_radio")[0].children;
    let options = [];
    // For each radio button get the Input and Label out
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

  /**
   * setRefs - Sets relevant references for this class 
   * @param {HTMLElement} domQuestion: The Rendered DOM element for this question
   */
  setRefs(domQuestion) {
    this.domRef = domQuestion;
    let domOptions = domQuestion.findChildrenByClassName("c2form_row__range")[0].children;
    domOptions.forEach((domOption, id) => {
      this.options[id].setRefs(domOption);
    });
  }

  /**
   * next - Removes our Active state, and asks parent to update the active state
   */
  next() {
    this.removeActiveState();
    // Notify the Group Parent
    this.classInfo.fnUpdateActive();
  }

  /**
   * updateActive - Updates the active question option
   */
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