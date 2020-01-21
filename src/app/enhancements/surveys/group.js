import Question from './question.js';
import Frag from '../../tools/Frag.js';

const groupMarkup = "<section class='question-group'><div class='question-group__heading'><h1>$HEADING$</h1></div><div class='question-group__questions'>$frag_QUESTIONS$</div></section>";

export default class Group {

  constructor(title, domQuestions, classInfo) {
    this.title = title;
    this.questions = this.buildQuestions(domQuestions);
    this.classInfo = classInfo;
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
      questionFrags.push(question.render);
    });
    // Replace the Question Frag macro with the Questions
    groupFrag.replace("$frag_QUESTIONS$", questionFrags);

    // Return the Render Group Fragment
    return groupFrag.print;
  }

  setRefs(domQuestionGroup) {
    this.domRef = domQuestionGroup;
    let domQuestions = domQuestionGroup.findChildrenByClassName("c2form_row");
    domQuestions.forEach((domQuestion, id) => {
      this.questions[id].setRefs(domQuestion);
      if (id == 0) {
        this.questions[id].setActiveState();
        this.activeQuestion = 0;
      }
    });
  }

  buildQuestions(domQuestions) {
    let questions = [];
    domQuestions.forEach((domQuestion, id) => {
      questions.push(new Question(domQuestion, {
        last: (id == domQuestions.length - 1) ? true : false,
        fnUpdateActive: () => { this.updateActive() },
        fnNext: () => { this.next() },
      }));
    });
    return questions;
  }

  updateActive() {
    this.activeQuestion++;

    this.questions[this.activeQuestion].setActiveState();
    if (this.questions[this.activeQuestion].classInfo.last) {
      // Move onto Next group after the last question has been answered
      this.next();
    }
  }

  next() {
    this.removeActiveState();
    // Notify the Group Parent
    this.classInfo.fnUpdateActive();
  }

  setActiveState() {
    this.domRef.classList.remove("inactive");
    this.domRef.classList.add("active");
  }

  removeActiveState() {
    this.domRef.classList.remove("active");
    this.domRef.classList.add("inactive");
  }

}