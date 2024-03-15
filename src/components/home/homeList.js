//Aurthor: Juan Jose Alcalde
//November 1, 2023
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreatePostButton } from "./PostButton";
import { PostDeleteButton } from "./DeletePostButton";
import icon6 from '../img/comment.png';
import icon8 from '../img/file-edit.png';
import iconHeat from "../img/heart.png";
import "../home/homecss.css";
import { calculateTimeDifference } from "./TimeStampFeature";

export const HomePostList = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeClick, setActiveClick] = useState();
  const navigate = useNavigate();
// Function to handle post deletion; & postId is the unique identifier of the post that needs to be deleted
  const handlePostDelete = (postId) => {//creating a new array that excludes the post with the specified postId and updating the component's state with this new array.
   // Use the filter method to create a new array excluding the post with the specified postId
    const updatedPosts = posts.filter((post) => post.id !== postId);// includes only the posts for which the condition (post.id !== postId) is true.
    //This condition ensures that the post with the specified postId is excluded from the new array.
    // Set the state variable posts to the newly filtered array, effectively removing the post
    setPosts(updatedPosts);
  };
 // Effect hook to fetch posts from the server
  useEffect(() => {
    fetch(`http://localhost:8088/posts`)
      .then(response => response.json())
      .then((postsArray) => {
        setPosts(postsArray);
      });
  }, []);
// Function to get username by userId
//find a user in the users array based on the provided userId and return the username of that user if found, or a default value ('unknown') if not found.
//userId is unique identifier of the user whose username is to be retrieved.
  const getUsernameById = (userId) => {// Use the find method to find a user in the users array with the specified userId
    const user = users.find(user => user.id === userId);
    //The find method is used on the users array to find the first user object for which the condition (user.id === userId) is true.
//This condition ensures that the user with the specified userId is found.
    // If a user is found, return the username; otherwise, return 'unknown'
    return user ? user.username : 'unknown';
  };
 // Effect hook to fetch users from the server 
  useEffect(() => {
    fetch(`http://localhost:8088/users`)
      .then(response => response.json())
      .then((usersArray) => {
        setUsers(usersArray);
      });
  }, []);
  // Function to handle like button click by posting and updating both the server and the local state accordingly.
  const handleLikeClick = (postId) => { // Fetch the current post with postId from the server
    fetch(`http://localhost:8088/posts/${postId}`)
      .then(response => response.json())
      .then(post => {
        // Create a new object (updatedPost) by spreading the properties of the current post
      // and incrementing the 'likes' property by 1
        const updatedPost = { ...post, likes: post.likes + 1 };
        fetch(`http://localhost:8088/posts/${postId}`, {
        // Send a PUT request to the server to update the post with the incremented likes  
        method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        })
          .then(response => response.json())
          .then(updatedPost => {
            // Update the local state (posts) with the updated post
            const updatedPosts = posts.map(p => (p.id === postId ? updatedPost : p));
            setPosts(updatedPosts);
          });
      });
  };

  return (
    <div className="homebackground">
      <div className="postButton--Container">
        <div className="postButton--Card">
          <CreatePostButton />
        </div>
      </div>

      <article className="posts">
        {posts.slice().reverse().map((post) => (
          <div className="post--Container" key={post.id}>
            <div className="post--Card">
              <label className="postUsername">
                {getUsernameById(post.userId)} ✲ {calculateTimeDifference(post.timeStamp)}
              </label>
              <Link to={`/${post.id}`}>
                <h3 className="postPreview-Title">{post.title}</h3>
              </Link>
              <div className="post--Card">
                {post.image && (
                  <div className="postMedia">
                    <img src={post.image} style={{ width: '600px', height: 'auto' }} alt="blank" />
                  </div>
                )}
                {post.url && (
                  <div className="postMedia">
                    <iframe src={post.url} title="post media" style={{ width: '600px', height: 'auto' }} />
                  </div>
                )}
                {post.description && !post.image && !post.url && (
                  <div className="postMedia">
                    <p className="postDescription">{post.description}</p>
                  </div>
                )}
              </div>
              <div className="like-dislike-comment--Container">
                <div className="likes--Card">
                  <button
                    id={post.id}
                    className={`like-button ${activeClick === post.id ? 'active' : ''}`}
                    onClick={() => {handleLikeClick(post.id);setActiveClick(post.id);}}
                  >
                    <input type="image" src={iconHeat} alt="Submit" style={{ width: '20px', height: '20px' }} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="comment-button">
                    <input type="image" src={icon6} alt="Submit" style={{ width: '15px', height: '15px', margin: '2%' }} />
                  </button>
                </div>
                <div className="delete-edit--Container">
                  <button className="edit-btn" onClick={() => navigate(`/${post.id}/edit`)}>
                    <input type="image" src={icon8} alt="Submit" style={{ width: '15px', height: '15px', margin: '2%' }} />
                  </button>
                  <PostDeleteButton postId={post.id} onDelete={handlePostDelete} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </article>
      
    </div>
  );
};

