import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Home,
  Forum,
  Admin,
  Topics,
  Profile,
} from "./Components/Pages";
import { Protected } from "./Components/Protected";
import { Posts } from "./Components/Pages/Forum/Posts";

import { PublicProfile } from "./Components/Pages/PublicProfile";

export const App = () => {
  return (
    <div className="bg-gradient-to-bl from-bg_grad_1 to-bg_grad_2;">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/catagory/:id" element={<Topics />} />
          <Route path="/forum/post/:id" element={<Posts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<PublicProfile />} />
          <Route path="/admin" element={<Admin />} />
          
        </Route>
      </Routes>
    </div>
  );
};
