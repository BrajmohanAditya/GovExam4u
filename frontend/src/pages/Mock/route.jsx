import React from 'react';

import { Route } from 'react-router-dom';
import Counter from './counter';
const counterRoute = [
  <Route path="/counter" element={<Counter />} key="mockHome" />,
];

export default counterRoute;