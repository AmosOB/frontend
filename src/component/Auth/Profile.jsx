import React from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const { name } = useParams();
  return (
    <div>Profile</div>
  )
}

export default Profile
