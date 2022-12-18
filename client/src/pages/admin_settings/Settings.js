import React from 'react'
import {Link} from 'react-router-dom'

const Settings = () => {
  return (
    <div>
        <h1>Settings</h1>
        <ul>
            <Link to={"/forgot_pass"}>Forgot Password</Link>
        </ul>
    </div>
  )
}

export default Settings