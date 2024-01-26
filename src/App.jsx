import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import E404 from './pages/E404'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { fetchUserDetails, setMethod, setStatus, setLoggedIn } from './features/userSlice'
import { userActions } from './features/userSlice'
import { setLogin } from './features/loginSlice'
import E505 from './pages/E505'
import AboutUs from './pages/AboutUs'
import FAQ from './pages/FAQ'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Film from './pages/Film'
import Profile from './pages/Profile'
import Films from './pages/Films'
import Register from './pages/Register'
import Search from './pages/Search'
import Follower from './pages/Followers'
import Following from './pages/following'
import AdminDashboard from './pages/AdminDashboard'
import TheaterAdminDashboard from './pages/TheaterAdminDashboard'
import AdminRegister from './pages/AdminRegister'
import TheaterAdminTiming from './pages/TheaterAdminTiming'

const App = () => {

  const dispatch = useAppDispatch()
  const User = useAppSelector((state) => state.user)
  const LoginState = useAppSelector((state) => state.login)

  useEffect(() => {
    dispatch(fetchUserDetails({}))
  }, [])

  useEffect(() => {
    if (User.loading === false && User.status === "succeeded" && User.method === "fetchingUserDetails") {
      dispatch(userActions.setLoggedIn(true))
      dispatch(setMethod("idle"))
      dispatch(setStatus("succeeded"))
    }
    else if (User.loading === false && User.status === "failed" && User.method === "fetchingUserDetails") {
      dispatch(setLogin(false))
      dispatch(setMethod("idle"))
      dispatch(setStatus("failed"))
    }
  }, [User])

  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/films' element={<Films />}></Route>
      <Route path='/film/:id' element={<Film />}></Route>
      <Route path='/user/login' element={<Login />}></Route>
      <Route path='/user/register' element={<Register />}></Route>
      <Route path='/user/settings' element={<Settings />}></Route>
      <Route path='/user/profile' element={<Profile currentUser={true} />}></Route>
      <Route path='/followers/:username' element={<Follower />}></Route>
      <Route path='/following/:username' element={<Following />}></Route>
      <Route path='/payment/failure' element={<E505 />}></Route>
      <Route path='/networkerror' element={<E505 />}></Route>
      <Route path='/about' element={<AboutUs />}></Route>
      <Route path='/faq' element={<FAQ />}></Route>
      <Route path='/search' element={<Search />}></Route>
      <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
      <Route path='/admin/register' element={<AdminRegister/>}></Route>
      <Route path='/theater_admin/dashboard' element={<TheaterAdminDashboard/>}></Route>
      <Route path='/theater_admin/timing' element={<TheaterAdminTiming/>}></Route>
      <Route path='*' element={<E404 />}></Route>
    </Routes >
  )
}

export default App
