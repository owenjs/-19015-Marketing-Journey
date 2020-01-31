import Enhancement from '../enhancement.js'
import Group from './surveys/group.js';
import Dispatch from '../tools/Dispatch.js';

export default class Survey extends Enhancement {

  constructor(domSurvey) {
    super(); // Create 'this'
    if (!domSurvey) {
      console.log("No Survey");
      return;
    }

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

      // Push this Group into the Survey Groups
      groups.push(new Group(title, id, group.findChildrenByClassName("c2form_row"), domQuotes.children[id], {
        fnSetActive: (direction, id) => { this.setActive(direction, id) },
      }));
      id++;
    });
    // Remove the original Form Container from the DOM, we've got everything we need from it
    domSurvey.findChildrenByClassName("c2form_container").forEach((el) => { el.remove() });
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
    });
  }

  // Direction can be 1 or -1 for Next or Back
  setActive(direction, id) {
    let jumpingTo = false;
    if(id || id == 0) {
      jumpingTo = true;
    }

    if (this.survey.groups[this.survey.activeGroup].classInfo.last && !jumpingTo) {
      // Submit the Survey on last group finish
      this.submitSurvey();
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

  submitSurvey() {
    // ToDo: Find form in parent and submit it
    console.log("Submitting Survey");
  }

}