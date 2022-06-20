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
import RequireAuth from '@utils/RequireAuth';
import RequireConnection from '@utils/RequireConnection';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SessionContextProvider } from '@providers/SessionContextProvider';
import '@styles/global.css'
import '@styles/variables.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <RecoilRoot>
      <Router>
        <SessionContextProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/option" element={<Option />} />
            <Route
              path="/create"
              element={
                <RequireAuth>
                  <Create />
                </RequireAuth>
              }
            />
            <Route
              path="/join"
              element={
                <RequireAuth>
                  <Join />
                </RequireAuth>
              }
            >
              <Route
                path=":id"
                element={
                  <RequireAuth>
                    <Join />
                  </RequireAuth>
                }
              />
            </Route>
            <Route
              path="play"
              element={
                // <RequireConnection>
                  <Play />
                // </RequireConnection>
              }
            />
          </Routes>
        </SessionContextProvider>
      </Router>
    </RecoilRoot>
  // </React.StrictMode>
);

