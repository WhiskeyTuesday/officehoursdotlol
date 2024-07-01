<script>
  import { page } from '$app/stores'
  import qr from 'qrcode-generator';
  import '../global.css';

  const selfqr = qr(0, 'H');
  selfqr.addData($page.url.href);
  selfqr.make();
</script>

<div class="container">
  {#if $page.url.pathname !== '/'}<a href="/"><h3>home</h3></a>{/if}
  <slot />

  {#if $page.url.pathname !== '/'}
    <div class="qrcode">
      <h4>QR code for this exact webpage</h4>
      <p><small>So you can hold out your phone and other people can save this
      page for future reference or whatever</small></p>
      {#if selfqr}
        {@html selfqr.createSvgTag({ scalable: true, margin: 0 })}
      {/if}
    </div>
  {/if}

  {#if $page.url.pathname !== '/'}<a href="/"><h3>home</h3></a>{/if}
  <div class="footer">
    <span><a href="{$page.url.href}">officehours.lol</a> is powered by <a href="https://www.lcc.solutions">The Lifestyle™ Computer Company</a> and maintained by <a href="https://www.elijasorensen.com">Elija Sorensen</a> be good to each other stay cool</span>
  </div>
</div>

<style>
  .qrcode {
    width: 100%;
    max-width: 60%;
    padding: 1rem 0 1rem 0;
  }

  .qrcode h4 {
    margin: 0;
  }

  .qrcode p {
    margin: 0;
  }
</style>
