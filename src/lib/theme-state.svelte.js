import { DEFAULT_THEME, setTheme } from './theme.js';

let current = $state(DEFAULT_THEME);

export function getTheme() {
  return current;
}

export function selectTheme(theme) {
  current = theme;
  setTheme(theme);
}

// Switcher-only update. Does not write localStorage, so a one-day
// override (Mardi Gras) does not stick as the saved preference.
export function noteTheme(theme) {
  current = theme;
}
