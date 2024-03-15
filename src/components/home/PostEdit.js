//Aurthor: Juan Jose Alcalde
//November 1, 2023
//This is the module for editing with form and identical code from Post Form except
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EraseIcon from "../img/eraser.png";
import exit from "../img/rectangle-xmark.png";
import "../home/PostEdit.css";

export const PostEdit = () => {
  const [post, assignPost] = useState({
    title: "",
    description: "",
    image: "",
    url: "",
  });

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        assignPost(data);
      });
  }, [postId]);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    return fetch(`http://localhost:8088/posts/${post.id}`, {
      method: "PUT",// instaed of post like postform this method is PUT in order to update
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="PostEdit--background">
      <h2 required autoFocus className="EditForm-title">
        Edit Post
      </h2>
      <hr />
      <div className="postEdit--Container">
        <div className="postEdit--Card">
          <form className="EditForm">
            <fieldset>
              <header>
                <div className="EditExitBtn--Container">
                  <div className="exitbtn--Card">
                    <button className="EditExitBtn" onClick={() => navigate("/")}>
                      <input type="image" src={exit} alt="Submit" style={{ width: '20px', height: '20px', margin: '2%' }} />
                    </button>
                  </div>
                </div>
              </header>
              <div className="form-group">
                <input type="image" src={EraseIcon} alt="Submit" id="eraser" style={{ width: '15px', height: '15px' }} />

                <label className="form-title" htmlFor="title">
                  Edit/Add Title
                </label>
                <textarea
                  type="text"
                  style={{
                    height: "2.3rem",
                  }}
                  className="form-control"
                  value={post.title}
                  onChange={(evt) => {
                    const copy = { ...post };
                    copy.title = evt.target.value;
                    assignPost(copy);
                  }}
                ></textarea>
              </div>
              <div className="form-group">
                <input type="image" src={EraseIcon} alt="Submit" id="eraser" style={{ width: '15px', height: '15px' }} />
                <label className="form-title" htmlFor="text">
                  Edit/Add Text
                </label>
                <textarea
                  type="text"
                  style={{
                    height: "7rem",
                  }}
                  className="form-control"
                  value={post.description}
                  onChange={(evt) => {
                    const copy = { ...post };
                    copy.description = evt.target.value;
                    assignPost(copy);
                  }}
                ></textarea>
              </div>
            </fieldset>
            <div className="form-group">
              <input type="image" src={EraseIcon} alt="Submit" id="eraser" style={{ width: '15px', height: '15px' }} />
              <label className="form-title" htmlFor="image">
                Edit/Add Image URL
              </label>
              <textarea
                type="text"
                style={{}}
                className="form-control"
                value={post.image}
                onChange={(evt) => {
                  const copy = { ...post };
                  copy.image = evt.target.value;
                  assignPost(copy);
                }}
              ></textarea>
            </div>
            <div className="form-group">
              <input type="image" src={EraseIcon} alt="Submit" id="eraser" style={{ width: '15px', height: '15px', color: "grey" }} />
              <label className="form-title" htmlFor="url">
                Edit/Add Link URL
              </label>
              <textarea
                type="text"
                className="form-control"
                value={post.url}
                onChange={(evt) => {
                  const copy = { ...post };
                  copy.url = evt.target.value;
                  assignPost(copy);
                }}
              ></textarea>
            </div>
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">
              Save Edits
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
