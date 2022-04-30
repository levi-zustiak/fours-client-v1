import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from '@pages/Index';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/user" element={<User />} />
          <Route path="option" element={<Options />} /> */}
        </Routes>
      </Router>
    </RecoilRoot>
  </React.StrictMode>
);

