import splitArray from './splitArray';

it('should split array of strings', () => {
  const arr = ['aud', 'brl', 'cad', 'rub', 'usd'];
  const includesLetter = (el) => el.includes('a');
  const expectedPassed = ['aud', 'cad'];
  const exptectedFailed = ['brl', 'rub', 'usd'];
  const [passed, failed] = splitArray(arr, includesLetter);
  expect(passed).toEqual(expectedPassed);
  expect(failed).toEqual(exptectedFailed);
});
