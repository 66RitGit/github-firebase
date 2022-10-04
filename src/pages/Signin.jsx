import React from "react"

import firebase from "firebase/compat/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import UserContext from "../context/UserContext"
import {Navigate} from "react-router-dom"
import {toast} from "react-toastify"
import Header from "../layout/Header";
import Footer from "../layout/Footer"

const Signin = () => {
  const context = React.useContext(UserContext);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignIn = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
    .then((res) => {
      console.log(res);
      context.setUser({
        uid: res.user.uid,
        email: res.user.email
      })
    })
    .catch((error) => {
    const errorMessage = error.message;
    toast(errorMessage, {
      type: "error"
      })
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    handleSignIn();
  }

  if(context.user?.uid)
  {
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
        >Sign In</button>
      </div>
      <Footer />
      </>
    )
  }
}

export default Signin
