const areRatesRelevant = (timestamp) => {
  const currentTime = Date.now();
  const difference = currentTime - timestamp;
  return difference < 1000 * 60 * 60 * 24;
};

export default areRatesRelevant;
