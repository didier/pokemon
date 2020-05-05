<script>
  import Pokemon from './Pokemon.svelte';
  import { state } from './state.js';

  function handleAttack() {}
</script>

<main>
  <!-- {$state} -->
  <Pokemon key={0} />
  <Pokemon key={1} />
</main>
