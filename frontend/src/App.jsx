import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./assets/pages/Home"
import SignIn from "./assets/pages/SignIn"
import Profile from "./assets/pages/Profile"
import About from "./assets/pages/About"
import SignUp from "./assets/pages/SignUp"
import Header from "./assets/components/Header"
import PrivateRoute from "./assets/components/PrivateRoute"
import CreateListing from "./assets/pages/CreateListing"
import UpdateListing from "./assets/pages/UpdateListing"
import Listing from "./assets/pages/Listing"
import Search from "./assets/pages/search"

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>

    <Route path="/" element={<Home/>} />
    <Route path="/sign-up" element={<SignUp/>} />
    <Route path="/sign-in" element={<SignIn/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/listing/:id" element={<Listing/>} />
    <Route path="/search" element={<Search/>} />
    <Route element={<PrivateRoute/>}>
    <Route path="/profile" element={<Profile/>} />
    <Route path="/create-listing" element={<CreateListing/>} />
    <Route path="/update-listing/:id" element={<UpdateListing/>} />
    </Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App