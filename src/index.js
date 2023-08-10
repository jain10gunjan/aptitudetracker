import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import QuestionsPage from './quantitativeAptitude/QuestionsPage';
import LegacyPage from './quantitativeAptitude/LegacyPage';

ReactDOM.render(
  
  <BrowserRouter>
      <Routes>
  <Route path="/" element={<App />} />
<Route path="/questions/:qid" element={<QuestionsPage />}/>
<Route path="/:topic/questions/:qid" element={<LegacyPage />}/>

</Routes>
    </BrowserRouter>,
  document.getElementById('root')
);