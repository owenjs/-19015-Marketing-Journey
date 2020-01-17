// ProtoTypes Util see app/protoTypes.js
import protoTypes from './app/protoTypes.js';

import surveyPagination from './app/enhancements/SurveyPagination.js';

function init(event) {
  // Init Function called on DOM Content Loaded

  let surveys = new surveyPagination(document.getElementsByClassName("c2Survey--paginator"));

  
}

document.addEventListener('DOMContentLoaded', (e) => {init(e)});