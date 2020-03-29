const baseCurr = 'rub';

// Outdated data for persisted store
const today = Date.now();
const oldTimestamp = today - (2 * 1000 * 60 * 60 * 24);
const oldUTCstring = (new Date(oldTimestamp)).toUTCString();

const oldRates = {
  usd: {
    code: 'USD',
    alphaCode: 'USD',
    numericCode: '840',
    name: 'U.S. Dollar',
    rate: 0.016262041058047,
    date: oldUTCstring,
    inverseRate: 61.49289602889,
  },
  eur: {
    code: 'EUR',
    alphaCode: 'EUR',
    numericCode: '978',
    name: 'Euro',
    rate: 0.014623364724005,
    date: oldUTCstring,
    inverseRate: 68.383714615178,
  },
  cad: {
    code: 'CAD',
    alphaCode: 'CAD',
    numericCode: '124',
    name: 'Canadian Dollar',
    rate: 0.02123062884094,
    date: oldUTCstring,
    inverseRate: 47.101760738789,
  },
};

const outdatedPersistedState = {
  rates:
  {
    rates: { ...oldRates },
    fetchedForCurrency: 'rub',
    timestamp: oldTimestamp,
    error: '',
    loading: false,
    success: true,
  },
  user: { baseCurrency: 'rub', favorites: [] },
};


// Relevant data for persisted store
const newUTCstring = (new Date()).toUTCString();

const newRates = {
  usd: {
    code: 'USD',
    alphaCode: 'USD',
    numericCode: '840',
    name: 'U.S. Dollar',
    rate: 0.016262041058047,
    date: newUTCstring,
    inverseRate: 61.49289602889,
  },
  eur: {
    code: 'EUR',
    alphaCode: 'EUR',
    numericCode: '978',
    name: 'Euro',
    rate: 0.014623364724005,
    date: newUTCstring,
    inverseRate: 68.383714615178,
  },
  cad: {
    code: 'CAD',
    alphaCode: 'CAD',
    numericCode: '124',
    name: 'Canadian Dollar',
    rate: 0.02123062884094,
    date: newUTCstring,
    inverseRate: 47.101760738789,
  },
};

const relevantPersistedState = {
  rates:
  {
    rates: { ...newRates },
    fetchedForCurrency: 'rub',
    timestamp: today,
    error: '',
    loading: false,
    success: true,
  },
  user: { baseCurrency: 'rub', favorites: [] },
};

export {
  baseCurr,
  newRates,
  outdatedPersistedState,
  relevantPersistedState,
};
