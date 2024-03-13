import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import appRouter from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter}/>
)
