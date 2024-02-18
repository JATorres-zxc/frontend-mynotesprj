import React from 'react';
import './App.css';
import Header from './components/header.js';
import NoteListPage from './pages/NoteListPage';
import NotePage from './pages/NotePage';
import { useParams } from 'react-router-dom';

import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' exact element={<NoteListPage />} />
          <Route path='/note/:id' element={<NotePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
