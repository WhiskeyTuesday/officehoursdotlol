import { THEMES, DEFAULT_THEME } from './themes/index.js';

export { THEMES, DEFAULT_THEME };

const STORAGE_KEY = 'theme';

/** @param {unknown} value @returns {boolean} */
function isValidTheme(value) {
  return typeof value === 'string' && THEMES.includes(value);
}

/** @returns {string} */
function getSystemPreference() {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return DEFAULT_THEME;
}

/** @returns {string | null} */
function getStoredTheme() {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  return isValidTheme(stored) ? stored : null;
}

/** @param {string} theme */
function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
}

/** @returns {string} */
export function getInitialTheme() {
  return getStoredTheme() ?? getSystemPreference();
}

/** @param {string} theme */
export function setTheme(theme) {
  if (!isValidTheme(theme)) return;
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

export function clearThemePreference() {
  localStorage.removeItem(STORAGE_KEY);
  applyTheme(getSystemPreference());
}

/** @returns {string} */
export function initTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);

  // Listen for system preference changes (only applies if no stored preference)
  if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (!getStoredTheme()) {
        applyTheme(getSystemPreference());
      }
    });
  }

  return theme;
}
