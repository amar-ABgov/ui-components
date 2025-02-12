<svelte:options tag="goa-container" />

<!-- Script -->
<script lang="ts">
  export let type: 'interactive' | 'info' | 'error' | 'success' | 'important' | 'non-interactive' = 'interactive'
  export let accent: 'thick' | 'thin' | 'filled' = 'filled';
  export let padding: "relaxed" | "compact" = "relaxed"
</script>

<!-- HTML -->
<div
  class={`
    goa-container
    goa-container--${type}
    padding--${padding}
    accent--${accent}
  `}
>
  <header class="heading--{accent}">
    <div class="title">
      <slot name="title" />
    </div>

    <div class="actions">
      <slot name="actions" />
    </div>
  </header>
  <div class="content">
    <slot />
  </div>
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
    font-size: var(--fs-base);
  }

  .goa-container {
    margin-bottom: 1rem;
    box-sizing: border-box;
  }

  .goa-container * {
    box-sizing: border-box;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;

    font-size: var(--fs-base);
    border-width: 1px;
    border-style: solid;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .content {
    border-bottom: 1px solid var(--color-gray-200);
    border-left: 1px solid var(--color-gray-200);
    border-right: 1px solid var(--color-gray-200);
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  /* Background Colour */

  .goa-container--non-interactive.accent--filled .content {
    border-color: var(--color-gray-200);
    background-color: var(--color-gray-100);
  }
  .goa-container--important.accent--filled .content {
    border-color: var(--goa-color-status-warning);
    background-color: var(--goa-color-status-warning-50);
  }
  .goa-container--error.accent--filled .content {
    border-color: var(--goa-color-status-emergency);
    background-color: var(--goa-color-status-emergency-50);
  }
  .goa-container--success.accent--filled .content {
    border-color: var(--goa-color-status-success);
    background-color: var(--goa-color-status-success-50);
  }
  .goa-container--info.accent--filled .content {
    border-color: var(--goa-color-status-info);
    background-color: var(--goa-color-status-info-50);
  }

  .title, .actions {
    padding: 0.5rem 0;
  }

  /* Padding variants */

  .padding--relaxed header {
    padding: 0 1.5rem;
  }

  .padding--relaxed .content {
    padding: 1.5rem;
  }

  .padding--compact header,
  .padding--compact .content {
    padding: 0 1rem;
  }

  .padding--compact header {
    padding: 0 1rem;
  }

  .padding--compact .content {
    padding: 1rem;
  }

  /* Override padding in small screens to the compact value */
  @media screen and (max-width: 480px) {
    .padding--relaxed header {
      padding: 0 1rem;
    }
    .padding--relaxed .content {
      padding: 1rem;
    }
  }

  /* colors */

  .goa-container--non-interactive header {
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-200);
    color: var(--color-black);
  }

  .goa-container--interactive header {
    background-color: var(--goa-color-brand);
    border-color: var(--goa-color-brand);
    color: var(--color-white);
  }

  .goa-container--info header {
    background-color: var(--goa-color-status-info);
    border-color: var(--goa-color-status-info);
    color: var(--color-white);
  }

  .goa-container--error header {
    /* TODO: need a better color name here */
    background-color: var(--goa-color-status-emergency);
    border-color: var(--goa-color-status-emergency);
    color: var(--color-white);
  }

  .goa-container--success header {
    /* TODO: need a better color name here */
    background-color: var(--goa-color-status-success);
    border-color: var(--goa-color-status-success);
    color: var(--color-white);
  }

  .goa-container--important header {
    background-color: var(--goa-color-status-warning);
    border-color: var(--goa-color-status-warning);
    color: var(--color-white);
  }

  /* Sizes */
  .heading--thick {
    padding: 0.5rem 1.5rem;
    max-height: 3rem;
    min-height: 1rem;
  }

  .heading--thick .title {
    line-height: 2rem;
  }

  .heading--thin {
    height: 0.5rem;
  }

  .heading--filled {
    display: none;
  }
  .heading--filled ~ .content {
    border-top: 1px solid var(--color-gray-200);
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .heading--thin .title,
  .heading--thin .actions {
    display: none;
  }

  .actions {
    display: flex;
    align-items: center;
  }

</style>
