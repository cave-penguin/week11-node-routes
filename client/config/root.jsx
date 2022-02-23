import React from 'react'
import { Provider } from 'react-redux'

import store from '../redux/store'

function Root() {
    return (
        <Provider store={store}>
            <div>This is Root component!!!</div>
        </Provider>
    )
}

export default Root
