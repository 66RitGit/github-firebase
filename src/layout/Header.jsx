import React from 'react'
import {Link} from "react-router-dom"

import UserContext from "../context/UserContext"

const Header = () => {
    const context = React.useContext(UserContext)

  return (
    <div className="Header">
        <p>Gitfire app</p>
        <p>{context.user?.email ? context.user.email : ""}</p>
            <div className="login-group">
                {
                    context.user ? (
                        <li><Link 
                            onClick={() => 
                                (context.setUser(null))}>
                                Logout</Link></li>  
                    ) : (
                        <>
                        <li><Link to="/signin">SignIn</Link></li>
                        <li><Link to="/signup">SignUp</Link></li>
                        </>
                    )
                }
            </div>
    </div>
  )
}

export default Header