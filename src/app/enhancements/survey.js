import Enhancement from '../enhancement.js'
import Group from './surveys/group.js';

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
    let domGroups = domSurvey.findChildrenByClassName("c2form_fieldset"),
      groups = [];

    // Build Each Group
    domGroups.forEach((group, id) => {
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
      groups.push(new Group(title, group.findChildrenByClassName("c2form_row"), {
        fnUpdateActive: () => { this.updateActive() },
      }));
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

  updateActive() {
    this.survey.activeGroup++;

    this.survey.groups[this.survey.activeGroup].setActiveState();
    if (this.survey.groups[this.survey.activeGroup].classInfo.last) {
      // Submit the Survey on last group finish
      this.submitSurvey();
    }
  }

  submitSurvey() {
    // ToDo: Find form in parent and submit it
    console.log("Submitting Survey");
  }

}