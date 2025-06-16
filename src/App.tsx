import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import {AuthProvider} from './contexts/AuthUser'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes/>  
      </BrowserRouter>
    </AuthProvider>
    
  )
}

export default App
