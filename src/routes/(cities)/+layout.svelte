<script>
  import { page } from '$app/state';
  import qr from 'qrcode-generator';
  import { THEMES } from '#lib/theme.js';
  import { getTheme, selectTheme } from '#lib/theme-state.svelte.js';

  let { children } = $props();
  let qrClickCount = $state(0);

  // Easter egg: QR code cycles through ALL themes after 7 clicks
  function handleQrClick() {
    qrClickCount++;
    if (qrClickCount > 7) {
      const idx = THEMES.indexOf(getTheme());
      selectTheme(THEMES[(idx + 1) % THEMES.length]);
    }
  }

  let lastPage = page.url.href;

  let makeQR = (address) => {
    const theqr = $state(qr(0, 'H'));
    theqr.addData(address);
    theqr.make();
    return theqr;
  }

  let selfqr = $state(makeQR(lastPage));

  $effect(() => {
    const currentPage = page.url.href;
    if (currentPage !== lastPage) {
      lastPage = currentPage;
      selfqr = makeQR(currentPage);
    }
  });

  let qrstring = $derived(selfqr.createSvgTag({ scalable: true, margin: 0 }));
</script>

{@render children?.()}

<div class="qrbox">
  <h4>QR code for this exact webpage</h4>
  <p><small>So you can hold out your phone and other people can save this
  page for future reference or whatever</small></p>
  <p><small>page wrong, or you want to start your own?
  <a href="https://www.github.com/whiskeytuesday/officehoursdotlol">the repo</a>
  takes pull requests</small></p>
  {#if selfqr}
    <div class="qrcode" onclick={handleQrClick} onkeydown={(e) => e.key === 'Enter' && handleQrClick()} role="button" tabindex="0" title={qrClickCount > 7 ? `Theme: ${getTheme()}` : 'QR code'}>
      {@html qrstring}
    </div>
  {/if}
</div>

<style>
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
