import React from "react"

//Router
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"

//Toast
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

//Firebase
import firebase from "firebase/compat/app"
import "firebase/auth"

//Components
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import PageNotFound from "./pages/PageNotFound"
import UserContext from "./context/UserContext"

//CSS
import './App.css'

import firebaseConfig from "./Config/firebaseConfig"
//init firebase
firebase.initializeApp(firebaseConfig);

const  App = () => {
  const [user, setUser] = React.useState(null)
    return (
      <Router>
        <ToastContainer />
        <UserContext.Provider value={{user, setUser}}>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/signup" element={<Signup />}/>
            <Route exact path="/signin" element={<Signin />}/>
            <Route exact path="*" element={<PageNotFound />}/>
          </Routes>
        </UserContext.Provider>
      </Router>
    )
}

export default App
