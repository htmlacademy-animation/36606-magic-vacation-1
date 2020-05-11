/* eslint-disable indent */
export default class AccentTypographyBuild {
  constructor(element, timer, classForActivate, property) {
    this._TIME_SPACE = 100;

    this._element = element;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._timeOffset = 0;

    this.prePareText();
  }

  createElement(letter) {
    const span = document.createElement(`span`);
    span.className = `letter`;
    span.textContent = letter;
    span.style.transition = `${this._property} ${
      this._timer
    }ms ease ${this.getTimeOffset(0, 500)}ms`;
    this._timeOffset += 100;
    return span;
  }

  getTimeOffset(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    const text = this._element.textContent
      .trim()
      .split(` `)
      .filter((letter) => letter !== ``);

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, letter) => {
        fragment.appendChild(this.createElement(letter));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}
