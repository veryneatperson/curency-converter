const splitArray = (arr, cb) => arr.reduce(([pass, fail], elem) => (
  cb(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]]),
[[], []]);

export default splitArray;
