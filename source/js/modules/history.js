/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
import AccentTypography from "./accent-typography";

const historyScreen = document.querySelector(`.screen--story`);
const historyTitle = historyScreen.querySelector(`.slider__item-title`);

const historyTitleAccentTypography = new AccentTypography(
  historyTitle,
  500,
  `active`,
  `transform`
);

export { historyTitleAccentTypography };
