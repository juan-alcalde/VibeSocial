//Aurthor: Juan Jose Alcalde
//November 1, 2023
//This is my "DELETE" button module. It is exported to use in homepage module 
import React from "react"; //This import recongizes JSX 
import icon7 from '../img/trash.png'; // this is the trash icon jpeg from my images folder
import "../home/DeletePostButton.css"; // this links up my css module for button styling
//this is the function where the button component is created, with an export tag to be able import to homepage 
export const PostDeleteButton = ({ postId, onDelete }) => {//this function takes two props
  // this is the function that is will be invoked when the button is clicked 
  const handleDelete = () => {
    fetch(`http://localhost:8088/posts/${postId}`, { // this is a fetch statement with delete method to request an item be deleted from database 
      method: "DELETE"
    })
      .then((response) => response.json()) // this converts the delete request to json format
      .then(() => {
        onDelete(postId); // this line calls the onDelete function passed as a prop to the component. OnDemand function typically removes the deleted post from the state. 
      });
  };
  //end entire thing with a period aka the return
  return (// jsx that creates a button with onClick EventListener for the handleDeleteFunction and inside the button jsx is an input for a jpeg insert or logo
    <button onClick={handleDelete} className="delete-btn">  
      <input
        type="image"
        src={icon7}
        alt="Delete"
        style={{ width: '15px', height: '15px', margin: '2%' }}
      />
    </button>
  );
};



