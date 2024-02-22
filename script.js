function getThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

function updateColorTheme() {
  console.log(currentThemeSetting);
  // update the button icon
  const newIcon =
    currentThemeSetting == "dark"
      ? `<i class="fa-regular fa-sun"></i>`
      : `<i class="fa-regular fa-moon"></i>`;
  button.innerHTML = newIcon;

  const newCta =
    currentThemeSetting === "dark"
      ? "Change to light theme"
      : "Change to dark theme";
  // use an aria-label if you are omitting text on the button
  // and using sun/moon icons, for example
  button.setAttribute("aria-label", newCta);

  // update theme attribute on HTML to switch theme in CSS
  html.setAttribute("data-theme", currentThemeSetting);
}

const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
const html = document.querySelector("html");

let currentThemeSetting = getThemeString({
  localStorageTheme,
  systemSettingDark,
});
const button = document.querySelector("[data-theme-toggle]");
button.addEventListener("click", () => {
  currentThemeSetting = currentThemeSetting === "dark" ? "light" : "dark";
  updateColorTheme();
  // update in local storage
  localStorage.setItem("theme", currentThemeSetting);
  html.style.transition = "background-color 0.2s";
});
updateColorTheme();
