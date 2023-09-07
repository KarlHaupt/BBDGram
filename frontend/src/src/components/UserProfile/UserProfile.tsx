import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import '../UserProfile/UserProfile.css';
import { ApiResponse } from '../../providers/userProvider';
import { Buffer } from 'buffer';

import Popup from 'reactjs-popup';

const UserProfile = () => {
  const [description, setDescription] = useState("Bio description goes here. Something about me.");
  const [user, setUser] = useState("username");

  const [userPosts, setUserPosts] = useState<Posts[]>([])
  const [selectedPost, setSelectedPost] = useState<Posts | null>(null);
  const [selectedImage, setSelectedImage] = useState<File>()
  const [newDescription, setNewDescription] = useState('')


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

  const handlePostClick = (post: Posts) => {
    setSelectedPost(post);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file)

      setSelectedImage(file);
    }
  }

  useEffect(() => {
    getData();

  }, [])

  const getData = async () => {
    const url = `${config.API_Base_Url}/media/posts`;
    const mediaPosts = new ApiResponse();

    mediaPosts.getData(url).then((response: any) => {

      if (response.success === true) {
        const data = response.mediaPosts;
        setUserPosts(data)
        console.log(data)

        for (const dt of data) {
          setDescription(dt.description);
          setUser(dt.user)
          localStorage.setItem('user', dt.user);
          localStorage.setItem('tag', dt.tag);
        }
      }
    })
  }

  const newPost = () => {
    const url = `${config.API_Base_Url}/media/posts`;
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

=======
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
  
      const url = `${process.env.API_Base_Url}/media/posts/like`;
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
  
      const url = `${process.env.API_Base_Url}/media/posts/dislike`;
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
        const url = process.env.API_Base_Url+`/media/postsByUser?userId=${userId}`;
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

            src={'../../images/sample-profile.jpg'}

  

            alt="Profile"
            className="profile-picture" />
          <div className="profile-details">
            <h2 className='username'>{user}</h2> {/* fetched from endpoint */}
            <p className='description'>{description}</p> {/* fetched from endpoint */}
            <div className='settings'>
              <button className='buttons' onClick={handleEditDescription}>Edit Description</button>

              <Popup trigger=
                {<button className='buttons'>New Post</button>}
                position="right center">
                <input type='text' placeholder='description' value={newDescription} onChange={handleNewDescription} />
                <input type="file" accept='image/*' onChange={handleImageChange} />
                <button onClick={() => { newPost() }}>New Post</button>
              </Popup>
      
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

              onClick={() => handlePostClick(post)}
            />
          </div>
        ))}
      </div>
      {selectedPost && (
       
    <div className="modal">
      <div className="modal-content">
        <img src={`data:image/png;base64,${Buffer.from(selectedPost.image.data.data).toString('base64')}`} alt={`Post ${selectedPost._id}`} className="modal-image" />
        <div className="modal-details">
          <p>{selectedPost.description}</p>
          <p>Likes: {countLikes(selectedPost)}</p><span><button className="like-button" onClick={handleLike}>Like</button></span>
          <p>Dislikes: {countDislikes(selectedPost)}</p><span><button className="dislike-button" onClick={handleDislike}>Dislike</button></span>
          
        </div>
        <button className="modal-close" onClick={() => setSelectedPost(null)}>Close</button>
      </div>
    </div>
  )}
    </div>
  );
};

export default UserProfile;