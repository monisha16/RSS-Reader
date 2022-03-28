import React from "react";
import { Routes, Route } from 'react-router-dom';
import Bookmarks from "./components/Bookmarks/Bookmarks";
import Mainpage from "./components/Mainpage/Mainpage";
import FeedView from "./components/FeedView/FeedView";
import NotFound from "./components/NotFound/NotFound";


const RoutesComp = () => (
  
    <Routes>
      <Route exact path="/" element={<Mainpage />} />
      <Route exact path="/:feedid" element={<FeedView />} />
      <Route exact path="/bookmarks" element={<Bookmarks />} />
      <Route path="/bookmarks/*" element={<NotFound />} />
    </Routes>

    
);

export default RoutesComp;