//Aurthor: Juan Jose Alcalde
//November 1, 2023
//This module is for the post feature and it is exported used in homepage 
import { useNavigate } from "react-router-dom";
import icon3 from '../img/imagepost.png';
import icon4 from '../img/linkPost.png';
import "../home/PostButton.css";
//this function returns a form where the UseNavigate function is used in an onClick
//so whenever one clicks on the form anywhere it navigates you to the designated page
export const CreatePostButton = () => {
  const navigate = useNavigate(); // convert useNavigate function to variable for easy invoking
  return (// this is the form qith on click to navigate to /create page
    <>
      <form onClick={() => navigate("/create")} className="createPostButton--Container">
        <input
          type="text"
          id="postbuttontextbox"
          className="form-control"
          placeholder="make a post"
          style={{ width: '480px', height: '35px' }}
          required
          autoFocus
        />
        <div className="postButtonImage--Card">
          <input
            type="image"
            src={icon3}
            alt="Submit"
            id="createPostButtonImage"
            style={{ width: '30px', height: '30px' }}
          />
        </div>
        <div className="postButtonLink--Card">
          <input
            type="image"
            src={icon4}
            alt="Submit"
            id="createPostButtonLink"
            style={{ width: '30x', height: '30px' }}  
          />
        </div>
      </form>
    </>
  );
};
