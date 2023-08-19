import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import '../UserProfile/UserProfile.css';
import { Posts } from '../../models/posts';


const UserProfile = () => {
  const [description, setDescription] = useState("Bio description goes here. Something about me.");
  const [userPosts, setUserPosts] = useState<Posts[]>([]);
  const [selectedPost, setSelectedPost] = useState<Posts | null>(null); // State to track selected post for modal

  const handleEditDescription = () => {
    const newDescription = prompt('Enter new description:');
    if (newDescription !== null) {
      setDescription(newDescription);
    }
  };

  const handlePostClick = (post: Posts) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    // Simulated with sample data (would retrieve from an endpoint)
    const samplePosts: Posts[] = [
      {
        id: 1,
        imageUrl: 'post-image1.jpeg',
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
      }
    ];
    
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
              <h2 className='username'>John Doe</h2> {/* fetched from endpoint */}
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
            <img
              src={post.imageUrl}
              alt={`Post ${post.id}`}
              className="post-image"
              onClick={() => handlePostClick(post)} // Open modal on image click
            />
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className="modal">
          <div className="modal-content">
            <img src={selectedPost.imageUrl} alt={`Post ${selectedPost.id}`} className="modal-image" />
            <div className="modal-details">
              <p>Likes: {selectedPost.likes}</p>
              <p>Dislikes: {selectedPost.dislikes}</p>
              <p>{selectedPost.caption}</p>
            </div>
            <button className="modal-close" onClick={() => setSelectedPost(null)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserProfile;