export default class StickyHeader {

  constructor(header) {
    this.header = header;
    this.sticky = false;

    document.addEventListener("scroll", this._handleScroll(event));
  }


  sticky() {
    return this.sticky;
  }

  _handleScroll(e) {
    var scroll = e.scrollY,
      sitckyClassName = "c2-header--sticky",
      header = document.getElementsByClassName("c2-header")[0];

    if (scroll > 200) {
      header.classList.add(sitckyClassName);
      if (this.oldScroll > scroll) {
        // True for Scrolling Up
        header.classList.add("c2-header--sticky--display");
      } else {
        // False for Scrolling Up
        header.classList.remove("c2-header--sticky--display");
      }
    }
    if (scroll + header.clientHeight <= 200) {
      header.classList.remove(sitckyClassName);
    }

    
    this.oldScroll = scroll;
  }

}