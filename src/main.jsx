import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './Pages/Context/AuthProvider'
import { RouterProvider } from 'react-router-dom'
import { router } from './Pages/Routes/Routes'

ReactDOM.createRoot(document.getElementById('root')).render(

<React.StrictMode>
  <AuthProvider>
      <div className='max-w-screen-lg mx-auto'>
        <RouterProvider router={router} />
        <Toaster></Toaster>
      </div>
  </AuthProvider>
</React.StrictMode>

)
