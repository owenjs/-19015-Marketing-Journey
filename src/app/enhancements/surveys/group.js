import Question from './question.js';
import Frag from '../../tools/Frag.js';
import Enhancement from '../../enhancement.js';
import Dispatch from '../../tools/Dispatch.js';

const groupMarkup = "<section class='question-group'><div class='question-group__heading'><h1>$HEADING$</h1><div class='question-group__heading__desc'>$frag_DESC$</div><div class='question-group__heading__ticks'>$frag_TICKS$</div></div><div class='question-group__questions'><div class='question-group__questions__container'><div class='arrow-left'></div>$frag_QUESTIONS$<div class='arrow-right'></div></div></div><div class='question-group__quotes'><div class='question-group__quotes--left'></div><div class='question-group__quotes__quote'>$frag_QUOTE$</div><div class='question-group__quotes--right'></div></div></section>";
const questionTickMarkup = "<div class='question-group__heading__ticks__tick'></div>";

export default class Group extends Enhancement {

  constructor(title, desc, id, domQuestions, domQuote, classInfo) {
    super(); // Create 'this'
    this.title = title;
    this.desc = desc;
    this.id = id;
    this.questions = this.buildQuestions(domQuestions);
    this.domQuote = [domQuote];
    this.classInfo = classInfo;
  }

  render() {
    if (this.title == "") {
      return; // Skip for now
    }
    let groupFrag = new Frag(groupMarkup);
    // Replace the Heading Macro with the Group Title
    groupFrag.replace("$HEADING$", this.title);

    // Replace the Description Frag Macro
    groupFrag.replace("$frag_DESC$", this.desc);

    // Render each Question in the group
    let questionFrags = [];
    this.questions.forEach((question) => {
      questionFrags.push(question.render());
    });
    // Replace the Question Frag macro with the Questions
    groupFrag.replace("$frag_QUESTIONS$", questionFrags);

    // Replace the Ticks Frag Macro with the Ticks
    groupFrag.replace("$frag_TICKS$", this.createTicks());

    // Replace the Quote Frag macro with the Quote we have been given
    groupFrag.replace("$frag_QUOTE$", this.domQuote);

    // Return the Render Group Fragment
    return groupFrag.render;
  }

  createTicks() {
    let questionTickFrags = [];
    this.questions.forEach((question) => {
      // Create the Tick
      let questionTickFrag = new Frag(questionTickMarkup);
      // Push the Rendered Frag into the Array
      questionTickFrags.push(questionTickFrag.render);
    });
    return questionTickFrags;
  }

  buildQuestions(domQuestions) {
    let questions = [];
    domQuestions.forEach((domQuestion, id) => {
      questions.push(new Question(domQuestion, {
        last: (id == domQuestions.length - 1) ? true : false,
        fnSetActive: (direction, id) => { this.setActive(direction, id) },
      }));
    });
    return questions;
  }

  // Direction can be 1 or -1 for Next or Back
  setActive(direction, id) {
    let jumpingTo = false;
    if(id || id == 0) {
      jumpingTo = true;
    }

    if (this.questions[this.activeQuestion].classInfo.last && !jumpingTo && direction != -1) {
      // Move onto Next group after the last question has been answered
      setTimeout(() => {
        this.classInfo.fnSetActive(1);
      }, 250);
      // Let Dispatcher know
      return;
    }

    if (jumpingTo) {
      // ToDo: Jump to a Given ID
      return;
    }

    // Make Current Inactive
    setTimeout((id) => {
      this.questions[id].removeActiveState(direction);
      this.questions[id].tickRef.classList.remove("active");
    }, 250, this.activeQuestion);

    this.activeQuestion += direction;

    // Make Next or Previous Active
    setTimeout(() => {
      this.questions[this.activeQuestion].setActiveState(direction);
      this.questions[this.activeQuestion].tickRef.classList.add("active");

      if (this.questions[this.activeQuestion - 1] 
        && this.questions[this.activeQuestion - 1].activeOption) {
        this.backArrowRefs.forEach((backArrowRef) => {
          backArrowRef.classList.add("show");
        });
      } else {
        this.backArrowRefs.forEach((backArrowRef) => {
          backArrowRef.classList.remove("show");
        });
      }

      if (this.questions[this.activeQuestion].activeOption) {
        this.nextArrowRefs.forEach((nextArrowRef) => {
          nextArrowRef.classList.add("show");
        });
      } else {
        this.nextArrowRefs.forEach((nextArrowRef) => {
          nextArrowRef.classList.remove("show");
        });
      }
    }, 250);

  }

  setRefs(domQuestionGroup) {
    this.domRef = domQuestionGroup;

    
    this.backArrowRef = domQuestionGroup.querySelector(".arrow-left");
    this.nextArrowRef = domQuestionGroup.querySelector(".arrow-right");

    // Find the Next and Back arrow, there are two include the Mobile Ones
    this.backArrowRefs = [
      domQuestionGroup.querySelector(".arrow-left"),
      document.querySelectorAll(".marketing-survey__group-shifter__back")[this.id],
    ];
    this.nextArrowRefs = [
      domQuestionGroup.querySelector(".arrow-right"),
      document.querySelectorAll(".marketing-survey__group-shifter__next")[this.id],
    ];

    this.backArrowRefs.forEach((backArrowRef) => {
      backArrowRef.onclick = () => {
        // -1 for Back
        this.setActive(-1);
      };
    });

    this.nextArrowRefs.forEach((nextArrowRef) => {
      nextArrowRef.onclick = () => {
        this.setActive(1);
      };
    });

    let questionTicks = domQuestionGroup.querySelectorAll(".question-group__heading__ticks__tick");

    // Find the Questions in this Group
    let domQuestions = domQuestionGroup.findChildrenByClassName("c2form_row");
    domQuestions.forEach((domQuestion, id) => {
      this.questions[id].setRefs(domQuestion, questionTicks[id]);
      // If First Question in this Group
      if (id == 0) {
        this.questions[id].setActiveState();
        this.questions[id].tickRef.classList.add("active");
        this.activeQuestion = 0;
      }
    });
  }

}