import Enhancement from '../enhancement.js'
import util from '../util.js';
import Frag from '../tools/Frag.js';

export default class SurveySliders extends Enhancement {

  constructor(domSliders) {
    super(); // Create 'this'
    if (!domSliders || !domSliders.length) {
      console.log("No Sliders to Build 'src/app/enhancements/SurveySliders.js'");
      return;
    }
    this.domSliders = domSliders;
    this.questions = this.findQuestions(domSliders);
    // Request the Survey Group Markup
    util.localRequest("/p/1/survey-slider-markup.html", (markup) => {
      // When Fetched Build the Surveys from the MetaData and Markup
      this.buildSliders(markup);
    });
  }

  buildSliders(markup) {
    this.questions.forEach((question, id) => {
      let sliderMin, sliderMax;
      // Find the Min and Max for this question
      if(question[0].label.innerHTML.match(/^(\d+).*$/)) {
        sliderMin = RegExp.$1;
        sliderMax = question.length - ( 1 - sliderMin );
      }

      //let ranges = this.buildRanges(sliderMin, sliderMax);
      // ToDo:
      return;

      // Create a Slider for Each Question
      let sliderFragment = new Frag(markup);
      // Replace the ranges frag with the ranges
      sliderFragment.replace("$frag_RANGES$", ranges);

      let inputCont = this.domSliders[id].findChildrenByClassName("c2form_input")[0];
      inputCont.appendChild(sliderFragment.print);
    });
  }

  buildRanges(min, max) {
    let ranges = [];

    for(let i = min; i <= max; i++) {
      let range = frag.createFromString("<span>" + i + "</span>");
      // Add click listener for Each Range
      range.children[0].dataset.value = i;
      range.children[0].addEventListener('click', function(e) {
        _this.handleRangeChange(e.currentTarget);
      });
      ranges.push(range);
    }
    return ranges;
  }

  findQuestions(domSliders) {
    let questions = [];
    
    // Go through each of the Survery Sliders and grab the Input and Label out
    domSliders.forEach((slider) => {
      let radioBtn = slider.findChildrenByClassName("c2form_radio");
      let answers = this.findAnswers(radioBtn[0].children);
      questions.push(answers);
    });

    return questions;
  }

  findAnswers(radioBtns) {
    let answers = [];
    radioBtns.forEach((radioBtn) => {
      let answer = {};
      // This contains the Input and Label, wrapped in Spans
      let container = radioBtn.children[0].children;
      // Get the Input and Label Out, always in the same place
      answer.input = container[0].firstChild;
      answer.label = container[1].firstChild;
      answers.push(answer);
    });
    return answers;
  }

}