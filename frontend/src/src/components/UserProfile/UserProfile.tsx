import React, { useState } from 'react';
import Header from '../Header/Header';
import '../UserProfile/UserProfile.css';

const UserProfile = () => {
  const [description, setDescription] = useState("Bio description goes here. Something about me.");

  const handleEditDescription = () => {
    const newDescription = prompt('Enter new description:');
    if (newDescription !== null) {
      setDescription(newDescription);
    }
  };

  return (
    <div>
      <Header />
      <div className="user-profile">
        <div className="profile-header">
          <img
            src={require('../../images/sample-profile.jpg')}
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-details">
            <h2 className='username'>Stephen Potgieter</h2>
            <p className='description'>{description}</p>
            <div className='settings'>
              <button className='buttons' onClick={handleEditDescription}>Edit Description</button>
              <button className='buttons'>New Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;