import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage/MainPage'
import AuthPage from './pages/AuthPage/AuthPage'
import RequireAuth from './components/RequireAuth/RequireAuth';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';

import './styles/styles.scss'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='auth' element={<AuthPage />}/>
                        <Route path='registration' element={<RegistrationPage />}/>
                        <Route index element={
                            <RequireAuth>
                                <MainPage />
                            </RequireAuth>
                        }/>
                        <Route path="*" element={<Navigate to="/" />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;