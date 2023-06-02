import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { ProductsContextProvider } from './context/ProductsContext';
import { FiltersContextProvider } from './context/FiltersContext';
import { OrdersContextProvider } from './context/OrdersContext';
import { BasketContextProvider } from './context/BasketContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BasketContextProvider>
      <OrdersContextProvider>
        <FiltersContextProvider>
          <ProductsContextProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </ProductsContextProvider>
        </FiltersContextProvider>
      </OrdersContextProvider>
    </BasketContextProvider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

