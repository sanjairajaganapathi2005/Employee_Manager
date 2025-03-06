import React from 'react'
import { navigate } from 'react-router-dom'
const handlelogout=()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('loginTime');
  navigate('/');
}

export const Logout = () => {
  return (
    <div>
      <button onClick={handlelogout}>logut</button>
    </div>
  )
}
export default Logout;
