const body = document.querySelector("body");

window.addEventListener("theme-change", (e) => {
  const theme = e.detail.theme;
  body.setAttribute("data-theme", theme);
});