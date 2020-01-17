// ProtoTypes Util see app/protoTypes.js
import protoTypes from './app/protoTypes.js';

import surveyPagination from './app/enhancements/SurveyPagination.js';
import Dispatch from './app/Tools/Dispatch.js';

function init(event) {
  // Init Function called on DOM Content Loaded

  // Add a listener so we know when the surveys have been built, 
  // so we can start building the sliders within
  Dispatch.addToDispatchGroup("SURVEY_BUILT", (dispatchInfo) => {buildSliders(dispatchInfo)});

  let domSurveys = document.getElementsByClassName("c2Survey--paginator"),
    surveys = [];

  domSurveys.forEach((domSurvey) => {
    let survey = new surveyPagination(domSurvey);
    surveys.push(survey);
    // Add the New Created Survey to the Form
    survey.render(domSurvey.querySelector("form"));
  });

}

function buildSliders(dispatchInfo) {
  console.log("Building Sliders...");
}

document.addEventListener('DOMContentLoaded', (e) => {init(e)});