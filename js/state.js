import { writable } from 'svelte/store';
import pokedex from './pokemon.json';

export let state = writable({ ...pokedex })

console.log(state);
