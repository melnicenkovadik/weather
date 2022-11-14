import { StrictMode } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './modules/common/app/App';
import ErrorBoundary from './modules/common/ErrorBoundary';
import './styles.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/:city" element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
