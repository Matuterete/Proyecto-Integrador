import React, { useState } from 'react'
import '../Components/Styles/UserProfile.css'
const UserProfile = () => {

    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('userData')))
    console.log(userData)

    return (
        <div className='body bodyUserProfile'>
            {userData?( <div className="user-card">
                <img src='\src\assets\usuario.svg' alt="User Avatar" className="avatar" />
                <div className="user-info">
                    <h2>{userData.user.name +' '+ userData.user.lastName}</h2>
                    <p>Email: {userData.user.email}</p>
                    <p>Role: {userData.user.role}</p>
                </div>
            </div>):('')}
           
        </div>

    )
}

export default UserProfile