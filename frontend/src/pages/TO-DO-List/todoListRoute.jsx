import React from 'react'
import { Route } from 'react-router-dom'

import TodoApp from './Home'
const todoListRoute = [
  // <Route path="/todo-list" element={<Home />} />,
  <Route path="/todo-list" element={<TodoApp />} />,
];

export default todoListRoute; 