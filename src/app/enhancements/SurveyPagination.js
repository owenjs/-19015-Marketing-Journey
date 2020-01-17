import Enhancement from '../enhancement.js'
import util from '../util.js';
import Frag from '../tools/Frag.js';

export default class SurveyPagination extends Enhancement {

  constructor(domSurveys) {
    super(); // Create 'this'
    if (!domSurveys.length) {
      console.log("No Surveys to Paginate 'src/app/enhancements/SurveyPagination.js'");
      return;
    }
    // Build the Surveys MetaData from the HTML collections
    this.surveys = this._findSurveys(domSurveys);
    // Request the Survey Group Markup
    util.localRequest("/p/1/question-group-markup.html", (markup) => {
      // When Fetched Build the Surveys from the MetaData and Markup
      this.buildSurveys(markup);
    });
    

  }

  buildSurveys(markup) {
    let main = document.getElementsByClassName("main")[0];

    this.surveys.forEach((survey) => {survey.forEach((group) => {
      if (group.title == "") {return} // Skip for Now
      // For each Group in each Survey

      
      let groupFragment = new Frag(markup);
      // Replace the Heading Macro with the Group Title
      groupFragment.replace("$HEADING$", group.title);
      // Replace the Question Frag macro with the Questions
      groupFragment.replace("$frag_QUESTIONS$", group.questions);

      //groupFragment.fragsToAppend.forEach((fragToAppend) => {
        //fragToAppend.appendChildren(group.questions);
      //});

      main.appendChild(groupFragment.print);
    })});
  }

  _findSurveys(domSurveys) {
    let surveys = [];
    // Build Each Survey
    domSurveys.forEach((domSurvey) => {
      surveys.push(this._findSurvey(domSurvey));
    });
    console.log("Surveys built 'src/app/enhancements/SurveyPagination.js'")
    return surveys;
  }

  _findSurvey(domSurvey) {
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
    return survey;
  }

}