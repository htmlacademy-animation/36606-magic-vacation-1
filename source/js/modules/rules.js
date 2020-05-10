export default () => {
  const rulesItems = document.querySelectorAll(`.rules__item`);

  if (rulesItems.length) {
    const lastItem = rulesItems[rulesItems.length - 1];

    lastItem.addEventListener(`animationend`, () => {
      const rulesButton = document.querySelector(`.rules__link`);

      rulesButton.classList.add(`active`);
    });
  }
};
