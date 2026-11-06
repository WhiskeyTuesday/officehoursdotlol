<script>
  import shuffle from 'lodash.shuffle';

  // (cities) and (na) are route groups, so they organize files and
  // layouts without showing up in the URL. A page at
  // (cities)/(na)/nyc is served at /nyc.
  const pages = import.meta.glob('./**/+page.svelte', { eager: true });
  const sections = import.meta.glob('./**/section.js', { eager: true });

  const sectionById = new Map();
  for (const [path, mod] of Object.entries(sections)) {
    const match = path.match(/\(cities\)\/\(([^)]+)\)\/section\.js$/);
    if (match) sectionById.set(match[1], mod);
  }

  const byBucket = new Map();
  const inactive = [];
  for (const [path, mod] of Object.entries(pages)) {
    const match = path.match(/\(cities\)\/\(([^)]+)\)\/([^/]+)\/\+page\.svelte$/);
    if (!match) continue;
    const [, bucket, slug] = match;
    const city = {
      slug,
      label: mod.label ?? slug,
      href: `/${slug}`,
    };
    if (mod.active === false) inactive.push(city);
    else {
      if (!byBucket.has(bucket)) byBucket.set(bucket, []);
      byBucket.get(bucket).push(city);
    }
  }

  const buckets = [...byBucket.entries()]
    .map(([id, cities]) => {
      const section = sectionById.get(id);
      return {
        id,
        title: section?.title ?? id,
        order: section?.order ?? 100,
        cities: shuffle(cities),
      };
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  if (inactive.length) {
    buckets.push({
      id: 'inactive',
      title: 'inactive',
      cities: shuffle(inactive),
    });
  }
</script>

<div id="list-container">
  {#each buckets as bucket (bucket.id)}
    <div id={bucket.id}>
      <h3>{bucket.title}:</h3>
      <ul>
        {#each bucket.cities as { slug, label, href } (slug)}
          <li><abbr title={label}><a href={href}>{slug}</a></abbr></li>
        {/each}
      </ul>
    </div>
  {/each}
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
