import {StrictMode} from 'react';
import {createRoot} from "react-dom/client";
import App from "./modules/common/app/App";
import "./styles.css";
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import ErrorBoundary from "./modules/common/ErrorBoundary";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App/>}>
                        <Route path='/:city' element={<App/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    </StrictMode>,
);
