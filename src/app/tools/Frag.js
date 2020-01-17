import htmlRegex from '../utils/htmlRegex.js';

export default class Frag {

  constructor(markup) {
    this.originalMarkup = markup;
    this.markup = markup;
    this.fragRefMarkUp = "<fragRef class='$MACRONAME$'></fragRef>";
    this.fragRefs = {
      macros: [],
    };
    this.init();
  }

  init() {
    let fragMacroRegex = htmlRegex.fragMacro();

    fragMacroRegex.forEachMatch(this.markup, (match) => {
      this.replaceFragMacroWithRef(match);
    });
    console.log();
  }

  replaceFragMacroWithRef(match) {
    let macro = match[0], macroName = match[1],
      fragRefMarkUp = this.fragRefMarkUp.replace("$MACRONAME$", macroName);

    // Replace the frag Macro with the reference markup
    this.markup = this.markup.replace(macro, fragRefMarkUp);
    this.addMacroReference(macroName);
  }

  addMacroReference(macroName) {
    if (this.fragRefs.macros.indexOf(macroName) == -1) {
      // If we don't already have this macro refereneced, add it
      this.fragRefs.macros.push(macroName);
      this.fragRefs[macroName] = [];
    }
  }

  addToFragReference(macroName, replacement) {
    if (this.fragRefs.macros.indexOf(macroName) == -1) {
      // If we don't have this macro referenced, return
      console.log(`The macro name: ${macroName} is not referenced in this markup`);
      return;
    }
    this.fragRefs[macroName].pushArray(replacement);
  }

  /**
   * Frag prototype reset - Resets this frag's markup to the original
   */
  reset() {
    this.markup = this.originalMarkup;
    this.fragRefs = {
      macros: [],
    };
  }

  /**
   * get print - Returns the DOM fragment for the frag
   */
  get print() {
    // ToDo: Warn user for missing macros and frag macros
    let markupFrag = this.markup.toFrag();

    this.fragRefs.macros.forEach((macroName) => {
      let fragRefereneces = markupFrag.querySelectorAll("fragRef." + macroName);
      fragRefereneces.forEach((fragRef) => {
        fragRef.parentNode.appendChildren(this.fragRefs[macroName]);
        // Remove Macro Reference Markup
        fragRef.remove();
      });
    });
    return markupFrag;
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
      // ToDo: Check replacement is a string
      this.markup = this.markup.replace(marco, replacement);
    }
  
    if (fragMacroReplace) {
      // If we're replaceing a frag Macro
      let macroName = htmlRegex.fragMacro().exec(marco)[1];
      // ToDo: Check replacement is a fragment
      this.addToFragReference(macroName, replacement);
    }
  }

}

/**
 * String prototype toFrag - Turns a string into a dom fragment
 */
String.prototype.toFrag = function () {
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