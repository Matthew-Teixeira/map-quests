import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h1>My Amazona</h1>
        <Link to={"/upload_images"}>Upload</Link>
    </div>
  )
}

export default Home