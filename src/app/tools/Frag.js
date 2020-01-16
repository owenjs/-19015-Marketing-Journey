import htmlRegex from '../utils/htmlRegex.js';

export default class Frag {

  constructor(markup) {
    this.originalMarkup = markup;
    this.markup = markup;
  }

  /**
   * Frag prototype reset - Resets this frag's markup to the original
   */
  reset() {
    this.markup = this.originalMarkup;
  }

  /**
   * get print - Returns the DOM fragment for the frag
   */
  get print() {
    // ToDo: Warn user for missing macros and frag macros
    return this.markup.getFrag();
  }

  /**
   * replace - Replaces a macro with the replacement given
   * @param {string} marco: The macro name to be replaced - could be a frag macro
   * @param replacement: String or Fragment 
   */
  replace(marco, replacement) {
    let fragMacroReplace = htmlRegex.fragMacro().test(marco);

    if (!fragMacroReplace) {
      // If we're not replacing a frag macro
      this.markup = this.markup.replace(marco, replacement);
    }
  
    if (fragMacroReplace) {
      // ToDo: If we are replacing a frag macro
      console.log("Frag Replacement")
    }
  }

}

/**
 * String prototype getFrag - Turns a string into a dom fragment
 */
String.prototype.getFrag = function () {
  // FYI: createDocumentFragment
  // A newly created, empty, DocumentFragment object, 
  // which is ready to have nodes inserted into it.
  var frag = document.createDocumentFragment(),
    tmp = document.createElement('body'), 
    child;
  tmp.innerHTML = this;
  // Append elements in a loop to a DocumentFragment, so that the browser does
  // not re-render the document for each node
  while(child = tmp.firstChild) {
    frag.appendChild(child);
  }
  return frag;
}