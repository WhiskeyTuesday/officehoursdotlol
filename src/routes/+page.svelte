<script>
  import shuffle from 'lodash.shuffle';
  const na = shuffle([
    { slug: 'nyc', label: 'New York City, NY' },
    { slug: 'sfo', label: 'San Francisco, CA' },
    { slug: 'yvr', label: 'Vancouver, BC' },
    { slug: 'yyz', label: 'Toronto, ON' },
    { slug: 'san', label: 'San Diego, CA' },
    { slug: 'phl', label: 'Philadelphia, PA' },
    { slug: 'bos', label: 'Boston, MA' },
    { slug: 'sea', label: 'Seattle, WA' },
    { slug: 'aus', label: 'Austin, TX' },
    { slug: 'dca', label: 'Washington, DC' },
    { slug: 'msy', label: 'New Orleans, LA' },
    { slug: 'pdx', label: 'Portland, OR' },
  ]);

  const eu = shuffle([
    { slug: 'lon', label: 'London, UK' },
    { slug: 'ber', label: 'Berlin, DE' },
    { slug: 'ams', label: 'Amsterdam, NL' },
  ]);

  const as = shuffle([
    { slug: 'sin', label: 'Singapore' },
  ]);

  const inactive = shuffle([
    { slug: 'ord', label: 'Chicago, IL' },
  ]);
</script>

<div id="list-container">
  <div id="na">
    <h3>north america:</h3>
    <ul>
      {#each na as { slug, label }}
        <li><abbr title="{label}"><a href="{`/${slug}`}">{slug}</a></abbr></li>
      {/each}
    </ul>
  </div>
  <div id="eu">
    <h3>europe:</h3>
    <ul>
      {#each eu as { slug, label }}
        <li><abbr title="{label}"><a href="{`/${slug}`}">{slug}</a></abbr></li>
      {/each}
    </ul>
  </div>
  <div id="as">
    <h3>asia:</h3>
    <ul>
      {#each as as { slug, label }}
        <li><abbr title="{label}"><a href="{`/${slug}`}">{slug}</a></abbr></li>
      {/each}
    </ul>
  </div>
  {#if inactive.length}
    <div id="inactive">
      <h3>inactive:</h3>
      <ul>
        {#each inactive as { slug, label }}
          <li><abbr title="{label}"><a href="{`/${slug}`}">{slug}</a></abbr></li>
        {/each}
      </ul>
    </div>
  {/if}
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
  There's also a <a href="/gettingstarted">getting started</a> page
  now. Check that out if you want to start your own office hours
  branch. Join us. JOIN USSSSSSS.
</p>

<p>
  The QR codes on each page link back to themselves so you
  can help a friend bookmark the page for their local event
  or whatever. They were super cool ASCII QR codes but they
  refuse to render correctly on mobile so they're boring
  svgs now. I'm not salty about it at all.
</p>

<style>
  #list-container {
    display: flex;
    gap: 1rem;
    flex-flow: row wrap;
    justify-content: space-around;
  }

  #list-container > div {
    min-width: 10rem;
    padding: 1rem;
    border: 1px dashed var(--color-border);
  }

  abbr {
    text-decoration: none;
  }
</style>
