/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../redux/store'
import Home from '../components/Home'
import About from '../components/About'
import Page from '../components/Page'

const Root = () => {
    return (
        <Provider store={store}>
            <h1>hi</h1>
            <Routes>
                <Route path="/" element={() => <Home />} />
                <Route path="/about" element={() => <About />} />
                <Route path="/page" element={() => <Page />} />
            </Routes>
        </Provider>
    )
}

export default Root
