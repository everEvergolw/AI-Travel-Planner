import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]/index.jsx'


const router = createBrowserRouter([

  {

    path:'/',
    element:<App/>


  },

  {
    path:'/create-trip',
    element: <CreateTrip/>

  },
  
  {
    path:'/view-trip/:tripId',
    element: <Viewtrip/>

  },


])




ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>



    <Header/> 
    <Toaster />
     <RouterProvider router={router}/>

     </GoogleOAuthProvider>

  </React.StrictMode>,
)
