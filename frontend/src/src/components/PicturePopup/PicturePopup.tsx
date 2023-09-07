import React from "react";
import { Post } from "../../models/posts";
import { Buffer } from 'buffer';

const PicturePopup = (props: {
  selectedPost: Post | null
  setSelectedPost: (newPost: Post | null) => void;
  handleLike: () => void;
  handleDislike: () => void;
}) => {
  const { selectedPost, setSelectedPost } = { ...props }

  const countLikes = (post: any)=> {
    return post.likes.length;
  };

  
  const countDislikes = (post:any) => {
    return post.dislikes.length;
  };

  return (
    <>
      {selectedPost && (
        <div className="modal">
          <div className="modal-content">
            <img src={`data:image/png;base64,${Buffer.from(selectedPost.image.data.data).toString('base64')}`} alt={`Post ${selectedPost._id}`} className="modal-image" />
            <div className="modal-details">
                <p>{selectedPost.description}</p>
                <p>Likes: {countLikes(selectedPost)}</p><span><button className="like-button" onClick={props.handleLike}>Like</button></span>
                <p>Dislikes: {countDislikes(selectedPost)}</p><span><button className="dislike-button" onClick={props.handleDislike}>Dislike</button></span>
            </div>
            <button className="modal-close" onClick={() => setSelectedPost(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

export default PicturePopup;