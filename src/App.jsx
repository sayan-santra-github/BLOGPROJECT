
import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth'
import {login, logout} from './features/authSlice.js';
import {Header, Footer} from './components'
import { Outlet } from 'react-router';


function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authservice.getCurrentUser()
    .then((userData)=> {
      if (userData) {
        dispatch(login({userData}))
      }
      else{
        console.log("No User Found!")
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false)
    })
  }, [dispatch])
  


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
