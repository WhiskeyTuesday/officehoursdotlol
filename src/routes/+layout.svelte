<script>
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { THEMES, getInitialTheme } from '#lib/theme.js';
  import { getTheme, selectTheme, noteTheme } from '#lib/theme-state.svelte.js';
  import '../global.css';

  const MAIN_THEMES = ['light', 'dim', 'dark'];
  let showAllThemes = $state(false);
  let konamiProgress = $state(0);

  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  onMount(() => {
    noteTheme(getInitialTheme());

    // Mardi Gras override - show festive theme on mardi gras day
    const today = new Date();
    if (today.getMonth() === 1 && today.getDate() === 17 && today.getFullYear() === 2026) {
      noteTheme('mardi-gras');
      document.documentElement.dataset.theme = 'mardi-gras';
    }

    // Keyboard listener for Konami code easter egg
    const handleKeyDown = (e) => {
      const expected = KONAMI[konamiProgress];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        konamiProgress++;
        if (konamiProgress === KONAMI.length) {
          showAllThemes = true;
          konamiProgress = 0;
        }
      } else {
        konamiProgress = (e.key === KONAMI[0]) ? 1 : 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  let { children } = $props();
</script>

<div class="container">
  <header class="site-header">
    {#if page.url.pathname === '/'}
      <h1 class="site-title">office hours dot lol</h1>
    {:else}
      <a href="/"><h3 class="home-link">home</h3></a>
    {/if}

    <div class="theme-switcher">
      {#if showAllThemes}
        <select class="theme-dropdown" onchange={(e) => selectTheme(e.target.value)} value={getTheme()}>
          {#each THEMES as theme}
            <option value={theme}>{theme}</option>
          {/each}
        </select>
      {:else}
        <div class="theme-toggle">
          {#each MAIN_THEMES as theme}
            <button
              class="theme-btn"
              class:active={getTheme() === theme || (!MAIN_THEMES.includes(getTheme()) && theme === 'dim')}
              onclick={() => selectTheme(theme)}
            >{theme}</button>
          {/each}
        </div>
      {/if}
    </div>
  </header>

  {@render children?.()}

  <div class="footer">
    <span><a href="{page.url.href}">officehours.lol</a> is a project of <a href="https://www.elijasorensen.com">Elija Sorensen</a> be good to each other stay cool; add a city or fix a page on <a href="https://www.github.com/whiskeytuesday/officehoursdotlol">the repo</a>.</span>
  </div>
</div>

<style>
  .container {
    max-width: 40rem;
    margin: 0 auto;
    padding: 1rem;
  }

  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.33rem;
    margin-bottom: 1.33rem;
  }

  .site-title {
    margin: 0;
    font-size: 2em;
  }

  .home-link {
    margin: 0;
  }

  .theme-switcher {
    font-family: monospace;
    font-size: 0.75rem;
  }

  .theme-toggle {
    display: flex;
    gap: 0;
  }

  .theme-btn {
    background: transparent;
    border: 1px solid var(--color-muted);
    color: var(--color-muted);
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    transition: all 0.15s ease;
  }

  .theme-btn:first-child {
    border-radius: 0.25rem 0 0 0.25rem;
  }

  .theme-btn:last-child {
    border-radius: 0 0.25rem 0.25rem 0;
  }

  .theme-btn:not(:first-child) {
    border-left: none;
  }

  .theme-btn:hover {
    color: var(--color-text);
    border-color: var(--color-text);
  }

  .theme-btn.active {
    background: var(--color-text);
    color: var(--color-bg);
    border-color: var(--color-text);
  }

  .theme-dropdown {
    background: var(--color-bg);
    color: var(--color-text);
    border: 1px solid var(--color-muted);
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
  }

  .theme-dropdown:focus {
    outline: 1px solid var(--color-text);
    border-color: var(--color-text);
  }
</style>
