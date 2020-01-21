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

  /**
   * init - Called After Constructor and Reset
   */
  init() {
    let fragMacroRegex = htmlRegex.fragMacro();
    fragMacroRegex.forEachMatch(this.markup, (match) => {
      // For each Macro Found in the Markup, replace it with a fragRef Markup
      this.replaceFragMacroWithRef(match);
    });
  }

  /**
   * replaceFragMacroWithRef - Replaces a Frag Macro in the Markup with the fragRef markup
   *  
   * @param {obj} match: The macro Match container full macro and it's name
   */
  replaceFragMacroWithRef(match) {
    let macro = match[0], macroName = match[1],
      fragRefMarkUp = this.fragRefMarkUp.replace("$MACRONAME$", macroName);

    // Replace the frag Macro with the reference markup
    this.markup = this.markup.replace(macro, fragRefMarkUp);
    this.addMacroReference(macroName);
  }

  /**
   * addMacroReference - Adds a macro reference to this.fragRefs, if not done already
   *  
   * @param {string} macroName: The Macro name being added
   */
  addMacroReference(macroName) {
    if (this.fragRefs.macros.indexOf(macroName) == -1) {
      // If we don't already have this macro refereneced, add it
      this.fragRefs.macros.push(macroName);
      this.fragRefs[macroName] = [];
    }
  }

  /**
   * addToFragReference - Adds elements to the macro reference in this.fragRefs
   *  
   * @param {string} macroName: The Macro name which will reference the elements given
   * @param {Array} replacement: An array of elements that will be replacing the fragRef
   */
  addToFragReference(macroName, replacement) {
    if (this.fragRefs.macros.indexOf(macroName) == -1) {
      // If we don't have this macro referenced, return
      console.log(`The macro name: ${macroName} is not referenced in this markup`);
      return;
    }
    this.fragRefs[macroName].pushArray(replacement);
  }

  /**
   * reset - Resets this frag's markup to the original and all frag references
   */
  reset() {
    this.markup = this.originalMarkup;
    this.fragRefs = {
      macros: [],
    };
    this.init();
  }

  /**
   * get render - Returns the DOM fragment for the frag and frag macros replaced
   */
  get render() {
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
   * @param replacement: String or Fragment which will replace the marco
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
String.prototype.toFrag = function (string) {
  // FYI: createDocumentFragment
  // A newly created, empty, DocumentFragment object, 
  // which is ready to have nodes inserted into it.
  var frag = document.createDocumentFragment(),
    tmp = document.createElement('body'), 
    child;
  tmp.innerHTML = (string) ? string : this;
  // Append elements in a loop to a DocumentFragment, so that the browser does
  // not re-render the document for each node
  while(child = tmp.firstChild) {
    frag.appendChild(child);
  }
  return frag;
}