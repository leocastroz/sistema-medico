// FILE: plugins/event-bus.js
import { EventEmitter } from 'events';

export default defineNuxtPlugin(() => {
  const eventBus = new EventEmitter();
  globalThis.$nuxtWebHookEvent = eventBus;
});