import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import '../UserProfile/UserProfile.css';
import { ApiResponse } from '../../providers/userProvider';
import { Buffer } from 'buffer';
import Popup from 'reactjs-popup'
import { Post } from '../../models/posts';
import PicturePopup from '../PicturePopup/PicturePopup';

const UserProfile = () => {
  const [description, setDescription] = useState("Bio description goes here. Something about me.");
  const [user, setUser] = useState("username");
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState("caption");
  const [selectedImage, setSelectedImage] = useState<File>()
  const [newDescription, setNewDescription] = useState('')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // State to track selected post for modal

  const handleEditDescription = () => {
    const newDescription = prompt('Enter new description:');
    if (newDescription !== null) {
      setDescription(newDescription);
    }
  };

  const handleNewDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    if (newDescription) {
      setNewDescription(newDescription);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file)

      setSelectedImage(file);
    }
  }

  useEffect(() => {
    const userId = '64f7818400e7dae66db86404'; // Replace with the actual user's ID
    const fetchData = async () => {
      try {
        const url = `http://localhost:8000/media/postsByUser?userId=${userId}`;
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

  const newPost = () => {
    const url = `http://localhost:8000/media/posts`;
    const mediaPosts = new ApiResponse();

    const email = localStorage.getItem('user');
    const tag = localStorage.getItem('tag');

    const formData = new FormData();
    formData.append('image', selectedImage as Blob);
    formData.append('user', email!);
    formData.append('tag', tag!);
    formData.append('description', newDescription);

    const res = mediaPosts.postData(url, formData)
    console.log(res)

  }

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
  
      const url = `http://localhost:8000/media/posts/like`;
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
  
      const url = `http://localhost:8000/media/posts/dislike`;
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


 

  return (
    <>
      <Header />
      <section className="user-profile">
        <article className="profile-header">
          <img
            src={image}
            alt="Profile"
            className="profile-picture" />
          <section className="profile-details">
            <h2 className='username'>{user}</h2> {/* fetched from endpoint */}
            <p className='description'>{description}</p> {/* fetched from endpoint */}
            <div className='settings'>
              <button className='buttons' onClick={handleEditDescription}>Edit Description</button>
              <button className='buttons'>New Post</button>
            </div>
          </section>
        </article>
      </section>
      


      <section className="gallery-container">
  <section className="gallery">
    {userPosts.map((post) => (
      <article className="image-frame" key={post._id}>
        <img
          src={`data:image/png;base64,${Buffer.from(post.image.data.data).toString('base64')}`}
          alt={`Post ${post._id}`}
          className="image"
          onClick={() => handlePostClick(post)}
        />
        <h5>{post.description}</h5>
      </article>
    ))}
  </section>
  <PicturePopup
    selectedPost={selectedPost}
    setSelectedPost={setSelectedPost}
    handleLike={handleLike}
    handleDislike={handleDislike}
  />
</section>
      </>
  );
};

export default UserProfile;