//Aurthor: Juan Jose Alcalde
//November 1, 2023
//This is my post form module. It is exported to use in homepage module 

import { useState } from "react";//react hook
import { useNavigate } from "react-router-dom";
import { IconPostText } from "../icons/icon";
import { IconPostImage } from "../icons/icon";
import { IconPostLink } from "../icons/icon";

import "../home/PostForm.css";
//function that creates a form with logic for tabs and sends data to database
export const PostForm = () => {
  const navigate = useNavigate(); //make useNavigate into a variable i can invoke and use 
  const [activeTab, setActiveTab] = useState("tab1"); //state variables to manage active tabs and data to be sent to api
  const [posts, update] = useState({
    title: "",
    description: "",
    image: "",
    url: "",
  });

  const localJuanAppUser = localStorage.getItem("juanapp_user");
  const juanAppUserObject = JSON.parse(localJuanAppUser); //get user data from local storage 
// this is a function a for the save button when its clicked using onclick event listener 
  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    const postToSendToApi = { //this  sends data to database
      userId: juanAppUserObject.id,
      title: posts.title,
      timeStamp: new Date().toISOString(),
      url: posts.url,
      description: posts.description,
      comments: "",
      tags: "",
      voteCount: "",
      image: posts.image,
      metadata: "",
      likes: 0, //this is zero to start 
    };
    fetch(`http://localhost:8088/posts`, {//Send a POST request to create a new post
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postToSendToApi),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");// takes you to the home page after successfully creating a post
      });
  };

  return (
    <div className="PostForm--background">
      <h1 className="postForm--title">Make a post</h1>
      <hr></hr>
      <div className="postContainer">
        <div className="postTitleCard">
          <div className="postTabs"> 
            <section className="tab">
              <button
                id="tab"
                className={activeTab === "tab1" ? "active" : ""}
                style={{ width: "226px", height: "50px", border: "gray" }}
                onClick={() => setActiveTab("tab1")}// on click it sets tab to ACTIVE 
              >
                <IconPostText />
              </button>
            </section>

            <section className="tab">
              <button
                id="tab"
                className={activeTab === "tab2" ? "active" : ""}
                style={{ width: "226px", height: "50px", border: "none" }}
                onClick={() => setActiveTab("tab2")}
              >
                <IconPostImage />
              </button>
            </section>

            <section className="tab">
              <button
                id="tab"
                className={activeTab === "tab3" ? "active" : ""}
                style={{ width: "226px", height: "50px", border: "none" }}
                onClick={() => setActiveTab("tab3")}
              >
                <IconPostLink />
              </button>
            </section>

            {/* more tabs in here  */}
          </div>



          {activeTab === "tab1" && (// this code is a conditional which means if tab1 is clicked it is considered ACTIVE thus rendering the code inside brackets after && for this tab1. 
            <form className="postForm">
              <fieldset>
                <div className="form-group">
                  <input
                    required
                    autoFocus
                    type="text"
                    id="titleTab1"
                    className="form-control"
                    style={{ width: "670px", resize: "none" }}
                    placeholder="Title"
                    value={posts.title}
                    onChange={(evt) => {
                      const copy = { ...posts };
                      copy.title = evt.target.value;
                      update(copy);
                    }}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    id="descriptionTab1"
                    className="form-control"
                    placeholder="Text(Optional)"
                    style={{ height: "200px", width: "670px", resize: "none" }}
                    value={posts.description}
                    onChange={(evt) => {
                      const copy = { ...posts };
                      copy.description = evt.target.value;
                      update(copy);
                    }}
                  ></textarea>
                </div>
              </fieldset>
            </form>
          )}

          {activeTab === "tab2" && (
            <form className="postForm">
              <fieldset>
                <div className="form-group">
                  <input
                    required
                    autoFocus
                    type="text"
                    id="titleTab2"
                    className="form-control"
                    style={{ width: "670px", resize: "none" }}
                    placeholder="Title"
                    value={posts.title}
                    onChange={(evt) => {
                      const copy = { ...posts };
                      copy.title = evt.target.value;
                      update(copy);
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="descriptionTab2"
                    className="form-control"
                    style={{ width: "670px", height: "100px", resize: "none" }}
                    placeholder="Copy & Paste Image URL"
                    value={posts.image}
                    onChange={(evt) => {
                      const copy = { ...posts };
                      copy.image = evt.target.value;
                      update(copy);
                    }}
                  />
                </div>
              </fieldset>
            </form>
          )}

          {activeTab === "tab3" && (
            <form className="postForm">
              <fieldset>
                <div className="form-group">
                  <input
                    required
                    autoFocus
                    type="text"
                    id="titleTab3"
                    className="form-control"
                    style={{ width: "670px", resize: "none" }}
                    placeholder="Title"
                    value={posts.title}
                    onChange={(evt) => {
                      const copy = { ...posts };
                      copy.title = evt.target.value;
                      update(copy);
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="url"
                    id="descriptionTab3"
                    className="form-control"
                    style={{ width: "670px", resize: "none" }}
                    placeholder=" URL"
                    value={posts.url}
                    onChange={(evt) => {
                      const copy = { ...posts };
                      copy.url = evt.target.value;
                      update(copy);
                    }}
                  />
                </div>
              </fieldset>
            </form>
          )}
          {/* Add more forms for other tabs as needed */}
{/* this is the post button with onClick eventlistener with handle save function from above */}
          <section className="postButtonContainer">
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="postButton"> 
              Post
            </button>
          </section>
          <footer>
            <fieldset>
              <span>Please be mindful of Vibe Social's content policy </span>
            </fieldset>
          </footer>
        </div>
      </div>
    </div>
  );
};
