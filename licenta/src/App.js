import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home';
import LoginPage from './Components/LoginPage';
import SignUpPage from './Components/SignUpPage';
import TermsConditions from "./Components/TermsConditions"
import Product from "./Components/Product"
import { useParams } from 'react-router-dom';
import AdminBoard from './Components/AdminBoard';
import Orders from './Components/Orders'
import Basket from './Components/Basket'
import Checkout from './Components/Checkout'
import PaymentCompletion from './Components/PaymentCompletion';

function App() {

  function ProductPage() {
    const { id } = useParams();
    return <Product _id={id} />
  }

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
    },
    // new path for individual product page
    // the element should have the product id as a prop, and the value should be the id from the path
    {
      path: "/product/:id",
      element: <ProductPage />
    },
    {
      path: "/admin",
      element: <AdminBoard />
    },
    {
      path: "/orders",
      element: <Orders />
    },
    {
      path: "/basket",
      element: <Basket />
    },
    {
      path: "/checkout",
      element: <Checkout />
    },
    {
      path: "/paymentCompleted",
      element: <PaymentCompletion />
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
