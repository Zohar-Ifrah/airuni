import { createStore, combineReducers } from 'redux'

import { stayReducer } from './stay.reducer.js'
import { userReducer } from './user.reducer.js'
import { reviewReducer } from './review.reducer'
import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
    stayModule: stayReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : undefined
export const store = createStore(rootReducer, middleware)

<<<<<<< HEAD
// store.subscribe(() => {
//     console.log('')
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('')
//     console.log('')
// })
=======

store.subscribe(() => {
    console.log('')
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('')
    console.log('')
})



>>>>>>> 93ee5d35f5cbf5a6f7b9f4ecd845f2f2f2391939
