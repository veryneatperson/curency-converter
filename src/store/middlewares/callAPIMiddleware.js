const callAPIMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  const {
    types, callAPI, shouldCallAPI = () => true, constructActionPayload,
  } = action;

  if (!types) {
    return next(action);
  }

  if (
    !Array.isArray(types)
    || types.length !== 3
    || !types.every((type) => typeof type === 'string')
  ) {
    throw new Error('Expected an array of three string types.');
  }

  if (typeof callAPI !== 'function') {
    throw new Error('Expected callAPI to be a function.');
  }

  if (!shouldCallAPI(getState())) {
    return Promise.resolve();
  }

  const [requestType, successType, failureType] = types;

  dispatch({ type: requestType });

  return callAPI()
    .then((res) => dispatch({
      type: successType,
      payload: constructActionPayload(res),
    }))
    .catch((err) => {
      dispatch({
        type: failureType,
        payload: err.message,
      });
    });
};

export default callAPIMiddleware;
