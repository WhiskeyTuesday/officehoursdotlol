<script>
  import qr from 'qrcode-generator';
  import shuffle from 'lodash.shuffle';

  const selfqr = qr(0, 'H');
  selfqr.addData('https://officehours.lol');
  selfqr.make();

  const pages = shuffle(['nyc', 'sfo', 'yvr']);
</script>

<h1>office hours dot lol</h1>
<p>information in case you need it</p>
<ul>
  {#each pages as page}
    <li><a href="{`/${page}`}">{page}</a></li>
  {/each}
</ul>

<p>If I have the wrong contact person listed on a page or bad information or you want to tell me something interesting or you want me to add a city or you want me to add a warning on a page or whatever let me know <a href="https://www.twitter.com/whiskeytuesday">@whiskeytuesday</a></p>

<h4>This page:</h4>
{#if selfqr}
  <pre>{selfqr.createASCII(1)}</pre>
{/if}

<style global>
</style>
