export const simulationRequestDelayTimer = (callback) => {
  const timer = setTimeout(() => {
    callback();
    clearTimeout(timer);
  }, 1000);
};
