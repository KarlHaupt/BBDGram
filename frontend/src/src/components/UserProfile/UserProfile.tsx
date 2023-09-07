import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import '../UserProfile/UserProfile.css';
import { ApiResponse } from '../../providers/userProvider';
import config from '../../config.json';
import { Buffer } from 'buffer';
import { Post } from '../../models/posts';

const UserProfile = () => {
  const [description, setDescription] = useState("Bio description goes here. Something about me.");
  const [user, setUser] = useState("username");
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState("caption");

  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // State to track selected post for modal

  const handleEditDescription = () => {
    const newDescription = prompt('Enter new description:');
    if (newDescription !== null) {
      setDescription(newDescription);
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    const userId = '64f7818400e7dae66db86404'; // Replace with the actual user's ID
    const fetchData = async () => {
      try {
        const url = `${config.API_Base_Url}/media/postsByUser?userId=${userId}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);

        if (data.success === true) {
          const mediaPosts = data.mediaPosts;
          setUserPosts(mediaPosts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="user-profile">
        <div className="profile-header">
          <img
            src={image}
            alt="Profile"
            className="profile-picture" />
          <div className="profile-details">
            <h2 className='username'>{user}</h2> {/* fetched from endpoint */}
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
          <div key={post._id} className="post">
            <img
              src={`data:image/png;base64,${Buffer.from(post.image.data.data).toString('base64')}`}
              alt={`Post ${post._id}`}
              className="post-image"
              onClick={() => handlePostClick(post)} // Open modal on image click
            />
          </div>
        ))}
      </div>
      {selectedPost && (
    <div className="modal">
      <div className="modal-content">
        <img src={`data:image/png;base64,${Buffer.from(selectedPost.image.data.data).toString('base64')}`} alt={`Post ${selectedPost._id}`} className="modal-image" />
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