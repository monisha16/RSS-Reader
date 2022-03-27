import React from "react";
// import styled from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Bookmarks from "./components/Bookmarks/Bookmarks";
import Mainpage from "./components/Mainpage/Mainpage";
import FeedView from "./components/FeedView/FeedView";

//Handle Indications of which page we are at
export default () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Mainpage/>} />
      <Route exact path="/:feedid" element={<FeedView/>} />
      <Route exact path="/bookmarks" element={<Bookmarks/>} />
    </Routes>
  </BrowserRouter>
);
