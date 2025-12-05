import React from 'react'
import { Route } from 'react-router-dom'
import Home from './home'

const todoListRoute = [
    <Route path="/todo-list" element={<Home />} />,
]

export default todoListRoute; 