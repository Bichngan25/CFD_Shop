import counterReducer from "./reducers/counterReducer";

const { createStore } = require("redux");

const store = createStore(counterReducer)

export default store
