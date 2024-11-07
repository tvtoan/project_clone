import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import Layout from "./components/Layout/Layout";
import LoginPage from "./components/Auth/Login";
import RegisterPage from "./components/Auth/Register";
import HomePage from "./pages/HomePage";
import InboxPage from "./pages/InboxPage";
import StoryPage from "./pages/StoryPage";
import VideoPage from "./pages/VideoPage";

const AppRoutes = () => {
  return (
    
      <AuthProvider>
        <PostProvider>
         
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element= {<Layout />} >

                <Route path="/home" element={<HomePage />} />
                <Route path="/inbox" element={<InboxPage />} />
                <Route path="/story" element={<StoryPage />} />
                <Route path="/video" element={<VideoPage />} />
              </Route>

              {/* Route page not found (404) */}
              <Route path="*" component={() => <div>Page not found</div>} />
            </Routes>
          
        </PostProvider>
      </AuthProvider>
    
  );
};

export default AppRoutes;
