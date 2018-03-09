import React from 'react'
import { Provider } from 'react-redux'
import App from '../components/App'

// @Store
//const store = createStore(workHoursData, applyMiddleware(thunk))
type RootType = {
store: {}
};

export default function Root({store}:RootType) {
    return (
        <Provider store={store}>
	    	<App />
	  	</Provider>
    );
}