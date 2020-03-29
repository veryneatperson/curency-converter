import areRatesRelevant from './areRatesRelevant';

it('should return true for timestamp within the last 24 hours', () => {
  const timestamp = Date.now() - 1000 * 60;
  expect(areRatesRelevant(timestamp)).toBe(true);
});

it('should return false for timestamp older than the last 24 hours', () => {
  const timestamp = Date.now() - (1000 * 60 * 60 * 24 + 1);
  expect(areRatesRelevant(timestamp)).toBe(false);
});
