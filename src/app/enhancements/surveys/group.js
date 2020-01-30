import Question from './question.js';
import Frag from '../../tools/Frag.js';
import Enhancement from '../../enhancement.js';
import Dispatch from '../../tools/Dispatch.js';

const groupMarkup = "<section class='question-group'><div class='question-group__heading'><h1>$HEADING$</h1></div><div class='question-group__questions'><div class='question-group__questions__container'><div class='arrow-left'></div>$frag_QUESTIONS$<div class='arrow-right'></div></div></div></section>";

export default class Group extends Enhancement {

  constructor(title, id, domQuestions, classInfo) {
    super(); // Create 'this'
    this.title = title;
    this.id = id;
    this.questions = this.buildQuestions(domQuestions);
    this.classInfo = classInfo;

    Dispatch.addToDispatchGroup('GROUP_SWITCH', (info) => { this.handleGroupSwitch(info) });
  }

  render() {
    if (this.title == "") {
      return; // Skip for now
    }
    let groupFrag = new Frag(groupMarkup);
    // Replace the Heading Macro with the Group Title
    groupFrag.replace("$HEADING$", this.title);
    // Render each Question in the group
    let questionFrags = [];
    this.questions.forEach((question) => {
      questionFrags.push(question.render());
    });
    // Replace the Question Frag macro with the Questions
    groupFrag.replace("$frag_QUESTIONS$", questionFrags);

    // Return the Render Group Fragment
    return groupFrag.render;
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
    
    if (this.questions[this.activeQuestion].classInfo.last && !jumpingTo) {
      // Move onto Next group after the last question has been answered
      this.classInfo.fnSetActive(1);
      return;
    }

    if (jumpingTo) {
      // ToDo: Jump to a Given ID
      return;
    }

    // Make Current Inactive
    this.questions[this.activeQuestion].removeActiveState(direction);
    this.activeQuestion += direction;
    // Make Next or Previous Active
    this.questions[this.activeQuestion].setActiveState(direction);
  }

  handleGroupSwitch(dispatchInfo) {
    if (this.title == dispatchInfo.groupTitle) {
      // This is the Group to Switch!
      this.classInfo.fnSetActive(1, this.id);
    }
  }

  setRefs(domQuestionGroup) {
    this.domRef = domQuestionGroup;

    // Find the Next and Back arrow
    let backArrow = domQuestionGroup.querySelector(".arrow-left");
    let nextArrow = domQuestionGroup.querySelector(".arrow-right");

    backArrow.onclick = () => {
      // -1 for Back
      this.setActive(-1);
    };

    nextArrow.onclick = () => {
      this.setActive(1);
    };

    // Find the Questions in this Group
    let domQuestions = domQuestionGroup.findChildrenByClassName("c2form_row");
    domQuestions.forEach((domQuestion, id) => {
      this.questions[id].setRefs(domQuestion);
      if (id == 0) {
        this.questions[id].setActiveState();
        this.activeQuestion = 0;
      }
    });
  }

}