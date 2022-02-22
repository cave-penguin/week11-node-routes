import React from 'react'
import ReactDom from 'react-dom'
import './main.scss'

function Main() {
    return <div>This is main component!!!</div>
}

const target = document.getElementById('root')
// const target = document.querySelector('#root')

ReactDom.render(<Main />, target)
