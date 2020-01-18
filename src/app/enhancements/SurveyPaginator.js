import Enhancement from '../enhancement.js'
import util from '../util.js';
import Frag from '../tools/Frag.js';
import Dispatch from '../tools/Dispatch.js';

export default class SurveyPagination extends Enhancement {

  constructor(domSurvey) {
    super(); // Create 'this'
    if (!domSurvey) {
      console.log("No Survey to Paginate 'src/app/enhancements/SurveyPagination.js'");
      return;
    }
    // Build the Survey MetaData from the HTMLElement
    this.survey = this.findSurvey(domSurvey);
    this.domRender = document.createDocumentFragment();
    this.loaded = false;
    // Request the Survey Group Markup
    util.localRequest("/p/1/question-group-markup.html", (markup) => {
      // When Fetched Build the Surveys from the MetaData and Markup
      this.buildSurvey(markup);
    });


  }

  render(elementToAppend) {
    if (!this.elementToAppend && elementToAppend) {
      this.elementToAppend = elementToAppend;
    }
    if (!this.loaded || !this.elementToAppend) {
      return;
    }
    console.log("Survey rendered 'src/app/enhancements/SurveyPagination.js'")
    this.elementToAppend.appendChild(this.domRender);
    // Dispatch Listener Group, so next actions can take place
    Dispatch.dispatch("SURVEY_BUILT");
    
  }

  buildSurvey(markup) {
    this.survey.forEach((group) => {
      if (group.title == "") { return } // Skip for Now

      // For each Group
      let groupFragment = new Frag(markup);
      // Replace the Heading Macro with the Group Title
      groupFragment.replace("$HEADING$", group.title);
      // Replace the Question Frag macro with the Questions
      groupFragment.replace("$frag_QUESTIONS$", group.questions);

      this.domRender.appendChild(groupFragment.print);
    });
    console.log("Survey built 'src/app/enhancements/SurveyPagination.js'")
    // ToDo: Get the Survey Submit Button from the Markup
    this.loaded = true;
    this.render();
  }

  findSurvey(domSurvey) {
    let survey = [],
      // Find the Survey Groups in the Survey
      domGroups = domSurvey.findChildrenByClassName("c2form_fieldset");
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
      // Push this Group into the Survey
      survey.push({
        title: title,
        questions: group.findChildrenByClassName("c2form_row"),
      });
    });
    // Remove the original Form Container from the DOM, we've got everything we need from it
    domSurvey.findChildrenByClassName("c2form_container").forEach((el) => {el.remove()});
    console.log("Survey found 'src/app/enhancements/SurveyPagination.js'")
    return survey;
  }

}