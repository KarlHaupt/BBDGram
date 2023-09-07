import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import '../UserProfile/UserProfile.css';
import { Posts, Post } from '../../models/posts';
import { ApiResponse } from '../../providers/userProvider';
import config from '../../config.json'
import { Buffer } from 'buffer';
import Popup from 'reactjs-popup'


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

  const handleNewPostBtnClick = (post: Posts) => {

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