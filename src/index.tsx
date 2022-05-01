import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Home,
  User,
  Option,
  Create,
  Join,
  Play,
} from '@pages';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameSessionContextProvider } from '@hooks/GameContextProvider';
import '@styles/global.css'
import '@styles/variables.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <GameSessionContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="user" element={<User />} />
            <Route path="option" element={<Option />} />
            <Route path="create" element={<Create />} />
            <Route path="join/:id" element={<Join />} />
            <Route path="play" element={<Play />} />
          </Routes>
        </GameSessionContextProvider>
      </Router>
    </RecoilRoot>
  </React.StrictMode>
);

