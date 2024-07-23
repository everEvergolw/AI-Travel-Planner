import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/ui/custom/Header.jsx'


const router = createBrowserRouter([

  {

    path:'/',
    element:<App/>


  },

  {
    path:'/create-trip',
    element: <CreateTrip/>

  }


])




ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Header/>
     <RouterProvider router={router}/>
  </React.StrictMode>,
)
