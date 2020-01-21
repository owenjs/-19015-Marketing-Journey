// ProtoTypes Util see app/protoTypes.js
import protoTypes from './app/protoTypes.js';

import Survey from './app/enhancements/survey.js';

function init(event) {
  // Init Function called on DOM Content Loaded

  let domSurveys = document.getElementsByClassName("marketing-survey__form");

  domSurveys.forEach((domSurvey) => {
    let survey = new Survey(domSurvey);
    // Add the New Created Survey to the Form
    survey.render(domSurvey.querySelector("form"));
  });



}

document.addEventListener('DOMContentLoaded', (e) => {init(e)});