import React from "react";
import { Route } from "react-router-dom";
import LiveMock from "./Home";
import AddCard from "./addCard";
import UpdateDeleteCard from "./updateDeletCard";

const LiveMockRouter = [
  <Route path="/livemock" element={<LiveMock />} />,
  <Route path="/add-Live-exam" element={<AddCard />} />,
  <Route path="/card/:id/updateDelete" element={<UpdateDeleteCard />} />,
];

export default LiveMockRouter;
