import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import '../UserProfile/UserProfile.css';
import { Posts } from '../../models/posts';

const UserProfile = () => {
  const [description, setDescription] = useState("Bio description goes here. Something about me."); {/* fetched from endpoint */}
  const [userPosts, setUserPosts] = useState<Posts[]>([]);

  const handleEditDescription = () => {
    const newDescription = prompt('Enter new description:');
    if (newDescription !== null) {
      setDescription(newDescription);
    }
  };

  useEffect(() => {
    // simmulated with sample data (would retrieve from endpoint)
    const samplePosts = [
      {
        id: 1,
        imageUrl: 'post-image1.jpg',
        likes: 15,
        dislikes: 2,
        caption: 'A beautiful sunset.',
      },
      {
        id: 2,
        imageUrl: 'post-image2.jpg',
        likes: 20,
        dislikes: 3,
        caption: 'Exploring the mountains.',
      },
      {
        id: 3,
        imageUrl: 'post-image3.jpg',
        likes: 20,
        dislikes: 3,
        caption: 'Exploring the mountains.',
      },
     
    ] as Posts[]; 
    
    setUserPosts(samplePosts);
  }, []);

  return (
    <div>
      <Header />
      <div className="user-profile">
        <div className="profile-header">
          <img
            src={require('../../images/sample-profile.jpg')} //fetched from endpoint 
            alt="Profile"
            className="profile-picture"/>
            <div className="profile-details">
                <h2 className='username'>Stephen Potgieter</h2> {/* fetched from endpoint */}
                <p className='description'>{description}</p> {/* fetched from endpoint */}
                  <div className='settings'>
                        <button className='buttons' onClick={handleEditDescription}>Edit Description</button>
                        <button className='buttons'>New Post</button>
                  </div>
            </div>   
        </div>
      </div>

      <div className="user-posts">
        {userPosts.map((post) => (
            <div key={post.id} className="post">
                <img src={post.imageUrl} alt={`Post ${post.id}`} className="post-image" />
                <div className="post-details">
                <p className="post-caption">{post.caption}</p>
                <p>Likes: {post.likes}</p>
                <p>Dislikes: {post.dislikes}</p>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;