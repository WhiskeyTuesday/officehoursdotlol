<script>
  import { page } from '$app/stores'
  import { onMount } from 'svelte';
  import qr from 'qrcode-generator';
  import { THEMES, DEFAULT_THEME, setTheme, getInitialTheme } from '$lib/theme.js';
  import '../global.css';

  const MAIN_THEMES = ['light', 'dim', 'dark'];
  let currentTheme = $state(DEFAULT_THEME);
  let showAllThemes = $state(false);
  let qrClickCount = $state(0);
  let konamiProgress = $state(0);

  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  onMount(() => {
    currentTheme = getInitialTheme();

    // Mardi Gras override - show festive theme on mardi gras day
    const today = new Date();
    if (today.getMonth() === 1 && today.getDate() === 17 && today.getFullYear() === 2026) {
      currentTheme = 'mardi-gras';
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

  function selectTheme(theme) {
    currentTheme = theme;
    setTheme(theme);
  }

  // Easter egg: QR code cycles through ALL themes after 7 clicks
  function handleQrClick() {
    qrClickCount++;
    if (qrClickCount > 7) {
      const idx = THEMES.indexOf(currentTheme);
      currentTheme = THEMES[(idx + 1) % THEMES.length];
      setTheme(currentTheme);
    }
  }

  let { children } = $props();

  let lastPage = $page.url.href;

  let makeQR = (address) => {
    const theqr = $state(qr(0, 'H'));
    theqr.addData(address);
    theqr.make();
    return theqr;
  }

  let selfqr = $state(makeQR(lastPage));

  $effect(() => {
    const currentPage = $page.url.href;
    if (currentPage !== lastPage) {
      lastPage = currentPage;
      selfqr = makeQR(currentPage);
    }
  });

  let qrstring = $derived(selfqr.createSvgTag({ scalable: true, margin: 0 }));
</script>

<div class="container">
  <header class="site-header">
    {#if $page.url.pathname === '/'}
      <h1 class="site-title">office hours dot lol</h1>
    {:else}
      <a href="/"><h3 class="home-link">home</h3></a>
    {/if}

    <div class="theme-switcher">
      {#if showAllThemes}
        <select class="theme-dropdown" onchange={(e) => selectTheme(e.target.value)} value={currentTheme}>
          {#each THEMES as theme}
            <option value={theme}>{theme}</option>
          {/each}
        </select>
      {:else}
        <div class="theme-toggle">
          {#each MAIN_THEMES as theme}
            <button
              class="theme-btn"
              class:active={currentTheme === theme || (!MAIN_THEMES.includes(currentTheme) && theme === 'dim')}
              onclick={() => selectTheme(theme)}
            >{theme}</button>
          {/each}
        </div>
      {/if}
    </div>
  </header>

  {@render children?.()}

  {#if $page.url.pathname !== '/'}
    <div class="qrbox">
      <h4>QR code for this exact webpage</h4>
      <p><small>So you can hold out your phone and other people can save this
      page for future reference or whatever</small></p>
      {#if selfqr}
          <div class="qrcode" onclick={handleQrClick} onkeydown={(e) => e.key === 'Enter' && handleQrClick()} role="button" tabindex="0" title={qrClickCount > 7 ? `Theme: ${currentTheme}` : 'QR code'}>
            {@html qrstring}
          </div>
      {/if}
    </div>
  {/if}

  <div class="footer">
    <span><a href="{$page.url.href}">officehours.lol</a> is powered by <a href="https://www.lcc.solutions">The Lifestyle™ Computer Company</a> and maintained by <a href="https://www.elijasorensen.com">Elija Sorensen</a> be good to each other stay cool</span>
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

  .qrcode {
    border: 0.25rem solid var(--qr-border);
    cursor: pointer;
  }

  .qrbox {
    width: 100%;
    max-width: 60%;
    padding: 1rem 0 1rem 0;
  }

  .qrbox h4 {
    margin: 0;
  }

  .qrbox p {
    margin: 0 0 1rem 0;
  }

  .qrbox :global(svg) {
    display: block;
  }

  .qrbox :global(svg rect) {
    fill: var(--qr-fg);
  }

  .qrbox :global(svg path) {
    fill: var(--qr-bg);
  }
</style>
