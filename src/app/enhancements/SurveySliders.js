import Enhancement from '../enhancement.js'
import util from '../util.js';
import Frag from '../tools/Frag.js';
import Question from './surveys/question.js';
import Option from './surveys/option.js';

export default class SurveySliders extends Enhancement {

  constructor(domSliders) {
    super(); // Create 'this'
    if (!domSliders || !domSliders.length) {
      console.log("No Sliders to Build 'src/app/enhancements/SurveySliders.js'");
      return;
    }
    this.domSliders = domSliders;
    this.activeQuestion = 0;
    this.domSliders[this.activeQuestion].classList.add("active");
    this.questions = this.findQuestions(domSliders);
    this.sliders = [];
    // Request the Survey Group Markup
    util.localRequest("/p/1/survey-slider-markup.html", (markup) => {
      // When Fetched Build the Surveys from the MetaData and Markup
      this.buildSliders(markup);
    });
  }

  buildSliders(markup) {
    this.questions.forEach((question, id) => {

      // Build the Questions from the Markup given
      let questionFragment = new Frag(markup);
      // Replace the ranges frag with the ranges
      questionFragment.replace("$frag_RANGES$", question.rangeFragment);

      let inputCont = this.domSliders[id].findChildrenByClassName("c2form_input")[0];
      inputCont.appendChild(questionFragment.print);
    });
  }

  findQuestions(domSliders) {
    let questions = [];
    
    // Go through each of the Survery Sliders and grab the Input and Label out
    domSliders.forEach((slider) => {
      let radioBtn = slider.findChildrenByClassName("c2form_radio");
      let options = this.findOptions(radioBtn[0].children);
      questions.push(new Question(options, {
        fnNext: () => {this.next()},
        fnBack: () => {this.back()},
      }));
    });

    return questions;
  }

  findOptions(radioBtns) {
    let options = [];
    radioBtns.forEach((radioBtn) => {
      let option = new Option();
      // This contains the Input and Label, wrapped in Spans
      let container = radioBtn.children[0].children;
      // Get the Input and Label Out, always in the same place
      option.input = container[0].firstChild;
      option.label = container[1].firstChild;
      options.push(option);
    });
    return options;
  }

  next() {
    this.domSliders[this.activeQuestion].classList.remove("active");
    this.domSliders[this.activeQuestion].classList.add("inactive");
    this.activeQuestion++;
    this.domSliders[this.activeQuestion].classList.remove("inactive");
    this.domSliders[this.activeQuestion].classList.add("active");
  }

  back() {

  }

}