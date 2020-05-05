<script>
  import { createEventDispatcher } from 'svelte';
  import { state } from './state.js';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  export let key;
  $: ({ id, name, src, level, hp, moves } = $state[key]);

  const opponent = key === 0 ? 1 : 0;

  // const progress = tweened($state[key].hp.max, {
  //   duration: 400,
  //   easing: cubicOut
  // });

  const dispatch = createEventDispatcher();

  function attack(move) {
    dispatch('attack');
    const pokemon = { ...$state };
    const { title, type, power, accuracy } = move;

    if (pokemon[opponent].hp.current - power >= 0) {
      pokemon[opponent].hp.current = pokemon[opponent].hp.current - power;
    } else {
      pokemon[opponent].hp.current = 0;
    }

    state.set(pokemon);
    // progress.set($state[key].hp.current);
  }
</script>

<style lang="scss" scoped>
  .pokemon-hud {
    background: white;
    border: 2px solid black;
    max-width: 400px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 1rem;
  }

  .pokemon-sprite img {
    animation: summon 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
    transform-origin: bottom;
    filter: brightness(500%);
    transform: scaleY(0) scaleX(1);
  }
  @keyframes summon {
    to {
      filter: brightness(100%);
      transform: scale(1);
    }
  }
  .hp {
    grid-column: 1 / -1;
    padding-left: 200px;
    width: 100%;
  }

  .name,
  .level {
    font-size: 1rem;
  }

  .level {
    text-align: right;
  }

  button {
    padding: 0.2rem;
    margin: 0.2rem;
  }
</style>

<section class="pokemon-wrapper">
  <article class="pokemon-hud">
    <h1 class="name">{name}</h1>
    <h2 class="level">Lv{level}</h2>
    {hp.current}
    <progress class="hp" value={hp.current} max={hp.max}>{hp.current}</progress>
  </article>
  <div class="pokemon-sprite">
    <img {src} alt={`${name} sprite.`} />
  </div>

  <div class="pokemon-attacks">
    {#each moves as move, i}
      <button on:click={() => attack(move)}>{move.title}</button>
    {/each}
  </div>
</section>
