import React, { useContext } from 'react'
import {UserContext} from "./AddToCard"

const Random = () => {
    const user = useContext(UserContext)
  return (
    <div>
      <h1>Child Component</h1>
      <p>Username: {user}</p>
    </div>
  )
}

export default Random
