// ProtoTypes Util see app/protoTypes.js
import protoTypes from './app/protoTypes.js';

import Survey from './app/enhancements/survey.js';
import GroupSwitcher from './app/enhancements/groupSwitcher.js';
import LoadingPanel from './app/tools/LoadingPanel.js';

function init(event) {
  // Init Function called on DOM Content Loaded
  let loadingPanel = new LoadingPanel(document.querySelector(".c2-loading-panel"));

  let domSurvey = document.querySelector(".marketing-survey__form");

  let survey = new Survey(domSurvey);
  if (survey.noSurvey) {
    // No Survey On Page, We Must be On the Results Page
    loadingPanel.setDone();
    return;
  }
  // Render the Survey into the exciting Form on the page
  survey.render(domSurvey.querySelector("form"));

  // Grab the Group Switcher
  let domGroupSwitcher = document.querySelector(".marketing-survey__group-shifter");
  let groupSwitcher = new GroupSwitcher(domGroupSwitcher);
  
  // When everything is done, Remove the Loading Panel
  loadingPanel.setDone();
}

document.addEventListener('DOMContentLoaded', (e) => {init(e)});