// ProtoTypes Util see app/protoTypes.js
import protoTypes from './app/protoTypes.js';

import Survey from './app/enhancements/survey.js';
import GroupSwitcher from './app/enhancements/groupSwitcher.js';
import ActiveStateMachine from './app/tools/ActiveStateMachine.js';

function init(event) {
  // Init Function called on DOM Content Loaded

  let domSurvey = document.querySelector(".marketing-survey__form");

  let survey = new Survey(domSurvey);
  // Render the Survey into the exciting Form on the page
  survey.render(domSurvey.querySelector("form"));

  paginateSurvey(domSurvey);

  // Grab the Group Switcher
  let domGroupSwitcher = document.querySelector(".marketing-survey__group-shifter");
  let groupSwitcher = new GroupSwitcher(domGroupSwitcher);
}

function paginateSurvey(domSurvey) {
  let survey = {};

  let domSurveyGroups = domSurvey.querySelectorAll(".question-group");
  survey.groupController = new ActiveStateMachine(domSurveyGroups);

  domSurveyGroups.forEach((domSurveyGroup) => {

    survey.questionController = new ActiveStateMachine(
      domSurveyGroup.querySelectorAll(".c2form_row"), 
      {
        container: domSurveyGroup.querySelector(".question-group__questions__container"),
        complete: () => { survey.groupController.next() },
      },
    );

  });
}

document.addEventListener('DOMContentLoaded', (e) => {init(e)});