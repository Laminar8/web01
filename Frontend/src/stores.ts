import { writable } from "svelte/store";

// User
export const userId = writable(null);

// Tags
export const tagArray = writable([]);

// People
export const peopleArray = writable([]);

// Chat
export const author = writable("user");
export const comments = writable([]);
export const thisDay = writable(null);
export const peopleNow = writable([]);

// Server URL
export const backendServerUrl = writable("http://localhost:4000/v1");
export const frontendServerUrl = writable("http://localhost:5000/#");
