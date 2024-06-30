<script>
  import { onMount } from 'svelte';
  import qr from 'qrcode-generator';
  import shuffle from 'lodash.shuffle';

  const selfqr = qr(0, 'H');
  selfqr.addData('https://officehours.lol');
  selfqr.make();

  const pages = shuffle(['nyc', 'sfo', 'yvr']);

  let windowWidth;
  onMount(() => {
    windowWidth = window.innerWidth;
  });
</script>

<h1>office hours dot lol</h1>
<p>information in case you need it</p>
<ul>
  {#each pages as page}
    <li><a href="{`/${page}`}">{page}</a></li>
  {/each}
</ul>

<p>If I have the wrong contact person listed on a page or bad information or you want to tell me something interesting or you want me to add a city or you want me to add a warning on a page or give me a bug report or whatever let me know <a href="https://www.twitter.com/whiskeytuesday">@whiskeytuesday</a></p>

<div class="qrcode">
  {#if selfqr}
    <h4>This page:</h4>
    <!-- if on mobile -->
    {#if windowWidth < 600}
      {@html selfqr.createSvgTag({ scalable: true, margin: 0 })}
    {:else}
      <pre>{selfqr.createASCII(2)}</pre>
    {/if}
  {/if}
</div>

<style>
  .qrcode {
    width: 100%;
    max-width: 60%;
  }
</style>
