/**
 * HTMLElement prototype findChildrenByClassName - Find the children in this
 * html element that match a class name given
 * @param {string} className: The class name to match
 */
HTMLElement.prototype.findChildrenByClassName = function (className) {
  if (!this.children || !this.children.length) { return }

  let elementsFound = [];

  this.children.forEach((child) => {
    let match = child.classList.contains(className);

    // If we didn't find a match search the children for any matches
    if (!match) {
      elementsFound.pushArray(child.findChildrenByClassName(className));
    }
    // If it's a Match, Add this child to the array of elements found
    if (match) {
      elementsFound.push(child);
    }
  });

  return elementsFound;
};

/**
 * HTMLElement prototype forEach - Append an array of Children
 * @param {array} children: The array of Children
 */
HTMLElement.prototype.appendChildren = function (children) {
  if (!children || !children.length) { return };
  children.forEach((child) => {
    this.appendChild(child);
  });
};

/**
 * HTMLCollection prototype forEach - A for each call for a HTML collection
 * @param {fn} callBack: The function call back for each element
 */
HTMLCollection.prototype.forEach = function (callBack) {
  Array.prototype.slice.call(this).forEach((el, id) => { callBack(el, id) });
}

/**
 * * IE Support
 * NodeList prototype forEach -  A for each call for a Node List
 */
if (!('forEach' in NodeList.prototype)) {
  NodeList.prototype.forEach = function (callBack) {
    Array.prototype.slice.call(this).forEach((el, id) => { callBack(el, id) });
  };
}

/**
 * Array prototype pushArray - Allow each Element of an Array to be added to
 * without having the whole array added as one element to this array
 * @param {array} arr: The array to push
 */
Array.prototype.pushArray = function (arr) {
  if (!arr || !arr.length) { return };
  this.push.apply(this, arr);
};

/**
 * * IE Support
 * Element prototype remove - Removes the Object from the DOM tree it belongs to
 */
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

let protoTypes = "";
export default protoTypes;