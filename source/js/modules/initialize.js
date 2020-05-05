export default () => {
  window.addEventListener(`load`, () => {
    document.body.classList.add(...[`page`, `page--loaded`]);
  });
};
