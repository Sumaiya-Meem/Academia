import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './Pages/Context/AuthProvider'
import { RouterProvider } from 'react-router-dom'
import { router } from './Pages/Routes/Routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(

<React.StrictMode>
<QueryClientProvider client={queryClient}>
  <AuthProvider>
      <div className=''>
        <RouterProvider router={router} />
        <Toaster></Toaster>
      </div>
  </AuthProvider>
  </QueryClientProvider>
</React.StrictMode>

)
