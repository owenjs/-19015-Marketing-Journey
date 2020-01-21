import Enhancement from '../enhancement.js'
import Group from './surveys/group.js';

export default class Survey extends Enhancement {

  constructor(domSurvey) {
    super(); // Create 'this'
    if (!domSurvey) {
      console.log("No Survey to Paginate 'src/app/enhancements/SurveyPagination.js'");
      return;
    }
    this.survey = {
      groups: this.findGroups(domSurvey),
      activeGroup = 0,
    };

    // Find Groups in the Dom Survey

  }

  findGroups(domSurvey) {
    let domGroups = domSurvey.findChildrenByClassName("c2form_fieldset"),
      groups = [];

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

      // Push this Group into the Survey Groups
      groups.push(new Group(title, group.findChildrenByClassName("c2form_row")));
    });

  }

  submitSurvey () {
    // ToDo: Find form in parent and submit it
  }

}