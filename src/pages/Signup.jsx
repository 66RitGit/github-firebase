import React from "react"

import firebase from "firebase/compat/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import UserContext from "../context/UserContext"
import {Navigate} from "react-router-dom"
import {toast} from "react-toastify"
import Header from "../layout/Header";
import Footer from "../layout/Footer"

const Signup = () => {

  const context = React.useContext(UserContext);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(getAuth(), email, password)
    .then(res => {
      console.log(res);
      context.setUser({
        email: res.user.email,
        uid: res.user.uid
      })
    })
    .catch(error => {
      console.log(error);
      toast(error.message), {
        type: "error"
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleSignUp();
  }

  if(context.user?.uid) {
    return <Navigate to="/" />
  }
  else
  {
    return (
      <>
        <Header />
        <div className="form-container">
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          id="email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          id="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="form-submit-button"
          onClick={handleSubmit}
        >Sign Up</button>
      </div>
      <Footer />
      </>
      
    )
  }
}

export default Signup
