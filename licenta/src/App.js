import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home';
import LoginPage from './Components/LoginPage';
import SignUpPage from './Components/SignUpPage';
import TermsConditions from "./Components/TermsConditions"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/signup",
      element: <SignUpPage />
    },
    {
      path: "/terms&conditions",
      element: <TermsConditions />
    }
  ]
  )

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}


export default App;
