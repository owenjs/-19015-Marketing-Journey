import Enhancement from '../enhancement.js'
import Group from './surveys/group.js';
import Dispatch from '../tools/Dispatch.js';
import Frag from '../tools/Frag.js';

const lastCardMarkUp = '<div class="c2form_row surveySlider c2form_row_endCard"><label class="c2form_fldname">Almost there! Submit the Survey to see your Results</label><div class="c2form_row_endCard__btn">$frag_SUBMITBTN$</div></div>';

export default class Survey extends Enhancement {

  constructor(domSurvey) {
    super(); // Create 'this'
    if (!domSurvey) {
      console.log("No Survey");
      this.noSurvey = true;
      return;
    }

    this.refs = {
      submitBtn: domSurvey.querySelector(".c2form_buttons .c2btnconfirmadd"),
    };

    this.survey = {
      groups: this.findGroups(domSurvey),
      activeGroup: 0,
    };
  }

  findGroups(domSurvey) {
    let domGroups = domSurvey.findChildrenByClassName("c2form_fieldset"), groups = [];
    let domQuotes = document.querySelector(".marketing-survey__group-quotes");

    let id = 0;
    // Build Each Group
    domGroups.forEach((group) => {
      // Find the group heading
      let legend = group.children[0],
        title = "";
      if (legend.nodeName == "LEGEND" && legend.innerText) {
        // If we have found a legend tag and it has text in it
        title = legend.innerText;
        // If not then this group has now title
      }
      if (title == "") {
        return; // Skip for now
      }

      // Find the Description for this Group
      let domDesc = group.querySelector(".c2form_fieldset_desc");
      let desc = (domDesc && domDesc.children.length) ? domDesc.children : null;

      // Push this Group into the Survey Groups
      groups.push(new Group(title, desc, id, group.findChildrenByClassName("c2form_row"), domQuotes.children[id], {
        fnSetActive: (direction, id) => { this.setActive(direction, id) },
        last: (id == domGroups.length - 1) ? true : false,
      }));
      id++;
    });

    return groups;
  }

  render(elementToAppend) {
    if (!elementToAppend) {
      return;
    }
    let surveyFrag = document.createDocumentFragment();
    // Render each Survey Group
    this.survey.groups.forEach((group) => {
      surveyFrag.appendChild(group.render());
    });
    elementToAppend.appendChild(surveyFrag);

    // After the Elements have been render to the DOM, we need to set our refereneces to it again.
    // When DocumentFragments are appended to DOM Nodes all the children and move over
    // rather than a reference being moved. Leaving the DocumentFragments empty and useless
    this.setRefs(document.getElementsByClassName("question-group"));
  }

  setRefs(domQuestionGroups) {
    domQuestionGroups.forEach((domQuestionGroup, id) => {
      this.survey.groups[id].setRefs(domQuestionGroup);
      if (id == 0) {
        this.survey.groups[id].setActiveState();
      }
      if (id == domQuestionGroups.length - 1) {
        // Last Group, add the Last Card in (Submit Survey Card)
        let questions = domQuestionGroup.querySelector(".question-group__questions__container");
        let lastCardFrag = new Frag(lastCardMarkUp);
        // Replace the Submit Button
        lastCardFrag.replace("$frag_SUBMITBTN$", [this.refs.submitBtn]);
        // Add the Card to the Questions
        questions.appendChild(lastCardFrag.render);

        this.refs.submitCard = questions.querySelector(".c2form_row_endCard");
      }
    });
  }

  // Direction can be 1 or -1 for Next or Back
  setActive(direction, id) {
    let jumpingTo = false;
    if(id || id == 0) {
      jumpingTo = true;
    }

    if (this.survey.groups[this.survey.activeGroup].classInfo.last && !jumpingTo && direction != -1) {
      // Submit the Survey on last group finish
      this.showSubmitCard();
      return;
    }

    if (jumpingTo) {
      // Override the Direction if needed
      direction = ((id >= this.survey.activeGroup) ? 1 : -1);
    }

    // Make Current Inactive
    this.survey.groups[this.survey.activeGroup].removeActiveState(direction);

    if (jumpingTo) {
      // Set the Active Group to the id given
      this.survey.activeGroup = id;
    } else {
      // Else: move by one in the current direction
      this.survey.activeGroup += direction;
    }
    
    // Make Next or Previous Active
    this.survey.groups[this.survey.activeGroup].setActiveState(direction);
    Dispatch.dispatch('GROUP_CHANGE', {
      groupTitle: this.survey.groups[this.survey.activeGroup].title,
    });
  }

  showSubmitCard() {
    let activeQuestionId = this.survey.groups[this.survey.activeGroup].activeQuestion;
    // Hide the Current Active Card
    this.survey.groups[this.survey.activeGroup].questions[activeQuestionId].removeActiveState(1);
    // Hide the Back Arrow
    this.survey.groups[this.survey.activeGroup].backArrowRefs.forEach((backArrowRef) => {
      backArrowRef.classList.remove("show");
    });
    // Show the Submit Card
    this.refs.submitCard.classList.add("active");
  }

}