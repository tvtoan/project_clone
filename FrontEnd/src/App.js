
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import Layout from './components/Layout/Layout';
import LoginPage from './components/Auth/Login';
import RegisterPage from './components/Auth/Register';
import HomePage from './pages/HomePage';
import InboxPage from './pages/InboxPage';
import StoryPage from './pages/StoryPage';
import VideoPage from './pages/VideoPage';

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <Layout>
            <Switch>
              <Route path="/" exact component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/home" component={HomePage} />
              <Route path="/inbox" component={InboxPage} />
              <Route path="/story" component={StoryPage} />
              <Route path="/video" component={VideoPage} />
            </Switch>
          </Layout>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
};

export default App;
