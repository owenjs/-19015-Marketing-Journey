let htmlRegex = {

  /**
   * openingElementTags - Regex for matching the opening tags of
   *                      a html element.
   * 
   * Groups in each Match:
   *    #1: The node name for the html element
   *    #2: Class name for the html element - can be undefined
   * 
   * The non double escaped version:
   * <([^/][^> ]*).*?(?:class="([^"]+)"[^>]*)?>
   *  
   * @param {string} flag: The expression flag being used, optional
   * @return {object} The regex expression object
   */
  openingElementTags: (flag) => {
    if(!flag) {flag = "g"}
    return new RegExp(
      '<([^\/][^> ]*).*?(?:class="([^"]+)"[^>]*)?>', 
      flag
    );
  },

  /**
   * elementContent - Regex for matching whole html element
   *                  from opening and closing tags with content returned
   * 
   * Groups in each Match:
   *    #1: The node name for the html element
   *    #2: Class name for the html element - can be undefined
   *    #3: The Content of the html element - can be undefined
   * 
   * The non double escaped version:
   * <([^\/][^> ]*).*?(?:class="([^"]+)"[^>]*)?>([\w\W]*?)<\/\1>
   *  
   * @param {string} flag: The expression flag being used, optional
   * @return {object} The regex expression object
   */
  elementContent: (flag) => {
    if(!flag) {flag = "g"}
    return new RegExp(
      '<([^\/][^> ]*).*?(?:class="([^"]+)"[^>]*)?>([\\w\\W]*?)<\/\\1>', 
      flag
    );
  },

  /**
   * fragMacro - Regex for matching frag macros
   * 
   * Groups in each Match:
   *    #1: The macro name
   * 
   * The non double escaped version:
   * \$frag_([^$]+)\$
   *  
   * @param {string} flag: The expression flag being used, optional
   * @return {object} The regex expression object
   */
  fragMacro: (flag) => {
    if(!flag) {flag = "g"}
    return new RegExp(
      '\\$frag_([^$]+)\\$', 
      flag
    );
  },

  /**
   * namedFragMacro - Regex for matching a specific frag macro
   *  
   * @param {string} macroName: The name of the macro being matched
   * @param {string} flag: The expression flag being used, optional
   * @return {object} The regex expression object
   */
  namedFragMacro: (flag) => {
    if(!flag) {flag = "g"}
    return new RegExp(
      '\\$frag_' + macroName + '\\$', 
      flag
    );
  },

}

/**
 * RegExp prototype forEachMatch - Loops through each regex match 
 * and calls the call back method given 
 * @param {string} string: The text being matched
 * @param {function} fnCallBack: The function called for each match
 */
RegExp.prototype.forEachMatch = function (string, fnCallBack) {
  let match;
  while((match = this.exec(string)) !== null) {
    fnCallBack(match);
  }
}

export default htmlRegex;