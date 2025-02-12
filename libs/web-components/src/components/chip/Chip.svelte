<svelte:options tag="goa-chip" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";

  import type { GoAIconType } from "../icon/Icon.svelte";
  type ChipVariant = "filter"

  export let leadingicon: GoAIconType = null;
  export let error: string = "false";
  export let deletable: string = "false";
  export let content: string;
  export let variant: ChipVariant;

  let el: HTMLElement;
  let _hovering: boolean = false;

  // booleans
  let _error: boolean;
  let _deletable: boolean;

  $: _error = toBoolean(error);
  $: _deletable = toBoolean(deletable);

  function onDelete(e: Event) {
    el.dispatchEvent(new CustomEvent("_click", { composed: true, bubbles: true }));
    e.stopPropagation();
  }
</script>

<!-- HTML -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  bind:this={el}
  data-testid="chip"
  class="chip"
  class:deletable={_deletable}
  class:error={_error}
  class:variant={variant}
  tabindex="0"
  on:click={e => _deletable && onDelete(e)}
  on:mouseover={() => _hovering = true}
  on:mouseout={() => _hovering = false}
  on:focus={() => _hovering = false}
  on:blur={() => _hovering = false}
>
  {#if leadingicon}
    <goa-icon class="leading-icon" size="medium" type={leadingicon} />
  {/if}
  <div class="text">
    {content}
  </div>
  {#if _deletable}
    <goa-icon
      class="delete-icon"
      size="medium"
      theme="filled"
      type="close-circle"
      fillcolor={_error
        ? "var(--goa-color-status-emergency)"
        : _hovering
          ? "var(--goa-color-interactive--hover)"
        : "var(--color-gray-600)"
      }
      opacity={_error
        ? _hovering
          ? 1
          : 0.5
        : 1
      }
    />
  {/if}
</div>

<!-- Style -->
<style>
  .leading-icon {
    margin-left: -0.25rem;
  }

  .chip {
    vertical-align: middle;
    align-items: center;
    background-color: var(--color-white);
    border-radius: 99px;
    border: 1px solid #949494;  /* TODO: change this to a defined color value when one is defined in the design specs */
    box-sizing: border-box;
    color: var(--goa-color-text);
    display: inline-flex;
    flex-direction: row;
    font-size: var(--chip-font-size);
    font-weight: var(--fw-regular);
    gap: 0.25rem;
    height: 2rem;
    justify-content: center;
    margin: 0.25rem;
    padding: 0 0.75rem;
    cursor: default;
  }

  .text {
    padding-bottom: var(--font-valign-fix);  /* acumin font requires this to allow for vertical alignment  */
  }

  .chip:focus {
    outline: 2px solid var(--goa-color-interactive--focus);
    background-color: var(--color-white);
  }

  .chip:hover {
    background-color: var(--color-gray-200);
  }

  .deletable {
    cursor: pointer;
  }

  .delete-icon {
    margin-right: -0.25rem;
  }

  .error,
  .error:hover {
    background-color: var(--goa-color-status-emergency-light);
  }
</style>
