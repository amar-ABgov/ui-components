<svelte:options tag="goa-radio-item" />

<script lang="ts">
  import { onMount } from "svelte";
  import { getContext, ContextStore } from '../../common/context-store';
  import { BIND } from "./types";

  export let value: string;
  export let label: string;
  export let name: string;

  let ctx: ContextStore;

  onMount(() => {
    const maxAttempts = 10;
    let attempts = 0; 
    const fn = setInterval(() => {
      attempts++;
      if (name) {
        ctx = getContext(name);
        if (!ctx) {
          return;
        }
        ctx.notify({
          type: BIND,
          value,
          label,
        });
        clearInterval(fn);
      }
      if (attempts > maxAttempts) {
        console.error("goa-radio-item: missing the required `name` attribute. It must match the parent's name attribute.")
        clearInterval(fn);
      }
    }, 10);
  })

</script>
