import React from 'react'
import ReactDom from 'react-dom'
import './assets/styles/main.scss'

// eslint-disable-next-line import/extensions
import Root from './config/root.jsx'

const target = document.getElementById('root')

ReactDom.render(<Root />, target)
