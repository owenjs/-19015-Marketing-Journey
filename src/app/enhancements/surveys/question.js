export default class Question {

  constructor(options, callBacks) {
    this.callBacks = callBacks;
    this.options = options;
    this.setMinMax();
    this.rangeFragment = this.buildRanges();
  }

  setMinMax() {
    // Find the Min and Max for this question
    if(this.options[0].label.innerHTML.match(/^(\d+).*$/)) {
      this.min = RegExp.$1;
      this.max = this.options.length - ( 1 - this.min );
    }
  }

  buildRanges() {
    let ranges = [];

    for(let i = this.min; i <= this.max; i++) {
      let range = String.prototype.toFrag("<span>" + i + "</span>");
      // Add click listener for Each Range
      range.children[0].addEventListener('click', (e) => {
        this.handleRangeChange(e.currentTarget, i);
      });
      ranges.push(range);
    }
    return ranges;
  }

  handleRangeChange(range, id) {
    this.options[id].check();

    if (this.currentAnswer) {
      this.currentAnswer.className = "";
    }
    this.currentAnswer = range;
    this.currentAnswer.className = "c2form_slider__range__current";
    console.log(`Range Change ${id}`);
    this.callBacks.fnNext();
  }

}