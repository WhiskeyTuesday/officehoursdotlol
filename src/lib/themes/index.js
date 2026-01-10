// Import all theme CSS files (side effect - adds styles to bundle)
const themeModules = import.meta.glob('./*.css', { eager: true });

// Derive theme names from filenames
export const THEMES = Object.keys(themeModules)
  .map(path => path.replace('./', '').replace('.css', ''))
  .sort((a, b) => {
    // Keep light, dark, dim at the front in that order
    const priority = ['light', 'dark', 'dim'];
    const aIdx = priority.indexOf(a);
    const bIdx = priority.indexOf(b);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return a.localeCompare(b);
  });

export const DEFAULT_THEME = 'dim';
