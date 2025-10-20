<script>
  import { page } from '$app/stores'
  import qr from 'qrcode-generator';
  import '../global.css';

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
    console.log('pg', 'lp:', lastPage, 'cp:', currentPage);
    if (currentPage !== lastPage) {
      lastPage = currentPage;
      selfqr = makeQR(currentPage);
    }
  });

  let qrstring = $derived(selfqr.createSvgTag({ scalable: true, margin: 0 }));
  let darkqrstring = $derived(selfqr.createSvgTag({ scalable: true, margin: 0, color: { dark: '#ff0000', light: '#eee' } }));

  let darkMode = $page.prefersColorScheme === 'dark';
</script>

<div class="container">
  {#if $page.url.pathname !== '/'}<a href="/"><h3>home</h3></a>{/if}

  {@render children?.()}

  {#if $page.url.pathname !== '/'}
    <div class="qrbox">
      <h4>QR code for this exact webpage</h4>
      <p><small>So you can hold out your phone and other people can save this
      page for future reference or whatever</small></p>
      {#if selfqr}
          <div class="qrcode">
            {@html darkMode ? darkqrstring : qrstring}
          </div>
      {/if}
    </div>
  {/if}

  {#if $page.url.pathname !== '/'}<a href="/"><h3>home</h3></a>{/if}
  <div class="footer">
    <span><a href="{$page.url.href}">officehours.lol</a> is powered by <a href="https://www.lcc.solutions">The Lifestyle™ Computer Company</a> and maintained by <a href="https://www.elijasorensen.com">Elija Sorensen</a> be good to each other stay cool</span>
  </div>
</div>

<style>
  :root {
    --qr-bg: black;
    --qr-fg: white;
  }

  .container {
    max-width: 40rem;
    margin: 0 auto;
    padding: 1rem;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --qr-bg: #333;
      --qr-fg: #ccc;
    }

    .qrcode {
      border: 0.25rem solid var(--qr-fg);
    }
  }

  .qrbox {
    width: 100%;
    max-width: 60%;
    padding: 1rem 0 1rem 0;
  }

  .qrbox h4 {
    margin: 0;
  }

  /* margin direction order is top right bottom left */
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
