import rootReducer from './reducers';
import { createStore } from 'redux';

const store = createStore(rootReducer);
console.log(rootReducer);

store.subscribe( ()=>console.log(store.getState()) );

export default store;
