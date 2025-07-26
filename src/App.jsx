import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home'
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import Header from './components/Header'

const router=createBrowserRouter(
  [
    {
      path: '/',
      element: 
      <div>
        <Header/>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path: '/pastes',
      element: 
      <div>
        <Header/>
        <Navbar/>
        <Paste/>
      </div>
    },
    {
      path: '/pastes/:id',
      element: 
      <div>
        <Header/>
        <Navbar/>
        <ViewPaste/>
      </div>
    }
  ]
);

function App() {
  
  return (
    <div>
      <RouterProvider router={router}/>
    </div>    
  )
}

export default App