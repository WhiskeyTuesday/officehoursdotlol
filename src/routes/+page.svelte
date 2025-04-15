<script>
  import shuffle from 'lodash.shuffle';
  const pages = shuffle([
    'nyc', 'sfo', 'yvr', 'chi',
    'phi', 'ber', 'lon', 'bos',
  ]);
</script>

<h1>office hours dot lol</h1>
<h3>cities:</h3>
<ul>
  {#each pages as page}
    <li><a href="{`/${page}`}">{page}</a></li>
  {/each}
</ul>

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
