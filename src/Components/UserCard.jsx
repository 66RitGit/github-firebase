import React from "react"

const UserCard = ({ user }) => {
  return (
    <div className="UserCard">
      <img src={user.avatar_url} />
      <p>{user.name}</p>
      <p>{user.bio}</p>
      <p>Available for hire: {user.hireable ? "YES" : "NO"}</p>
      <p>Followers: {user.followers}</p>
    </div>
  )
}

export default UserCard
