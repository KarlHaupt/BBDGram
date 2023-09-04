import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import '../UserProfile/UserProfile.css';
import { Posts, Post } from '../../models/posts';
import { ApiResponse } from '../../providers/userProvider';
import config from '../../config.json'
import { Buffer } from 'buffer';


const UserProfile = () => {
  const [description, setDescription] = useState("Bio description goes here. Something about me.");
  const [user, setUser] = useState("username");
  const [userPosts, setUserPosts] = useState<Posts[]>([])
  const [nuserPosts, nsetUserPosts] = useState<Post[]>([])
  const [image, setImage] = useState('')
  const [caption, setCaption] = useState("caption");

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
  useEffect(()=>{
    getData();
  },[])
  const getData=async ()=>{
    const url = `${config.API_Base_Url}/media/posts`;
    const mediaPosts = new ApiResponse();
    const imagesArray: Posts[] = [];

    mediaPosts.getData(url).then((response: any)=>{
      
      if(response.success === true){
        const data = response.mediaPosts;
        nsetUserPosts(data)
        console.log(data)
        
        for (const dt of data){
          setDescription(dt.description);
          setUser(dt.user)
        }
      
      }
      
    })
    
  }

  useEffect(()=>{
    const url = `${config.API_Base_Url}/media/posts`;
    const mediaPosts = new ApiResponse();

    mediaPosts.postData(url,{

    })
  })


  return (
    <div>
    <Header />
    <div className="user-profile">
      <div className="profile-header">
        <img
          src={image}
          alt="Profile"
          className="profile-picture"/>
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
        {nuserPosts.map((post) => (
          <div key={post._id} className="post">
            <img
              src={`data:image/png;base64,${Buffer.from(post.image.data.data).toString('base64')}`}
              alt={`Post ${post._id}`}
              className="post-image"
              // onClick={() => handlePostClick(post)} // Open modal on image click
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