import { writable } from "svelte/store";

// Tags
export const tagArray = writable([]);

// People
export const peopleArray = writable([]);

// Chat
export const userId = writable(null);
export const author = writable("user");
export const comments = writable([]);
export const thisDay = writable(null);

// Server URL
export const backendServerUrl = writable("http://localhost:4000/v1");
export const frontendServerUrl = writable("http://localhost:5000/#");
