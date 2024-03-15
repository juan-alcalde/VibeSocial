//Aurthor: Juan Jose Alcalde
//November 1, 2023
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { calculateTimeDifference } from "./TimeStampFeature";
import icon6 from "../img/comment.png";
import iconHeat from "../img/heart.png";
import icon7 from '../img/trash.png';
import icon8 from '../img/file-edit.png';
import exit from "../img/rectangle-xmark.png";
import "../home/PostDetails.css";

export const PostDetails = () => {
  const { postId } = useParams();
  const [post, updatePost] = useState();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const PostDeleteButton = ({ postId, onDelete }) => {
    const handleDelete = () => {
      fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE"
      })
        .then(response => response.json())
        .then(() => {
          onDelete(postId);
          navigate("/");
        });
    };

    return (
      <button onClick={handleDelete} className="deleteDetail-btn">
        <input type="image" src={icon7} alt="Submit" style={{ width: '20px', margin: '2%' }} />
      </button>
    );
  };

  const handlePostDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post?.id !== postId);
    setPosts(updatedPosts);
  };

  useEffect(() => {
    fetch(`http://localhost:8088/posts`)
      .then(response => response.json())
      .then((postsArray) => {
        setPosts(postsArray);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/posts?_expand=user&_embed=userPosts&id=${postId}`)
      .then(response => response.json())
      .then((data) => {
        const singlePost = data[0];
        updatePost(singlePost);
      });
  }, [postId]);

  useEffect(() => {
    fetch(`http://localhost:8088/users`)
      .then(response => response.json())
      .then((usersArray) => {
        setUsers(usersArray);
      });
  }, []);

  const getUsernameById = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.username : 'unknown';
  };

  return (
    <div className="postDetailBackground">
      <article className="postsDetails">
        <div className="postDetails--Container" key={post?.id}>
          <div className="postDetails--Card">
            <header className="usertime--Container">
              <div className="postDetailExitBtn--Container">
                <div className="exitbtn--Card">
                  <button className="postDetailExitBtn" onClick={() => { navigate("/") }}>
                    <input type="image" src={exit} alt="Submit" style={{ width: '20px', height: '20px', margin: '2%' }} />
                  </button>
                </div>
              </div>
              <label className="postDetails-Username">
                <strong>{getUsernameById(post?.userId)} </strong>
              </label>
              <label className="postDetails-TimeStamp"> {calculateTimeDifference(post?.timeStamp)}</label>
            </header>
            <h3 className="postDetailsPreview-Title">{post?.title}</h3>
            <hr></hr>
            {post?.image && (
              <div className="postMedia">
                <img src={post?.image} alt="blank"style={{ width: '700px', height: 'auto' }} />
              </div>
            )}
            {post?.url && (
              <div className="postMedia">
                <iframe src={post.url} title="post media" style={{ width: '1000px', height: '300px' }} />
              </div>
            )}
            <div className="postDetailsMedia">
              <p className="postDetailsDescription">{post?.description}</p>
            </div>
            <div className="like-dislike-commentDetails--Container">
              <div className="like-dislike-comentDetails--Card">
                <button className="like-button-Details">
                  <input type="image" src={iconHeat} alt="Submit" style={{ width: '18px', height: '18px', margin: '2%' }} />
                  <span>{post?.likes}</span>
                </button>
                <div className="postDetailComment-Container">
                  <button style={{ width: '200px', height: '50px', margin: '4%' }} className="comment-button-Details">
                    <input type="image" src={icon6} alt="Submit" style={{ width: '20px', height: '20px', margin: '2%' }} />
                  </button>
                </div>
                <div>
                  <button className="editDetail-btn" onClick={() => navigate(`/${post?.id}/edit`)}>
                    <input type="image" src={icon8} alt="Submit" style={{ width: '20px', height: '20px', margin: '2%' }} />
                  </button>
                  <PostDeleteButton postId={post?.id} onDelete={handlePostDelete} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <footer>
        
      </footer>
    </div>
  );
};
