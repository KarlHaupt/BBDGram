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

  const countLikes = (post: any)=> {
    return post.likes.length;
  };

  
  const countDislikes = (post:any) => {
    return post.dislikes.length;
  };

  const updateLikes = (postId: string, userId: string) => {
    // Use map to create a new array with updated likes for the selected post
    const updatedUserPosts = userPosts.map((post) => {
      if (post._id === postId) {
        return { ...post, likes: [...post.likes, userId] };
      }
      return post;
    });
    return updatedUserPosts;
  };
  

  const handleLike = async () => {
    try {
      // Check if the user has already liked this post (but use actual user id)
      if (selectedPost?.likes.includes('64f7818400e7dae66db86404')) {
        console.log('You have already liked this post.');
        return;
      }
  
      const url = `${config.API_Base_Url}/media/posts/like`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: selectedPost?._id, 
          userId: '64f7818400e7dae66db86404', // User's ID (hardcoded for now)
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to like the post');
      }
  
      const data = await response.json();
      // If liking the post was successful, update the state
      if (data.success === true) {
        if (selectedPost) {
          const updatedUserPosts = updateLikes(selectedPost._id, '64f7818400e7dae66db86404');
          setUserPosts(updatedUserPosts);
        }

        setSelectedPost((prevSelectedPost) => ({
          ...prevSelectedPost!,
          likes: [...prevSelectedPost!.likes, '64f7818400e7dae66db86404'],
        }));
      }
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };
  const handleDislike = () => {
    
  };

  useEffect(() => {
    const userId = '64f7818400e7dae66db86404'; // Replace with the actual user's ID
    const fetchData = async () => {
      try {
        const url = `https://ztd82gntsi.eu-west-1.awsapprunner.com/media/postsByUser?userId=${userId}`;
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
          <p>Likes: {countLikes(selectedPost)}</p><span><button className="like-button" onClick={handleLike}>Like</button></span>
          <p>Dislikes: {countDislikes(selectedPost)}</p>
          
        </div>
        <button className="modal-close" onClick={() => setSelectedPost(null)}>Close</button>
      </div>
    </div>
  )}
    </div>
  );
};

export default UserProfile;