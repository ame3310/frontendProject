const listeners = new Set();

const tokenEvents = {
  subscribe: (callback) => {
    listeners.add(callback);

    return () => {
      listeners.delete(callback);
    };
  },

  notify: (newToken) => {
    listeners.forEach((callback) => callback(newToken));
  },
};

export default tokenEvents;
