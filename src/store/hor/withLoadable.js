const loadingReducer = (state) => ({
  ...state,
  error: '',
  loading: true,
  success: false,
});

const successReducer = (state) => ({
  ...state,
  error: '',
  loading: false,
  success: true,
});

const errorReducer = (state, action) => ({
  ...state,
  error: action.payload,
  loading: false,
  success: false,
});

const noopReducer = (state) => state;

const withLoadable = (actionTypes) => {
  const actionReducerMap = {
    [actionTypes.loadingActionType]: loadingReducer,
    [actionTypes.successActionType]: successReducer,
    [actionTypes.errorActionType]: errorReducer,
  };

  return (baseReducer) => (state, action) => {
    const reducerFunction = actionReducerMap[action.type] || noopReducer;
    const newState = reducerFunction(state, action);
    return baseReducer(newState, action);
  };
};

export default withLoadable;
