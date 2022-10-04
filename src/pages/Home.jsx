import React from "react"
import axios from "axios"

import UserContext from "../context/UserContext"
import Header from "../layout/Header"

import {toast} from "react-toastify"
import UserCard from "../Components/UserCard"
import Repos from "../Components/Repos"

import {Navigate} from "react-router-dom"

const Home = () => {

  const context = React.useContext(UserContext);
  const [query, setQuery] = React.useState("")
  const [user, setUser] = React.useState(null)

  const fetchDetails = async() => {
    try {
      const {data} = await axios.get(`https://api.github.com/users/${query}`)
      setUser(data);
      console.log({data})
    } catch (error) {
      setUser(null);
      toast("Not able to locate user", {
        type: "error"
      })
    }
  }

  if(!context.user?.uid) 
  {
    return <Navigate to="/signin" />
  }
  else 
  {
    return (
      <div className="Home">
        <Header/>
        <div className="form-User">
          <input 
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Please provide the username"
          />
          <button className="form-submit-button"
          onClick={fetchDetails}>
            Fetch User
          </button>
        </div>
        {
            user ? <div className="gitUserDetails">
                    <UserCard user={user} />
                    <Repos repos_url={user.repos_url} />
                    </div> : null
        }
      </div>
    )
  }
}

export default Home
