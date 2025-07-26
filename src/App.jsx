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
      <div style={{display: 'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center'}}>
        <Header/>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path: '/pastes',
      element: 
      <div style={{display: 'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center'}}>
        <Header/>
        <Navbar/>
        <Paste/>
      </div>
    },
    {
      path: '/pastes/:id',
      element: 
      <div style={{display: 'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center'}}>
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
