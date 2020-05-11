/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
import throttle from "lodash/throttle";
import { titleAccentTypography, dateAccentTypography } from "./intro";

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(
      `.screen:not(.screen--result)`
    );
    this.menuElements = document.querySelectorAll(
      `.page-header__menu .js-menu-link`
    );
    this.screenBgPrizes = document.querySelector(`.screen__bg--prizes`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChangedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(
      `wheel`,
      throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, { trailing: true })
    );
    window.addEventListener(`popstate`, this.onUrlHashChangedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  animateIntroTexts() {
    if (this.activeScreen === 0) {
      setTimeout(() => titleAccentTypography.runAnimation(), 500);
      setTimeout(() => dateAccentTypography.runAnimation(), 1000);
    } else {
      titleAccentTypography.destroyAnimation();
      dateAccentTypography.destroyAnimation();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex(
      (screen) => location.hash.slice(1) === screen.id
    );
    this.activeScreen = newIndex < 0 ? 0 : newIndex;
    this.changePageDisplay();
    this.animateIntroTexts();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  toggleScreen(screen, removeClass, addClass) {
    screen.classList.remove(removeClass);
    screen.classList.add(addClass);
  }

  hideScreen(screen) {
    this.toggleScreen(screen, `active`, `screen--hidden`);
  }

  showScreen(screen) {
    this.toggleScreen(screen, `screen--hidden`, `active`);
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      if (this.activeScreen === 2) {
        this.screenBgPrizes.classList.add(`active`);
        setTimeout(() => this.hideScreen(screen), 1000);
      } else {
        this.screenBgPrizes.classList.remove(`active`);
        this.hideScreen(screen);
      }
    });

    if (this.activeScreen === 2) {
      setTimeout(
        () => this.showScreen(this.screenElements[this.activeScreen]),
        1000
      );
    } else {
      this.showScreen(this.screenElements[this.activeScreen]);
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find(
      (item) => item.dataset.href === this.screenElements[this.activeScreen].id
    );
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        screenId: this.activeScreen,
        screenName: this.screenElements[this.activeScreen].id,
        screenElement: this.screenElements[this.activeScreen],
      },
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(
        this.screenElements.length - 1,
        ++this.activeScreen
      );
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
