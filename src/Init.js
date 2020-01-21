// ProtoTypes Util see app/protoTypes.js
import protoTypes from './app/protoTypes.js';

import Survey from './app/enhancements/survey.js';
import SurveyPaginator from './app/enhancements/SurveyPaginator.js';
import SurveySliders from './app/enhancements/SurveySliders.js';
import Dispatch from './app/Tools/Dispatch.js';

function init(event) {
  // Init Function called on DOM Content Loaded

  // Add a listener so we know when the surveys have been built, 
  // so we can start building the sliders within
  Dispatch.addToDispatchGroup("SURVEY_BUILT", (dispatchInfo) => {buildSliders(dispatchInfo)});

  let domSurveys = document.getElementsByClassName("c2Survey--paginator");

  domSurveys.forEach((domSurvey) => {
    let survey = new Survey(domSurvey);
    //let survey = new SurveyPaginator(domSurvey);
    // Add the New Created Survey to the Form
    // ToDo: use set functions
    survey.render(domSurvey.querySelector("form"));
  });

}

function buildSliders(dispatchInfo) {
  let domSliders = document.querySelectorAll(".c2Survey--paginator .surveySlider");
  let sliders = new SurveySliders(domSliders)
  console.log("Building Sliders...");
}

document.addEventListener('DOMContentLoaded', (e) => {init(e)});