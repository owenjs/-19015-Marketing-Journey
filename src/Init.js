import StickyHeader from './app/tools/StickyHeader.js';

function init() {
  // Init Function called on DOM Content Loaded

  // Create the Sticky Header
  new StickyHeader(document.getElementsByClassName("c2-header")[0]);
  console.log();
}

document.addEventListener('DOMContentLoaded', init());