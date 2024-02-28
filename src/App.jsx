import React, { useEffect, useState } from 'react'
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
import Following from './pages/Following'
import AdminDashboard from './pages/AdminDashboard'
import TheaterAdminDashboard from './pages/TheaterAdminDashboard'
import AdminRegister from './pages/AdminRegister'
import TheaterAdminTiming from './pages/TheaterAdminTiming'
import OthersProfile from './pages/OthersProfile'
import WatchedFilms from './pages/WatchedFilms'
import Watchlist from './pages/Watchlist'
import TheaterAdminLogin from './pages/TheaterAdminLogin'
import UesrList from './pages/UserList'
import AdminLogin from './pages/AdminLogin'
import OthersWatchedFilms from './pages/OthersWatchedFilms'
import OthersWatchlist from './pages/OthersWatchlist'
import MyListPage from './pages/MyListPage'
import OthersListPage from './pages/OthersListPage'
import OthersLists from './pages/OthersLists'
import Lists from './pages/Lists'
import Booking from './pages/Booking'
import Trending from './pages/Trending'
import OngoingMovies from './pages/OngoingMovies'
import TheaterTimeSelection from './pages/TheaterTimeSelection'
import BookingForm from './pages/BookingForm'
import BookingHistory from './pages/BookingHistory'
import ForgotPassword from './pages/ForgotPassword'
import TheatreRevenue  from './pages/TheatreRevenue'
import Success from './pages/Success'
import Failure from './pages/Failure'
import MovieRevenue from './pages/MovieRevenue'

const App = () => {

  const dispatch = useAppDispatch()
  const User = useAppSelector((state) => state.user)

  const [adminLogin, setAdminLogin] = useState(false)
  const [theatreAdminLogin, setTheatreAdminLogin] = useState(false)
  const [theatreAdminName, setTheatreAdminName] = useState("")

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
      <Route path='/user/forgotpassword' element={<ForgotPassword />}></Route>
      <Route path='/user/settings' element={<Settings />}></Route>
      <Route path='/user/list' element={<UesrList />}></Route>
      <Route path='/user/list/:listName' element={<MyListPage isTrending={false} />}></Route>
      <Route path='/user/profile' element={<Profile currentUser={true} />}></Route>
      <Route path='/user/watchedfilms' element={<WatchedFilms editable={true} />}></Route>
      <Route path='/watchedfilms/:username' element={<OthersWatchedFilms />}></Route>
      <Route path='/watchlist/:username' element={<OthersWatchlist />}></Route>
      <Route path='/user/watchlist' element={<Watchlist editable={true} />}></Route>
      <Route path='/profile/:username' element={<OthersProfile currentUser={false} />}></Route>
      <Route path='/followers/:user' element={<Follower />}></Route>
      <Route path='/following/:user' element={<Following />}></Route>
      <Route path='/booking' element={<Booking />}></Route>
      <Route path='/payment/failure' element={<E505 />}></Route>
      <Route path='/networkerror' element={<E505 />}></Route>
      <Route path='/about' element={<AboutUs />}></Route>
      <Route path='/faq' element={<FAQ />}></Route>
      <Route path='/search' element={<Search />}></Route>
      <Route path='/list/:username/:listName' element={<OthersListPage isTrending={false} />}></Route>
      <Route path='/lists/:username' element={<OthersLists />}></Route>
      <Route path='/lists' element={<Lists />}></Route>
      <Route path='/trending/day' element={<Trending duration={'day'} />}></Route>
      <Route path='/trending/week' element={<Trending duration={'week'} />}></Route>
      <Route path='/admin/dashboard' element={<AdminDashboard adminLogin={adminLogin} setAdminLogin={setAdminLogin} />}></Route>
      <Route path='/admin/addtadmin' element={<AdminRegister adminLogin={adminLogin} setAdminLogin={setAdminLogin} />}></Route>
      <Route path='/admin/login' element={<AdminLogin adminLogin={adminLogin} setAdminLogin={setAdminLogin} />}></Route>
      <Route path='/theater_admin/dashboard' element={<TheaterAdminDashboard setTheatreAdminName={setTheatreAdminName} theatreAdminName={theatreAdminName} theatreAdminLogin={theatreAdminLogin} setTheatreAdminLogin={setTheatreAdminLogin} />}></Route>
      <Route path='/theater_admin/timing' element={<TheaterAdminTiming theatreAdminName={theatreAdminName} theatreAdminLogin={theatreAdminLogin} setTheatreAdminLogin={setTheatreAdminLogin} />}></Route>
      <Route path='/theater_admin/login' element={<TheaterAdminLogin setTheatreAdminName={setTheatreAdminName} theatreAdminName={theatreAdminName} theatreAdminLogin={theatreAdminLogin} setTheatreAdminLogin={setTheatreAdminLogin} />}></Route>
      <Route path='/ongoing' element={<OngoingMovies />}></Route>
      <Route path='/theater_selection/:movieid' element={<TheaterTimeSelection />}></Route>
      <Route path='/bookingform' element={<BookingForm />}></Route>
      <Route path='/user/bookinghistory' element={<BookingHistory />}></Route>
      <Route path='/theater_admin/theater_revenue' element={<TheatreRevenue setTheatreAdminName={setTheatreAdminName} theatreAdminName={theatreAdminName} theatreAdminLogin={theatreAdminLogin} setTheatreAdminLogin={setTheatreAdminLogin} />}></Route>
      <Route path='/theater_admin/movie_revenue' element={<MovieRevenue setTheatreAdminName={setTheatreAdminName} theatreAdminName={theatreAdminName} theatreAdminLogin={theatreAdminLogin} setTheatreAdminLogin={setTheatreAdminLogin} />}></Route>
      <Route path='/payment/success' element={<Success />}></Route>
      <Route path='/payment/failure' element={<Failure />}></Route>
      <Route path='*' element={<E404 />}></Route>
    </Routes >
  )
}

export default App
