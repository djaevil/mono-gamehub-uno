const listeners = {};

const eventBus = {
  on(eventName, callback) {
    if (!listeners[eventName]) {
      listeners[eventName] = [];
    }
    listeners[eventName].push(callback);
  },

  off(eventName, callback) {
    const eventListeners = listeners[eventName];
    if (!eventListeners) return;

    listeners[eventName] = eventListeners.filter((cb) => cb !== callback);
  },

  once(eventName, callback) {
    function wrapper(payload) {
      callback(payload);
      eventBus.off(eventName, wrapper);
    }
    eventBus.on(eventName, wrapper);
  },

  emit(eventName, payload) {
    console.log(`[EventBus emit] ${eventName}`, payload);

    const eventListeners = listeners[eventName];
    if (!eventListeners) return;

    for (const cb of eventListeners) {
      cb(payload);
    }
  },

  clear(eventName) {
    if (listeners[eventName]) {
      delete listeners[eventName];
    }
  },

  clearAll() {
    for (const key in listeners) {
      delete listeners[key];
    }
  },
};

export default eventBus;
