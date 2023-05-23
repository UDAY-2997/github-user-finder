import './style/index.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Search } from './components/Search';
import { User } from './components/User';

const App = () => {
  return (
    <Routes>
      <Route path="/github-user-finder" element={<Search />} />
      <Route path="/user/:username" element={<User />} />
    </Routes>
  );
};

export default App;
