<script>
  import shuffle from 'lodash.shuffle';
  const na = shuffle([
    'nyc', 'sfo', 'yvr', 'san',
    'phl', 'bos', 'sea',
  ]);

  const eu = shuffle([
    'ber', 'lon',
  ]);

  const inactive = shuffle([
    'ord',
  ]);
</script>

<h1>office hours dot lol</h1>

<div id="list-container">
  <div id="na">
    <h3>north america:</h3>
    <ul>
      {#each na as page}
        <li><a href="{`/${page}`}">{page}</a></li>
      {/each}
    </ul>
  </div>
  <div id="eu">
    <h3>europe:</h3>
    <ul>
      {#each eu as page}
        <li><a href="{`/${page}`}">{page}</a></li>
      {/each}
    </ul>
  </div>
  <div id="inactive">
    <h3>inactive:</h3>
    <ul>
      {#each inactive as page}
        <li><a href="{`/${page}`}">{page}</a></li>
      {/each}
    </ul>
  </div>
</div>

<p>
  If I have the wrong contact person listed on a page or bad
  information or you want to tell me something interesting
  or you want me to add a city or you want me to add a
  warning on a page or you want to give me a bug report or
  whatever let me know
  <a href="https://www.twitter.com/whiskeytuesday">@whiskeytuesday</a>
</p>

<p>
  The QR codes on each page link back to themselves so you
  can help a friend bookmark the page for their local event
  or whatever. They were super cool ASCII QR codes but they
  refuse to render correctly on mobile so they're boring
  svgs now. I'm not salty about it at all.
</p>

<p>Dark mode works now (if it's your system default).
Explicit buttons coming soon™</p>

<style>
  #list-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #list-container > div {
    padding: 1rem;
    border: 1px dashed var(--color-border);
  }
</style>
