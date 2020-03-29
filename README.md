# About App
This is a simple currency converter which uses 2 external APIs (in order to solve the 'cors issue' i built 2 proxy wrappers) and consists of 2 pages:
1. Exchange rates (for all major currencies)
2. Converter 

P.S. Basically this is a completed Appbooster frontend developer test task (https://gist.github.com/KELiON/847543083fa37585dd06be197a405ec7)

# Deployed App
Hosted on Heroku: https://currency-converter-react-redux.herokuapp.com/

# Key features
1. Detecting user's base currency via external API (with a default fallback)
2. Fetching rates only once. All further computations are made on the client side.
3. Persisnting redux store
4. The ability to add currencies to favorites (which are shown on top of the list)
5. Unit tests both for React and Redux parts of the app (testing redux-thunk async flow is a pain :()
6. Some advanced redux features (higher-order reducer, custom middleware, consequent calls to different APIs)

P.S. I understand than some of these features might be a bit of an 'overkill' for this kind of App. However my goal was not just to complete this task, but to learn some of the advanced stuff.


# Tools used to make this App work fast:
1. React.memo() - to prevent unnecessary re-renders of the components with the same props
2. 'Lazy Loading' of the 'Converter' page
3. redux-persist - to persist redux store in the local storage.
Each time the app is loaded, the data in the persisted store is checked for relevance (rates are updated daily).
If the data relevant - we don't call the API and simply use stored data.
But if the data is outdated - we make a call to the API to get the fresh rates.


# Libraries used
1. React/Redux (with redux-thunk, redux-persist, prop-types, etc.)
2. Semantic UI React
3. Axios (for HTTP requests)
4. Jest + Enzyme + Moxios (for unit testing)
5. ESLint (for better code style)
6. Cross-env (for cross platform setting of environment scripts)
