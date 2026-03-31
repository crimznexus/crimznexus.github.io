import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import GitProfile from './components/gitprofile.tsx';
import MangaForgePage from './components/mangaforge-page/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<GitProfile config={CONFIG} />} />
        <Route path="/mangaforge" element={<MangaForgePage onBack={() => window.history.back()} />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
