import React from "react";
import { Route } from "react-router-dom";
import LiveMock from "./Home";
import AddCard from "./addCard";
const LiveMockRouter = [
<Route path="/livemock" element={<LiveMock />} />,
<Route path="/add-Live-exam" element={<AddCard />} />
];

export default LiveMockRouter;
