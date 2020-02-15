import { writable } from 'svelte/store';
import Cookies from 'js-cookie';

export const isFullScreen = writable(false);
export const songsQueue = writable(Cookies.get('songsQueue') ? JSON.parse(Cookies.get('songsQueue')) : []);

songsQueue.subscribe(v => Cookies.set('songsQueue', JSON.stringify(v)));