import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import FavoritesProvider from './context/FavoritesContext'
import CartProvider from './context/CartContext'

import { HashRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <HashRouter>

      <FavoritesProvider>

        <CartProvider>

          <App />

        </CartProvider>

      </FavoritesProvider>

    </HashRouter>

  </React.StrictMode>

)