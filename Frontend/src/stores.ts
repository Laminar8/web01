import { writable } from "svelte/store";

export const modal = writable(null);
export const tagsArray = writable([]);
export const comments = writable([]);
export const userId = writable(null);
export const author = writable("user");
export const thisDay = writable(null);
export const backendServerUrl = writable("http://localhost:4000/v1");
export const frontendServerUrl = writable("http://localhost:5000/#");
