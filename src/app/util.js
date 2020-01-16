let util = {

  /**
   * localRequest - Request a file from the local domain
   * @param {string} URL: URL path for the file
   * @param {function} callback: The function to call when the request is ready
   */
  localRequest: (URL, callback, err)=> {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onload = () => {
      // When the request is loaded, call our method
      callback(httpRequest.responseText);
    };
    httpRequest.onerror = () => {
      console.log(`An error occurred during the fetch of ${URL}`);
      if (err) {
        err(URL);
      }
    };
    httpRequest.open('GET', URL);
    httpRequest.send();
  },

};

export default util;