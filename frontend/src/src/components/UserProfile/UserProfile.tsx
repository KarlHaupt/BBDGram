import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import '../UserProfile/UserProfile.css';
import { ApiResponse } from '../../providers/userProvider';
import config from '../../config.json';
import { Buffer } from 'buffer';
import { Post } from '../../models/posts';
import PicturePopup from '../PicturePopup/PicturePopup';

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

  const updateDislikes = (postId: string, userId: string) => {
    const updatedUserPosts = userPosts.map((post) => {
      if (post._id === postId) {
        return { ...post, dislikes: [...post.dislikes, userId] };
      }
      return post;
    });
    return updatedUserPosts;
  };
  

  const handleLike = async () => {
    try {
      const isLiked = selectedPost?.likes.includes('64f7818400e7dae66db86404');
      const isDisliked = selectedPost?.dislikes.includes('64f7818400e7dae66db86404');
  
      const url = `${config.API_Base_Url}/media/posts/like`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: selectedPost?._id,
          userId: '64f7818400e7dae66db86404',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to like the post');
      }
  
      const data = await response.json();
  
      if (data.success === true) {
        if (selectedPost) {
          let updatedLikes = [...selectedPost.likes];
          let updatedDislikes = [...selectedPost.dislikes];
  
          if (isLiked) {
            // Remove like
            updatedLikes = updatedLikes.filter(userId => userId !== '64f7818400e7dae66db86404');
          } else if (isDisliked) {
            // Remove dislike and add like
            updatedDislikes = updatedDislikes.filter(userId => userId !== '64f7818400e7dae66db86404');
            updatedLikes.push('64f7818400e7dae66db86404');
          } else {
            // Add like
            updatedLikes.push('64f7818400e7dae66db86404');
          }
  
          setSelectedPost((prevSelectedPost) => ({
            ...prevSelectedPost!,
            likes: updatedLikes,
            dislikes: updatedDislikes,
          }));
        }
      }
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };
  
  const handleDislike = async () => {
    try {
      const isLiked = selectedPost?.likes.includes('64f7818400e7dae66db86404');
      const isDisliked = selectedPost?.dislikes.includes('64f7818400e7dae66db86404');
  
      const url = `${config.API_Base_Url}/media/posts/dislike`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: selectedPost?._id,
          userId: '64f7818400e7dae66db86404',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to dislike the post');
      }
  
      const data = await response.json();
  
      if (data.success === true) {
        if (selectedPost) {
          let updatedLikes = [...selectedPost.likes];
          let updatedDislikes = [...selectedPost.dislikes];
  
          if (isDisliked) {
            // Remove dislike
            updatedDislikes = updatedDislikes.filter(userId => userId !== '64f7818400e7dae66db86404');
          } else if (isLiked) {
            // Remove like and add dislike
            updatedLikes = updatedLikes.filter(userId => userId !== '64f7818400e7dae66db86404');
            updatedDislikes.push('64f7818400e7dae66db86404');
          } else {
            // Add dislike
            updatedDislikes.push('64f7818400e7dae66db86404');
          }
  
          setSelectedPost((prevSelectedPost) => ({
            ...prevSelectedPost!,
            likes: updatedLikes,
            dislikes: updatedDislikes,
          }));
        }
      }
    } catch (error) {
      console.error('Error disliking the post:', error);
    }
  };


  useEffect(() => {
    const userId = '64f7818400e7dae66db86404'; // Replace with the actual user's ID
    const fetchData = async () => {
      try {
        const url = config.API_Base_Url+`/media/postsByUser?userId=${userId}`;
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
      <PicturePopup 
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        handleLike={handleLike}
        handleDislike={handleDislike}
      />
    </div>
  );
};

export default UserProfile;