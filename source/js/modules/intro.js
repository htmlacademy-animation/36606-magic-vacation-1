/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
import AccentTypography from "./accent-typography";

const title = document.querySelector(`.intro__title`);
const date = document.querySelector(`.intro__date`);

const titleAccentTypography = new AccentTypography(
  title,
  500,
  `active`,
  `transform`
);

const dateAccentTypography = new AccentTypography(
  date,
  500,
  `active`,
  `transform`
);

export { titleAccentTypography, dateAccentTypography };
